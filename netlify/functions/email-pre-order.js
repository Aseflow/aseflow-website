const nodemailer = require('nodemailer');

// CORS headers
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
};

// Email transporter
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

// ── PRICING ─────────────────────────────────────────────
const getPricing = (productType, quantity) => {
  const qty = parseInt(quantity) || 1;
  if (productType === 'trial') {
    return {
      unitPrice: 799,
      unitMRP: 1499,
      totalAmount: qty * 799,
      originalAmount: qty * 1499,
      discount: '47%',
      shots: '6 shots',
      label: 'Trial Pack'
    };
  }
  return {
    unitPrice: 2999,
    unitMRP: 4999,
    totalAmount: qty * 2999,
    originalAmount: qty * 4999,
    discount: '40%',
    shots: '26 shots',
    label: productType === 'marine' ? 'Marine Protein' : 'Vegan Protein'
  };
};

// ── GOOGLE SHEETS ────────────────────────────────────────
const saveToSheets = async (orderData) => {
  try {
    const sheetUrl = process.env.SHEETDB_URL;
    if (!sheetUrl) {
      console.log('SHEETDB_URL not set — skipping sheets write');
      return;
    }

    const { name, email, phone, address, productType, quantity, pricing, orderId, timestamp } = orderData;

    await fetch(sheetUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: {
          'Order ID': orderId || '',
          'Timestamp': timestamp,
          'Name': name,
          'Email': email,
          'Phone': phone,
          'Address': address,
          'Product': pricing.label,
          'Shots': pricing.shots,
          'Quantity': quantity,
          'Unit Price': `₹${pricing.unitPrice}`,
          'Total Amount': `₹${pricing.totalAmount}`,
          'Discount': pricing.discount,
        }
      })
    });

    console.log('✅ Saved to Google Sheets');
  } catch (err) {
    // Non-fatal — don't block the order
    console.error('Sheets write failed (non-fatal):', err.message);
  }
};

// ── SEND EMAILS ──────────────────────────────────────────
const sendEmails = async (orderData) => {
  const transporter = createTransporter();
  const { name, email, phone, address, productType, quantity, pricing, orderId, timestamp } = orderData;
  const fromEmail = process.env.ZOHO_EMAIL || 'info@aseflow.com';
  const userName = name || 'there';

  // ── CUSTOMER EMAIL ───────────────────────────────────
  const userMail = {
    from: fromEmail,
    to: email,
    subject: productType === 'trial'
      ? 'Your Aseflow Trial Pack is Confirmed! 🎉'
      : 'Your Aseflow Pre-Order is Confirmed! 🎉',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: #1A1A1A; padding: 30px; border-radius: 10px; text-align: center;">
          <h1 style="color: #D4AF37; font-size: 32px; margin-bottom: 5px; font-weight: bold;">ASEFLOW</h1>
          <p style="color: #D4AF37; font-size: 14px; margin-bottom: 30px; letter-spacing: 4px;">WELLNESS</p>

          <h2 style="color: white; font-size: 22px; margin-bottom: 20px;">
            ${productType === 'trial' ? 'Trial Pack Confirmed!' : 'Pre-Order Confirmed!'}
          </h2>

          <div style="background-color: rgba(255,255,255,0.05); padding: 20px; border-radius: 8px; margin: 20px 0; text-align: left;">
            <p style="color: white; font-size: 16px; line-height: 1.6; margin: 0 0 16px 0;">
              Hi ${userName},<br><br>
              Thank you for your order! We've received it and will be in touch with your delivery details soon.
            </p>

            <table style="width: 100%; border-collapse: collapse; color: white; font-size: 14px;">
              ${orderId ? `<tr><td style="padding: 6px 0; color: #aaa;">Order ID</td><td style="padding: 6px 0; text-align: right; font-weight: bold; color: #D4AF37;">${orderId}</td></tr>` : ''}
              <tr><td style="padding: 6px 0; color: #aaa;">Product</td><td style="padding: 6px 0; text-align: right;">${pricing.label}</td></tr>
              <tr><td style="padding: 6px 0; color: #aaa;">Shots</td><td style="padding: 6px 0; text-align: right;">${pricing.shots} × ${quantity}</td></tr>
              <tr><td style="padding: 6px 0; color: #aaa;">Unit Price</td><td style="padding: 6px 0; text-align: right;">₹${pricing.unitPrice}</td></tr>
              <tr style="border-top: 1px solid rgba(255,255,255,0.1);">
                <td style="padding: 10px 0; font-size: 16px; font-weight: bold;">Total</td>
                <td style="padding: 10px 0; text-align: right; font-size: 18px; font-weight: bold; color: #D4AF37;">₹${pricing.totalAmount}</td>
              </tr>
              <tr><td style="padding: 4px 0; color: #aaa; font-size: 12px;" colspan="2">Payment will be collected upon delivery</td></tr>
            </table>
          </div>

          <div style="background-color: #D4AF37; color: #1A1A1A; padding: 12px 20px; border-radius: 8px; font-size: 16px; font-weight: bold; margin: 20px 0;">
            Your discount code: ASE30 — 30% OFF next order!
          </div>

          <p style="color: #aaa; font-size: 14px; margin: 20px 0;">
            Address: ${address}
          </p>

          <div style="margin: 24px 0;">
            <p style="color: #D4AF37; font-size: 16px; font-weight: bold; letter-spacing: 2px;">RIP IT. SIP IT. REPEAT.</p>
          </div>

          <p style="color: white; font-size: 14px;">
            Questions? Reply to this email or WhatsApp us.<br>
            <strong style="color: #D4AF37;">— Team Aseflow</strong>
          </p>
        </div>
      </div>
    `,
    text: `Hi ${userName},\n\nYour ${pricing.label} order is confirmed!\n\nProduct: ${pricing.label} (${pricing.shots})\nQuantity: ${quantity}\nTotal: ₹${pricing.totalAmount}\nPayment on delivery.\n\nDiscount code for next order: ASE30 (30% OFF)\n\n— Team Aseflow`
  };

  // ── ADMIN EMAIL ──────────────────────────────────────
  const adminMail = {
    from: fromEmail,
    to: fromEmail,
    subject: `🛒 New ${pricing.label} Order — ${name} — ₹${pricing.totalAmount}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #1A1A1A; border-bottom: 3px solid #D4AF37; padding-bottom: 10px;">
          New Order Received
        </h2>

        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; border-left: 4px solid #D4AF37; margin-bottom: 20px;">
          <h3 style="color: #1A1A1A; margin-top: 0;">Customer</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Address:</strong> ${address}</p>
        </div>

        <div style="background-color: #1A1A1A; padding: 20px; border-radius: 8px; color: white;">
          <h3 style="color: #D4AF37; margin-top: 0;">Order Details</h3>
          ${orderId ? `<p><strong style="color:#aaa">Order ID:</strong> <span style="color:#D4AF37">${orderId}</span></p>` : ''}
          <p><strong style="color:#aaa">Product:</strong> ${pricing.label}</p>
          <p><strong style="color:#aaa">Shots per pack:</strong> ${pricing.shots}</p>
          <p><strong style="color:#aaa">Quantity:</strong> ${quantity}</p>
          <p><strong style="color:#aaa">Unit Price:</strong> ₹${pricing.unitPrice}</p>
          <p><strong style="color:#aaa">MRP:</strong> <span style="text-decoration:line-through">₹${pricing.originalAmount}</span></p>
          <p style="font-size: 20px;"><strong style="color:#D4AF37">Total: ₹${pricing.totalAmount}</strong> (${pricing.discount} off)</p>
          <p><strong style="color:#aaa">Time:</strong> ${timestamp}</p>
        </div>
      </div>
    `,
    text: `New Order\n\nCustomer: ${name}\nEmail: ${email}\nPhone: ${phone}\nAddress: ${address}\n\nProduct: ${pricing.label}\nShots: ${pricing.shots}\nQty: ${quantity}\nTotal: ₹${pricing.totalAmount}\nTime: ${timestamp}`
  };

  await Promise.all([
    transporter.sendMail(userMail),
    transporter.sendMail(adminMail)
  ]);

  console.log(`✅ Emails sent — customer: ${email}, admin: ${fromEmail}`);
};

// ── MAIN HANDLER ─────────────────────────────────────────
exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };
  if (event.httpMethod !== 'POST') return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };

  try {
    const body = JSON.parse(event.body || '{}');
    const { name, email, phone, address, productType, quantity } = body;

    // ── ENV CHECK ──────────────────────────────────────
    if (!process.env.ZOHO_EMAIL || !process.env.ZOHO_PASSWORD) {
      return { statusCode: 500, headers, body: JSON.stringify({ error: 'Email service not configured' }) };
    }

    // ── VALIDATION ─────────────────────────────────────
    if (!name || name.trim().length < 2)
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Name must be at least 2 characters' }) };

    if (!email || !validateEmail(email))
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Valid email is required' }) };

    if (!phone || !validatePhone(phone))
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Valid phone number is required' }) };

    if (!address || address.trim().length < 10)
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Address must be at least 10 characters' }) };

    // ✅ FIX: trial, marine, vegan all accepted
    if (!productType || !['marine', 'vegan', 'trial'].includes(productType))
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Product must be trial, marine or vegan' }) };

    if (!quantity || quantity < 1 || quantity > 50)
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Quantity must be between 1 and 50' }) };

    // ── PREPARE ORDER DATA ─────────────────────────────
    const qty = parseInt(quantity) || 1;
    const pricing = getPricing(productType, qty);
    const timestamp = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      weekday: 'long', year: 'numeric', month: 'long',
      day: 'numeric', hour: 'numeric', minute: '2-digit',
      hour12: true, timeZoneName: 'short'
    });

    // Generate order ID
    const now = new Date();
    const month = now.toLocaleString('en-IN', { month: 'short', timeZone: 'Asia/Kolkata' }).toUpperCase();
    const year = now.getFullYear();
    const rand = Math.floor(1000 + Math.random() * 9000);
    const orderId = `ASF-PRE-${year}-${month}-${rand}`;

    const orderData = { name, email, phone, address, productType, quantity: qty, pricing, orderId, timestamp };

    // ── SEND EMAILS + SAVE TO SHEETS ──────────────────
    await Promise.all([
      sendEmails(orderData),
      saveToSheets(orderData)
    ]);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Order confirmed! Check your email for details.',
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
