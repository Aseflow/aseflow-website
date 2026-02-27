const nodemailer = require('nodemailer');

// CORS headers
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
};

// Create email transporter
const createTransporter = () => {
  try {
    return nodemailer.createTransport({
      host: process.env.ZOHO_HOST || 'smtp.zoho.in',
      port: parseInt(process.env.ZOHO_PORT) || 465,
      secure: true, // Use SSL for port 465
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

// Validation function
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Newsletter email service
const sendNewsletterEmail = async (email, name = '', source = 'newsletter') => {
  try {
    const transporter = createTransporter();
    const userName = name || 'there';
    const isPopup = source === 'popup';
    const fromEmail = process.env.ZOHO_EMAIL || 'info@aseflow.com';
    
    
    const userMailOptions = {
      from: `"Aseflow Wellness" <${fromEmail}>`,
      replyTo: fromEmail,
      to: email,
      subject: isPopup ? `You're on the Early Access List – Aseflow` : `Welcome to Aseflow – Stay in the Loop`,
      headers: {
        'X-Priority': '3',
        'X-Mailer': 'Aseflow Mailer',
        'List-Unsubscribe': `<mailto:${fromEmail}?subject=unsubscribe>`,
      },
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">

          <!-- Header -->
          <div style="padding: 48px 48px 32px 48px; border-bottom: 1px solid #f0f0f0;">
            <h1 style="margin: 0; font-size: 22px; font-weight: 400; color: #000000; letter-spacing: 4px;">ASEFLOW</h1>
            <p style="margin: 4px 0 0 0; font-size: 12px; color: #999999; letter-spacing: 2px;">INDIA'S FIRST LIQUID PROTEIN SHOT</p>
          </div>

          <!-- Hero -->
          <div style="padding: 48px 48px 40px 48px;">
            <p style="margin: 0 0 8px 0; font-size: 13px; color: #999999; letter-spacing: 2px; text-transform: uppercase;">${isPopup ? 'Early Access Confirmed' : 'Welcome'}</p>
            <h2 style="margin: 0 0 20px 0; font-size: 36px; font-weight: 300; color: #000000; line-height: 1.2;">
              ${isPopup ? `You're in,<br/>${userName}.` : `Welcome,<br/>${userName}.`}
            </h2>
            <p style="margin: 0; font-size: 16px; color: #666666; line-height: 1.7; font-weight: 300;">
              ${isPopup
                ? 'Thank you for signing up for early access. You\'ll be among the first to know when Aseflow launches — along with exclusive offers and priority delivery.'
                : 'Thank you for joining the Aseflow family. You\'ll receive updates on our launch, nutrition insights, and exclusive subscriber-only offers.'
              }
            </p>
          </div>

          <!-- Highlight Box -->
          <div style="margin: 0 48px; background-color: #000000; border-radius: 12px; padding: 32px; text-align: center;">
            <p style="margin: 0 0 8px 0; font-size: 13px; color: #999999; letter-spacing: 2px; text-transform: uppercase;">What's Coming</p>
            <p style="margin: 0 0 16px 0; font-size: 22px; font-weight: 300; color: #ffffff; line-height: 1.4;">24g protein.<br/>40ml shot.<br/>Under 15 minutes.</p>
            <p style="margin: 0; font-size: 13px; color: #666666; font-weight: 300;">India's first liquid protein shot — launching soon.</p>
          </div>

          <!-- Social Links -->
          <div style="padding: 32px 48px; text-align: center; border-top: 1px solid #f0f0f0; margin-top: 32px;">
            <p style="margin: 0 0 16px 0; font-size: 13px; color: #999999; font-weight: 300;">Follow us for updates</p>
            <a href="https://www.instagram.com/aseflowwellness" style="display: inline-block; margin: 0 8px; padding: 10px 20px; background-color: #000000; color: #ffffff; text-decoration: none; border-radius: 50px; font-size: 12px; letter-spacing: 1px;">Instagram</a>
            <a href="https://wa.me/918432706701" style="display: inline-block; margin: 0 8px; padding: 10px 20px; background-color: #000000; color: #ffffff; text-decoration: none; border-radius: 50px; font-size: 12px; letter-spacing: 1px;">WhatsApp</a>
          </div>

          <!-- Footer -->
          <div style="padding: 24px 48px 48px 48px; text-align: center;">
            <p style="margin: 0 0 4px 0; font-size: 13px; color: #000000; font-weight: 400; letter-spacing: 2px;">RIP IT. SIP IT. REPEAT.</p>
            <p style="margin: 16px 0 0 0; font-size: 12px; color: #bbbbbb; font-weight: 300;">© 2026 Aseflow Wellness. All rights reserved.</p>
          </div>

        </div>`,
      text: `Hi ${userName},\n\n${isPopup
        ? "You're on the Aseflow early access list! You'll be among the first to know when we launch — with exclusive offers and priority delivery."
        : "Welcome to the Aseflow family! You'll receive updates on our launch, nutrition insights, and exclusive subscriber-only offers."
      }\n\nFollow us:\nInstagram: instagram.com/aseflowwellness\nWhatsApp: +91 8432706701\n\nRIP IT. SIP IT. REPEAT.\nTeam Aseflow`
    };

    const adminMailOptions = {
      from: `"Aseflow Wellness" <${fromEmail}>`,
      replyTo: fromEmail,
      to: fromEmail,
      subject: `📩 New ${isPopup ? 'Early Access Signup' : 'Newsletter Subscriber'} – ${email}`,
html: `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
    <h2 style="color: #1A1A1A;">New ${isPopup ? 'Early Access' : 'Newsletter'} Subscription</h2>
    <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; border-left: 4px solid #D4AF37;">
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Name:</strong> ${name || 'Not provided'}</p>
      <p><strong>Source:</strong> ${isPopup ? 'Early Access Popup' : 'Newsletter Section'}</p>
      <p><strong>Timestamp:</strong> ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
    </div>
  </div>
`,

      text: `New ${isPopup ? 'Early Access' : 'Newsletter'} Subscription\n\nEmail: ${email}\nName: ${name || 'Not provided'}\nSource: ${isPopup ? 'Early Access Popup' : 'Newsletter Section'}\nTimestamp: ${new Date().toLocaleString()}`
    };

    await Promise.all([
      transporter.sendMail(userMailOptions),
      transporter.sendMail(adminMailOptions)
    ]);
  } catch (error) {
    console.error('Newsletter email error:', error);
    throw new Error('Failed to send email: ' + error.message);
  }
};

// Main handler function
exports.handler = async (event, context) => {

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    let body;
    
    try {
      body = JSON.parse(event.body || '{}');
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid JSON in request body' }),
      };
    }


    // Check if environment variables are set
    if (!process.env.ZOHO_EMAIL || !process.env.ZOHO_PASSWORD) {
      console.error('Missing email configuration');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Email service not configured. Please contact support.',
          details: 'Missing ZOHO_EMAIL or ZOHO_PASSWORD environment variables'
        }),
      };
    }

    const { email, name, source } = body;

    if (!email || !validateEmail(email)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Valid email is required' }),
      };
    }

    await sendNewsletterEmail(email, name, source);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: source === 'popup' 
          ? 'Thank you for your interest! Check your email for early access details.'
          : 'Newsletter subscription confirmed! Check your email.'
      }),
    };

  } catch (error) {
    console.error('Newsletter function error:', error);
    console.error('Error stack:', error.stack);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: error.message,
        details: 'Check Netlify function logs for more information',
        timestamp: new Date().toISOString()
      }),
    };
  }
};
