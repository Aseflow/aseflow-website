const nodemailer = require('nodemailer');

// CORS headers
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
};

// ── SEQUENTIAL ORDER ID via Neon DB ─────────────────────
const getNextOrderId = async () => {
  try {
    const dbUrl = process.env.NETLIFY_DATABASE_URL;
    if (!dbUrl) throw new Error('No database URL');

    const url = new URL(dbUrl);
    const host = url.hostname;

    const runQuery = async (query) => {
      const res = await fetch(`https://${host}/sql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Neon-Connection-String': dbUrl,
        },
        body: JSON.stringify({ query })
      });
      return res.json();
    };

    await runQuery(`CREATE TABLE IF NOT EXISTS order_counter (id INTEGER PRIMARY KEY, last_order_id INTEGER NOT NULL DEFAULT 999)`);
    await runQuery(`INSERT INTO order_counter (id, last_order_id) VALUES (1, 999) ON CONFLICT (id) DO NOTHING`);
    const result = await runQuery(`UPDATE order_counter SET last_order_id = last_order_id + 1 WHERE id = 1 RETURNING last_order_id`);

    if (result && result.rows && result.rows.length > 0) {
      return result.rows[0].last_order_id;
    }
    throw new Error('No rows returned');
  } catch (error) {
    console.error('Order counter error:', error);
    return 1000 + Math.floor(Math.random() * 9000); // fallback
  }
};

// ── FORMAT ORDER ID: ASF-PRE-2026-MAR-001000 ────────────
const formatOrderId = (numericId) => {
  const now = new Date();
  const year = now.getFullYear();
  const months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
  const month = months[now.getMonth()];
  const padded = String(numericId).padStart(6, '0');
  return `ASF-PRE-${year}-${month}-${padded}`;
};

// ── EMAIL TRANSPORTER ────────────────────────────────────
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.ZOHO_HOST || 'smtp.zoho.in',
    port: parseInt(process.env.ZOHO_PORT) || 465,
    secure: true,
    auth: {
      user: process.env.ZOHO_EMAIL,
      pass: process.env.ZOHO_PASSWORD,
    },
    tls: { rejectUnauthorized: false },
  });
};

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePhone = (phone) => /^\+?[\d\s\-\(\)]{10,15}$/.test(phone);

// ── PRICING ──────────────────────────────────────────────
const getPricing = (productType, qty) => {
  if (productType === 'trial') {
    return {
      unitPrice: 799, mrp: 1499,
      total: qty * 799, originalTotal: qty * 1499,
      discount: '47%', shots: '6 shots', label: 'Trial Pack'
    };
  }
  return {
    unitPrice: 2999, mrp: 4999,
    total: qty * 2999, originalTotal: qty * 4999,
    discount: '40%', shots: '26 shots',
    label: productType === 'marine' ? 'Marine Protein' : 'Vegan Protein'
  };
};

// ── SEND EMAILS ──────────────────────────────────────────
const sendPreOrderEmail = async (orderData) => {
  const transporter = createTransporter();
  const { name, email, phone, address, productType, quantity, orderId } = orderData;
  const qty = parseInt(quantity);
  const pricing = getPricing(productType, qty);
  const userName = name || 'there';
  const fromEmail = process.env.ZOHO_EMAIL || 'info@aseflow.com';
  const timestamp = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    weekday: 'long', year: 'numeric', month: 'long',
    day: 'numeric', hour: 'numeric', minute: '2-digit',
    hour12: true, timeZoneName: 'short'
  });

  // ── CUSTOMER EMAIL — clean minimal white template ─────
  const userMailOptions = {
    from: `"Aseflow Wellness" <${fromEmail}>`,
    replyTo: fromEmail,
    to: email,
    subject: `Your Pre-Order is Confirmed – Aseflow`,
    html: `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 24px; background-color: #ffffff; color: #111111;">

        <!-- Header -->
        <div style="padding-bottom: 24px; border-bottom: 1px solid #e5e5e5; margin-bottom: 40px;">
          <p style="margin: 0 0 4px; font-size: 13px; font-weight: 600; letter-spacing: 0.2em; color: #111;">ASEFLOW</p>
          <p style="margin: 0; font-size: 11px; letter-spacing: 0.15em; color: #999; text-transform: uppercase;"></p>
        </div>

        <!-- Status label -->
        <p style="margin: 0 0 16px; font-size: 11px; font-weight: 600; letter-spacing: 0.2em; color: #999; text-transform: uppercase;">Order Confirmed</p>

        <!-- Main heading -->
        <h1 style="margin: 0 0 24px; font-size: 36px; font-weight: 300; line-height: 1.2; color: #111; letter-spacing: -0.5px;">
          Thank you,<br>${userName}.
        </h1>

        <!-- Subtext -->
        <p style="margin: 0 0 40px; font-size: 15px; color: #555; line-height: 1.7; font-weight: 300;">
          Your pre-order has been received. We'll contact you soon to confirm delivery details. Payment will be collected at the time of delivery.
        </p>

        <!-- Order details -->
        <div style="background-color: #f7f7f7; border-radius: 8px; padding: 24px; margin-bottom: 32px;">
          <p style="margin: 0 0 16px; font-size: 11px; font-weight: 600; letter-spacing: 0.15em; color: #999; text-transform: uppercase;">Order Summary</p>

          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr style="border-bottom: 1px solid #e5e5e5;">
              <td style="padding: 10px 0; color: #777;">Order ID</td>
              <td style="padding: 10px 0; text-align: right; color: #111; font-weight: 500;">${orderId}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e5e5;">
              <td style="padding: 10px 0; color: #777;">Product</td>
              <td style="padding: 10px 0; text-align: right; color: #111;">${pricing.label}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e5e5;">
              <td style="padding: 10px 0; color: #777;">Pack Size</td>
              <td style="padding: 10px 0; text-align: right; color: #111;">${pricing.shots}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e5e5;">
              <td style="padding: 10px 0; color: #777;">Quantity</td>
              <td style="padding: 10px 0; text-align: right; color: #111;">${qty}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e5e5;">
              <td style="padding: 10px 0; color: #777;">MRP</td>
              <td style="padding: 10px 0; text-align: right; color: #999; text-decoration: line-through;">₹${pricing.originalTotal}</td>
            </tr>
            <tr>
              <td style="padding: 14px 0 0; color: #111; font-weight: 600; font-size: 15px;">Total</td>
              <td style="padding: 14px 0 0; text-align: right; color: #111; font-weight: 600; font-size: 15px;">₹${pricing.total} <span style="font-weight: 300; font-size: 12px; color: #999;">(${pricing.discount} off)</span></td>
            </tr>
          </table>
        </div>

        <!-- Delivery address -->
        <div style="margin-bottom: 32px;">
          <p style="margin: 0 0 6px; font-size: 11px; font-weight: 600; letter-spacing: 0.15em; color: #999; text-transform: uppercase;">Delivery Address</p>
          <p style="margin: 0; font-size: 14px; color: #555; line-height: 1.6;">${address}</p>
        </div>

        <!-- Discount code -->
        <div style="border: 1px solid #e5e5e5; border-radius: 8px; padding: 20px; margin-bottom: 40px; text-align: center;">
          <p style="margin: 0 0 8px; font-size: 11px; letter-spacing: 0.15em; color: #999; text-transform: uppercase;">Your Exclusive Code</p>
          <p style="margin: 0 0 6px; font-size: 28px; font-weight: 600; letter-spacing: 0.2em; color: #111;">ASE30</p>
          <p style="margin: 0; font-size: 13px; color: #777;">30% off your next order</p>
        </div>

        <!-- Footer -->
        <div style="padding-top: 24px; border-top: 1px solid #e5e5e5;">
          <p style="margin: 0 0 4px; font-size: 13px; color: #777; line-height: 1.6;">Questions? Reply to this email and we'll get back to you.</p>
          <p style="margin: 16px 0 0; font-size: 13px; color: #111;">— Team Aseflow</p>
        </div>

      </div>
    `,
    text: `Thank you, ${userName}.\n\nYour pre-order has been received.\n\nOrder ID: ${orderId}\nProduct: ${pricing.label} (${pricing.shots})\nQuantity: ${qty}\nTotal: ₹${pricing.total} (${pricing.discount} off)\nPayment on delivery.\n\nDelivery address: ${address}\n\nYour discount code: ASE30 (30% off next order)\n\nQuestions? Reply to this email.\n\n— Team Aseflow`
  };

  // ── ADMIN EMAIL ───────────────────────────────────────
  const adminMailOptions = {
    from: fromEmail,
    to: fromEmail,
    subject: `🛒 New Order ${orderId} — ${name} — ₹${pricing.total}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #1A1A1A; border-bottom: 3px solid #D4AF37; padding-bottom: 10px;">New Pre-Order Received</h2>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; border-left: 4px solid #D4AF37; margin-bottom: 16px;">
          <h3 style="color: #1A1A1A; margin-top: 0;">Customer</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Address:</strong> ${address}</p>
        </div>
        <div style="background-color: #1A1A1A; padding: 20px; border-radius: 8px; color: white;">
          <h3 style="color: #D4AF37; margin-top: 0;">Order Details</h3>
          <p><strong style="color:#aaa">Order ID:</strong> <span style="color:#D4AF37; font-weight:bold">${orderId}</span></p>
          <p><strong style="color:#aaa">Product:</strong> ${pricing.label}</p>
          <p><strong style="color:#aaa">Pack Size:</strong> ${pricing.shots}</p>
          <p><strong style="color:#aaa">Quantity:</strong> ${qty}</p>
          <p><strong style="color:#aaa">Unit Price:</strong> ₹${pricing.unitPrice}</p>
          <p><strong style="color:#aaa">MRP:</strong> <span style="text-decoration:line-through">₹${pricing.originalTotal}</span></p>
          <p style="font-size:18px"><strong style="color:#D4AF37">Total: ₹${pricing.total}</strong> (${pricing.discount} off)</p>
          <p><strong style="color:#aaa">Time:</strong> ${timestamp}</p>
        </div>
      </div>
    `,
    text: `New Order: ${orderId}\n\nCustomer: ${name} | ${email} | ${phone}\nAddress: ${address}\n\nProduct: ${pricing.label} | ${pricing.shots} | Qty: ${qty}\nTotal: ₹${pricing.total}\nTime: ${timestamp}`
  };

  await Promise.all([
    transporter.sendMail(userMailOptions),
    transporter.sendMail(adminMailOptions)
  ]);

  console.log(`✅ Emails sent for order ${orderId}`);
  return { pricing, timestamp };
};

// ── SAVE TO GOOGLE SHEETS via SheetDB ───────────────────
const saveToSheets = async (orderData, pricing, timestamp) => {
  try {
    const { name, email, phone, address, quantity, orderId } = orderData;
    const qty = parseInt(quantity);

    const response = await fetch('https://sheetdb.io/api/v1/6eixxsivvae5n', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: [{
          'Order ID': orderId,
          'Name': name,
          'Email': email,
          'Phone': phone,
          'Address': address,
          'Product Type': pricing.label,
          'Quantity': qty,
          'Total Amount': `₹${pricing.total}`,
          'Timestamp': timestamp
        }],
        sheet: 'PreOrders'
      })
    });

    const result = await response.json();
    console.log('✅ Saved to Google Sheets:', JSON.stringify(result));
  } catch (err) {
    console.error('SheetDB error (non-fatal):', err.message);
  }
};

// ── MAIN HANDLER ─────────────────────────────────────────
exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };
  if (event.httpMethod !== 'POST') return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };

  try {
    const body = JSON.parse(event.body || '{}');
    const { name, email, phone, address, productType, quantity } = body;

    if (!process.env.ZOHO_EMAIL || !process.env.ZOHO_PASSWORD)
      return { statusCode: 500, headers, body: JSON.stringify({ error: 'Email service not configured' }) };

    if (!name || name.trim().length < 2)
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Name must be at least 2 characters' }) };
    if (!email || !validateEmail(email))
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Valid email is required' }) };
    if (!phone || !validatePhone(phone))
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Valid phone number is required' }) };
    if (!address || address.trim().length < 10)
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Address must be at least 10 characters' }) };
    if (!productType || !['marine', 'vegan', 'trial'].includes(productType))
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Product must be trial, marine or vegan' }) };
    if (!quantity || quantity < 1 || quantity > 50)
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Quantity must be between 1 and 50' }) };

    // Get sequential order ID from Neon DB
    const numericId = await getNextOrderId();
    const orderId = formatOrderId(numericId);

    const orderData = { ...body, quantity: parseInt(quantity), orderId };

    // Send emails and save to sheets in parallel
    const [emailResult] = await Promise.all([
      sendPreOrderEmail(orderData),
    ]);

    // Save to sheets after (non-blocking)
    saveToSheets(orderData, emailResult.pricing, emailResult.timestamp).catch(console.error);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Pre-order confirmed! Check your email for details.',
        orderId
      }),
    };

  } catch (error) {
    console.error('Handler error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal error', message: error.message }),
    };
  }
};
