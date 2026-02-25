// API service for handling form submissions
const API_BASE = '/.netlify/functions';

// Newsletter signup
export const submitNewsletter = async (data: { email: string; name?: string; source?: string }) => {
  try {
    const response = await fetch(`${API_BASE}/email-newsletter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to submit newsletter signup');
    }

    return result;
  } catch (error) {
    console.error('Newsletter API error:', error);
    throw error;
  }
};

// Pre-order submission
export const submitPreOrder = async (data: {
  name: string;
  email: string;
  phone: string;
  address: string;
  productType: string;
  quantity: number;
}) => {
  try {
    const response = await fetch(`${API_BASE}/email-pre-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to submit pre-order');
    }

    return result;
  } catch (error) {
    console.error('Pre-order API error:', error);
    throw error;
  }
};

// Contact form submission
export const submitContact = async (data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  try {
    const response = await fetch(`${API_BASE}/email-contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to submit contact form');
    }

    return result;
  } catch (error) {
    console.error('Contact API error:', error);
    throw error;
  }
};

// Health check for email service
export const checkEmailHealth = async () => {
  try {
    const response = await fetch(`${API_BASE}/email-health`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Email health check error:', error);
    return { status: 'error' };
  }
};