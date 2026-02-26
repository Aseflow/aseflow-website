// const nodemailer = require('nodemailer');

// // CORS headers
// const headers = {
//   'Access-Control-Allow-Origin': '*',
//   'Access-Control-Allow-Headers': 'Content-Type',
//   'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
// };

// // Create email transporter
// const createTransporter = () => {
//   try {
//     return nodemailer.createTransport({
//       host: process.env.ZOHO_HOST || 'smtp.zoho.in',
//       port: parseInt(process.env.ZOHO_PORT) || 465,
//       secure: true,
//       auth: {
//         user: process.env.ZOHO_EMAIL,
//         pass: process.env.ZOHO_PASSWORD,
//       },
//       tls: {
//         rejectUnauthorized: false,
//       },
//     });
//   } catch (error) {
//     console.error('Failed to create transporter:', error);
//     throw new Error('Email configuration error: ' + error.message);
//   }
// };

// // Validation functions
// const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
// const validatePhone = (phone) => /^\+?[\d\s\-\(\)]{10,15}$/.test(phone);

// // Pre-order email service
// const sendPreOrderEmail = async (orderData) => {
//   try {
//     const transporter = createTransporter();
//     const { name, email, phone, address, productType, quantity } = orderData;
//     const qty = parseInt(quantity); 
//     const userName = name || 'there';
//     const fromEmail = process.env.ZOHO_EMAIL || 'info@aseflow.com';
//     const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
//     const totalAmount = qty * 2999;
//     const originalAmount = qty * 4999;
//     const savings = originalAmount - totalAmount;

//     const userMailOptions = {
//       from: fromEmail,
//       to: email,
//       subject: 'Your Pre-Order is Confirmed!',
//       html: 
//         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
//           <div style="background-color: #1A1A1A; padding: 30px; border-radius: 10px; text-align: center;">
//             <h1 style="color: #D4AF37; font-size: 32px; margin-bottom: 10px; font-weight: bold;">ASEFLOW</h1>
//             <p style="color: #D4AF37; font-size: 16px; margin-bottom: 30px;">WELLNESS</p>
//             <h2 style="color: white; font-size: 24px; margin-bottom: 20px;">Pre-Order Confirmed! 🎉</h2>
//             <div style="background-color: rgba(212, 175, 55, 0.1); padding: 20px; border-radius: 8px; margin: 20px 0;">
//               <p style="color: white; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
//                 Hi ${userName},<br><br>
//                 Thanks for pre-ordering Aseflow! As a special thank you, here's your exclusive discount code:
//               </p>
//               <div style="background-color: #D4AF37; color: #1A1A1A; padding: 15px; border-radius: 8px; font-size: 24px; font-weight: bold; margin: 20px 0;">
//                 ASE30
//               </div>
//               <p style="color: #D4AF37; font-size: 14px; margin-bottom: 20px;">
//                 30% OFF your next order!
//               </p>
//               <p style="color: white; font-size: 16px;">
//                 We'll notify you once your order is ready to ship.
//               </p>
//             </div>
//             <div style="margin: 30px 0;">
//               <p style="color: #D4AF37; font-size: 18px; font-weight: bold;">RIP IT, SIP IT, REPEAT</p>
//             </div>
//             <p style="color: white; font-size: 16px;">
//               Cheers,<br>
//               <strong style="color: #D4AF37;">Team Aseflow</strong>
//             </p>
//           </div>
//         </div>
//       ,
//       text: Hi ${userName},\n\nThanks for pre-ordering Aseflow! Here's your 30% OFF discount code: ASE30.\n\nWe'll notify you once your order is ready to ship.\n\nCheers,\nTeam Aseflow
//     };

//     const adminMailOptions = {
//       from: fromEmail,
//       to: fromEmail,
//       subject: 'New Pre-Order Received - Aseflow',
//       html: 
//         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
//           <h2 style="color: #1A1A1A;">New Pre-Order Received</h2>
//           <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; border-left: 4px solid #D4AF37;">
//             <h3 style="color: #1A1A1A; margin-top: 0;">Customer Details:</h3>
//             <p><strong>Name:</strong> ${name}</p>
//             <p><strong>Email:</strong> ${email}</p>
//             <p><strong>Phone:</strong> ${phone}</p>
//             <p><strong>Address:</strong> ${address}</p>
//             <h3 style="color: #1A1A1A;">Order Details:</h3>
//             <p><strong>Product Type:</strong> ${productType}</p>
//             <p><strong>Quantity:</strong> ${quantity}</p>
//             <p><strong>Original Price:</strong> ₹${originalAmount}</p>
//             <p><strong>Total Amount:</strong> ₹${totalAmount}</p>
//             <p><strong>You Saved:</strong> ₹${savings} (40% OFF)</p>
//             <p><strong>Timestamp:</strong> ${timestamp}</p>
//           </div>
//         </div>
//       ,
// text: `Customer Details:
// Name: ${name}
// Email: ${email}
// Phone: ${phone}
// Address: ${address}

// Order Details:
// Product Type: ${productType}
// Quantity: ${quantity}
// Total Amount: ₹${totalAmount}
// Timestamp: ${timestamp}`

//     };

//     await Promise.all([
//       transporter.sendMail(userMailOptions),
//       transporter.sendMail(adminMailOptions)
//     ]);
//   } catch (error) {
//     console.error('Pre-order email error:', error);
//     throw new Error('Failed to send email: ' + error.message);
//   }
// };

// // Main handler
// exports.handler = async (event, context) => {

//   if (event.httpMethod === 'OPTIONS') {
//     return { statusCode: 200, headers, body: '' };
//   }

//   if (event.httpMethod !== 'POST') {
//     return {
//       statusCode: 405,
//       headers,
//       body: JSON.stringify({ error: 'Method not allowed' }),
//     };
//   }

//   try {
//     const body = JSON.parse(event.body || '{}');
//     const { name, email, phone, address, productType, quantity } = body;

//     // Env check
//     if (!process.env.ZOHO_EMAIL || !process.env.ZOHO_PASSWORD) {
//       return {
//         statusCode: 500,
//         headers,
//         body: JSON.stringify({ error: 'Email service not configured properly' }),
//       };
//     }

//     // Validation
//     if (!name || name.trim().length < 2)
//       return { statusCode: 400, headers, body: JSON.stringify({ error: 'Name must be at least 2 characters' }) };

//     if (!email || !validateEmail(email))
//       return { statusCode: 400, headers, body: JSON.stringify({ error: 'Valid email is required' }) };

//     if (!phone || !validatePhone(phone))
//       return { statusCode: 400, headers, body: JSON.stringify({ error: 'Valid phone number is required' }) };

//     if (!address || address.trim().length < 10)
//       return { statusCode: 400, headers, body: JSON.stringify({ error: 'Address must be at least 10 characters' }) };

//     if (!productType || !['marine', 'vegan'].includes(productType))
//       return { statusCode: 400, headers, body: JSON.stringify({ error: 'Product must be marine or vegan' }) };

//     if (!quantity || quantity < 1 || quantity > 50)
//       return { statusCode: 400, headers, body: JSON.stringify({ error: 'Quantity must be between 1 and 50' }) };

//     await sendPreOrderEmail(body);

//     return {
//       statusCode: 200,
//       headers,
//       body: JSON.stringify({ success: true, message: 'Pre-order confirmed! Check your email for details.' }),
//     };
//   } catch (error) {
//     console.error('Handler error:', error);
//     return {
//       statusCode: 500,
//       headers,
//       body: JSON.stringify({ error: 'Internal error', message: error.message }),
//     };
//   }
// };

const nodemailer = require('nodemailer');
const { neon } = require('@neondatabase/serverless');

// CORS headers
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
};

// Get next sequential order ID starting from 1000 using Neon DB
const getNextOrderId = async () => {
  try {
    const sql = neon(process.env.NETLIFY_DATABASE_URL);
    // Create table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS order_counter (
        id INTEGER PRIMARY KEY DEFAULT 1,
        last_order_id INTEGER NOT NULL DEFAULT 999
      )
    `;
    // Insert default row if not exists
    await sql`
      INSERT INTO order_counter (id, last_order_id)
      VALUES (1, 999)
      ON CONFLICT (id) DO NOTHING
    `;
    // Increment and return next ID atomically
    const result = await sql`
      UPDATE order_counter
      SET last_order_id = last_order_id + 1
      WHERE id = 1
      RETURNING last_order_id
    `;
    return result[0].last_order_id;
  } catch (error) {
    console.error('Order counter error:', error);
    // Fallback
    return 1000 + Math.floor(Math.random() * 9000);
  }
};

// Create email transporter
const createTransporter = () => {
  try {
    return nodemailer.createTransport({
      host: process.env.ZOHO_HOST || 'smtp.zoho.in',
      port: parseInt(process.env.ZOHO_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.ZOHO_EMAIL,
        pass: process.env.ZOHO_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  } catch (error) {
    console.error('Failed to create transporter:', error);
    throw new Error('Email configuration error: ' + error.message);
  }
};

// Validation functions
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePhone = (phone) => /^\+?[\d\s\-\(\)]{10,15}$/.test(phone);

// Pre-order email service
const sendPreOrderEmail = async (orderData) => {
  try {
    const transporter = createTransporter();
    const { name, email, phone, address, productType, quantity, orderId } = orderData;

    const qty = parseInt(quantity);
    const userName = name || 'there';
    const fromEmail = process.env.ZOHO_EMAIL || 'info@aseflow.com';
    const timestamp = new Date().toLocaleString('en-IN', {
  timeZone: 'Asia/Kolkata',
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
  hour12: true,
  timeZoneName: 'short'
});


    const totalAmount = qty * 2999;
    const originalAmount = qty * 4999;

    const userMailOptions = {
      from: `"Aseflow Wellness" <${fromEmail}>`,
      replyTo: fromEmail,
      to: email,
      subject: `Order Confirmed – Your Aseflow Pre-Order #${orderId}`,
      headers: { 'X-Priority': '3', 'X-Mailer': 'Aseflow Mailer', 'List-Unsubscribe': `<mailto:${fromEmail}?subject=unsubscribe>` },
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">

          <!-- Header -->
          <div style="padding: 48px 48px 32px 48px; border-bottom: 1px solid #f0f0f0;">
            <h1 style="margin: 0; font-size: 22px; font-weight: 400; color: #000000; letter-spacing: 4px;">ASEFLOW</h1>
            <p style="margin: 4px 0 0 0; font-size: 12px; color: #999999; letter-spacing: 2px;">INDIA'S FIRST LIQUID PROTEIN SHOT</p>
          </div>

          <!-- Hero -->
          <div style="padding: 48px 48px 40px 48px;">
            <p style="margin: 0 0 8px 0; font-size: 13px; color: #999999; letter-spacing: 2px; text-transform: uppercase;">Order Confirmed</p>
            <h2 style="margin: 0 0 20px 0; font-size: 36px; font-weight: 300; color: #000000; line-height: 1.2;">Thank you,<br/>${userName}.</h2>
            <p style="margin: 0; font-size: 16px; color: #666666; line-height: 1.7; font-weight: 300;">
              Your pre-order has been received. We'll contact you soon to confirm delivery details. Payment will be collected at the time of delivery.
            </p>
          </div>

          <!-- Order Summary -->
          <div style="margin: 0 48px; background-color: #f9f9f9; border-radius: 12px; padding: 32px;">
            <p style="margin: 0 0 20px 0; font-size: 11px; color: #999999; letter-spacing: 2px; text-transform: uppercase;">Order Summary</p>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; font-size: 14px; color: #666666; font-weight: 300; border-bottom: 1px solid #eeeeee;">Order ID</td>
                <td style="padding: 10px 0; font-size: 14px; color: #000000; font-weight: 500; text-align: right; border-bottom: 1px solid #eeeeee;">#${orderId}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-size: 14px; color: #666666; font-weight: 300; border-bottom: 1px solid #eeeeee;">Product</td>
                <td style="padding: 10px 0; font-size: 14px; color: #000000; font-weight: 400; text-align: right; border-bottom: 1px solid #eeeeee;">${productType === 'marine' ? 'Marine Protein Shot' : 'Vegan Protein Shot'}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-size: 14px; color: #666666; font-weight: 300; border-bottom: 1px solid #eeeeee;">Quantity</td>
                <td style="padding: 10px 0; font-size: 14px; color: #000000; font-weight: 400; text-align: right; border-bottom: 1px solid #eeeeee;">${qty}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-size: 14px; color: #666666; font-weight: 300; border-bottom: 1px solid #eeeeee;">MRP</td>
                <td style="padding: 10px 0; font-size: 14px; color: #999999; font-weight: 300; text-align: right; text-decoration: line-through; border-bottom: 1px solid #eeeeee;">₹${originalAmount}</td>
              </tr>
              <tr>
                <td style="padding: 14px 0 0 0; font-size: 16px; color: #000000; font-weight: 500;">Total (40% off)</td>
                <td style="padding: 14px 0 0 0; font-size: 20px; color: #000000; font-weight: 400; text-align: right;">₹${totalAmount}</td>
              </tr>
            </table>
          </div>

          <!-- Discount Code -->
          <div style="margin: 24px 48px; border: 1px solid #000000; border-radius: 12px; padding: 28px; text-align: center;">
            <p style="margin: 0 0 8px 0; font-size: 11px; color: #999999; letter-spacing: 2px; text-transform: uppercase;">Your Exclusive Discount</p>
            <p style="margin: 0 0 12px 0; font-size: 32px; font-weight: 500; color: #000000; letter-spacing: 6px;">ASE30</p>
            <p style="margin: 0; font-size: 13px; color: #666666; font-weight: 300;">30% OFF on your next order</p>
          </div>

          <!-- Social Links -->
          <div style="padding: 32px 48px; text-align: center; border-top: 1px solid #f0f0f0; margin-top: 24px;">
            <p style="margin: 0 0 16px 0; font-size: 13px; color: #999999; font-weight: 300;">Follow us & stay updated</p>
            <a href="https://www.instagram.com/aseflowwellness" style="display: inline-block; margin: 0 8px; padding: 10px 20px; background-color: #000000; color: #ffffff; text-decoration: none; border-radius: 50px; font-size: 12px; letter-spacing: 1px;">Instagram</a>
            <a href="https://wa.me/918432706701" style="display: inline-block; margin: 0 8px; padding: 10px 20px; background-color: #000000; color: #ffffff; text-decoration: none; border-radius: 50px; font-size: 12px; letter-spacing: 1px;">WhatsApp</a>
          </div>

          <!-- Footer -->
          <div style="padding: 24px 48px 48px 48px; text-align: center;">
            <p style="margin: 0 0 4px 0; font-size: 13px; color: #000000; font-weight: 400; letter-spacing: 2px;">RIP IT. SIP IT. REPEAT.</p>
            <p style="margin: 16px 0 0 0; font-size: 12px; color: #bbbbbb; font-weight: 300;">© 2026 Aseflow Wellness. All rights reserved.</p>
          </div>

        </div>`,
      text: `Hi ${userName},

Your Aseflow pre-order is confirmed!

ORDER SUMMARY
Product: ${productType === 'marine' ? 'Marine Protein Shot' : 'Vegan Protein Shot'}
Quantity: ${qty}
Total: ₹${totalAmount} (40% off ₹${originalAmount})

YOUR DISCOUNT CODE: ASE30
30% OFF on your next order.

We'll contact you soon with delivery details. Payment on delivery.

Follow us:
Instagram: instagram.com/aseflowwellness
WhatsApp: +91 8432706701

RIP IT. SIP IT. REPEAT.
Team Aseflow`
    };

    const adminMailOptions = {
      from: `"Aseflow Wellness" <${fromEmail}>`,
      replyTo: fromEmail,
      to: fromEmail,
      subject: `🛍️ New Pre-Order #${orderId} – ${name} (₹${totalAmount})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #1A1A1A;">New Pre-Order Received</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; border-left: 4px solid #D4AF37;">
            <h3 style="color: #1A1A1A; margin-top: 0;">Customer Details:</h3>
            <p><strong>Order ID:</strong> #${orderId}</p>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Address:</strong> ${address}</p>
            <h3 style="color: #1A1A1A;">Order Details:</h3>
            <p><strong>Product Type:</strong> ${productType}</p>
            <p><strong>Quantity:</strong> ${qty}</p>
            <p><strong>Total Amount:</strong> ₹${totalAmount}</p>
            <p><strong>Timestamp:</strong> ${timestamp}</p>
          </div>
        </div>`,
      text: `New Pre-Order Received

Customer Details:
Name: ${name}
Email: ${email}
Phone: ${phone}
Address: ${address}

Order Details:
Product Type: ${productType}
Quantity: ${qty}
Total Amount: ₹${totalAmount}
Timestamp: ${timestamp}`
    };

    await Promise.all([
      transporter.sendMail(userMailOptions),
      transporter.sendMail(adminMailOptions)
    ]);
  } catch (error) {
    console.error('Pre-order email error:', error);
    throw new Error('Failed to send email: ' + error.message);
  }
};

// Main handler
exports.handler = async (event) => {

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const { name, email, phone, address, productType, quantity } = body;

    // Env check
    if (!process.env.ZOHO_EMAIL || !process.env.ZOHO_PASSWORD) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Email service not configured properly' }),
      };
    }

    // Validation
    if (!name || name.trim().length < 2)
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Name must be at least 2 characters' }) };

    if (!email || !validateEmail(email))
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Valid email is required' }) };

    if (!phone || !validatePhone(phone))
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Valid phone number is required' }) };

    if (!address || address.trim().length < 10)
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Address must be at least 10 characters' }) };

    if (!productType || !['marine', 'vegan'].includes(productType))
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Product must be marine or vegan' }) };

    if (!quantity || quantity < 1 || quantity > 50)
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Quantity must be between 1 and 50' }) };

    const orderId = await getNextOrderId();
    await sendPreOrderEmail({
      ...body,
      quantity: parseInt(body.quantity),
      orderId
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, message: 'Pre-order confirmed! Check your email for details.' }),
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

