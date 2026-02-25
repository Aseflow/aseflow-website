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

// Validation function
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Contact email service
const sendContactEmail = async (contactData) => {
  try {
    const transporter = createTransporter();
    const { name, email, subject, message } = contactData;
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
console.log('🕒 Timestamp generated:', timestamp);


    console.log('Attempting to send contact email to:', email);

    const userMailOptions = {
      from: fromEmail,
      to: email,
      subject: "We've Received Your Message",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: #1A1A1A; padding: 30px; border-radius: 10px; text-align: center;">
            <h1 style="color: #D4AF37; font-size: 32px; margin-bottom: 10px; font-weight: bold;">ASEFLOW</h1>
            <p style="color: #D4AF37; font-size: 16px; margin-bottom: 30px;">WELLNESS</p>
            <h2 style="color: white; font-size: 24px; margin-bottom: 20px;">Message Received!</h2>
            <div style="background-color: rgba(212, 175, 55, 0.1); padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="color: white; font-size: 16px; line-height: 1.6; margin: 0;">
                Hi ${userName},<br><br>
                Thank you for contacting Aseflow. We've received your message and our team will be in touch with you shortly.
              </p>
            </div>
            <div style="margin: 30px 0;">
              <p style="color: #D4AF37; font-size: 18px; font-weight: bold;">RIP IT, SIP IT, REPEAT</p>
            </div>
            <p style="color: white; font-size: 16px;">
              Best regards,<br>
              <strong style="color: #D4AF37;">Team Aseflow</strong>
            </p>
          </div>
        </div>
      `,
      text: `Hi ${userName},\n\nThank you for contacting Aseflow. We've received your message and our team will be in touch with you shortly.\n\nBest regards,\nTeam Aseflow`,
    };

    const adminMailOptions = {
      from: fromEmail,
      to: fromEmail,
      subject: 'New Contact Form Submission - Aseflow',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #1A1A1A;">New Contact Form Submission</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; border-left: 4px solid #D4AF37;">
            <h3 style="color: #1A1A1A; margin-top: 0;">Contact Details:</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <h3 style="color: #1A1A1A;">Message:</h3>
            <div style="background-color: white; padding: 15px; border-radius: 5px; border: 1px solid #ddd;">
              <p style="margin: 0; white-space: pre-wrap;">${message}</p>
            </div>
            <p style="margin-top: 15px;"><strong>Timestamp:</strong> ${timestamp}</p>
          </div>
        </div>
      `,
      text: `New Contact Form Submission\n\nContact Details:\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}\n\nTimestamp: ${timestamp}`,
    };

    console.log('Sending contact emails...');
    await Promise.all([
      transporter.sendMail(userMailOptions),
      transporter.sendMail(adminMailOptions),
    ]);
    console.log('Contact emails sent successfully');
  } catch (error) {
    console.error('Contact email error:', error);
    throw new Error('Failed to send email: ' + error.message);
  }
};

// Main handler function
exports.handler = async (event, context) => {
  console.log('Contact function called with method:', event.httpMethod);
  console.log('Contact function body:', event.body);

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

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
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid JSON in request body' }),
      };
    }

    const { name, email, subject, message } = body;

    if (!process.env.ZOHO_EMAIL || !process.env.ZOHO_PASSWORD) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: 'Email service not configured. Please contact support.',
          details: 'Missing ZOHO_EMAIL or ZOHO_PASSWORD environment variables',
        }),
      };
    }

    // Validation
    if (!name || name.trim().length < 2) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Name must be at least 2 characters long' }),
      };
    }

    if (!email || !validateEmail(email)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Valid email is required' }),
      };
    }

    if (!subject || subject.trim().length < 5) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Subject must be at least 5 characters long' }),
      };
    }

    if (!message || message.trim().length < 10) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Message must be at least 10 characters long' }),
      };
    }

    await sendContactEmail(body);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: "Message sent successfully! We'll get back to you soon.",
      }),
    };
  } catch (error) {
    console.error('Contact function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Internal server error',
        message: error.message,
        details: 'Check Netlify function logs for more information',
        timestamp: new Date().toISOString(),
      }),
    };
  }
};
