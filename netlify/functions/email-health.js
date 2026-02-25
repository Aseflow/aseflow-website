exports.handler = async () => {
  const emailConfigured = !!(process.env.ZOHO_EMAIL && process.env.ZOHO_PASSWORD && process.env.ZOHO_HOST && process.env.ZOHO_PORT);

  return {
    statusCode: 200,
    body: JSON.stringify({
      status: emailConfigured ? 'configured' : 'needs_configuration',
      timestamp: new Date().toISOString(),
    }),
  };
};
