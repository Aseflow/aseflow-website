import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white text-black">
      <div className="container mx-auto px-6 py-24 max-w-3xl">
        <h1 className="text-4xl font-light mb-4 tracking-tight">Privacy Policy</h1>
        <p className="text-gray-500 text-sm mb-12">Last updated: January 2025</p>

        <div className="space-y-10 font-light text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-xl font-medium text-black mb-3">1. Information We Collect</h2>
            <p>When you place a pre-order or sign up for early access on Aseflow, we collect information you voluntarily provide including your name, email address, phone number, and delivery address. We also collect basic analytics data such as pages visited and time spent on site.</p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-black mb-3">2. How We Use Your Information</h2>
            <p>We use your information solely to process your pre-order, send order confirmations, provide delivery updates, and send you relevant communications about Aseflow products. We do not sell or share your personal data with third parties for marketing purposes.</p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-black mb-3">3. Data Security</h2>
            <p>We take reasonable measures to protect your personal information. Your data is stored securely and accessed only by authorised personnel required to fulfill your order.</p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-black mb-3">4. Cookies</h2>
            <p>We use cookies to improve your experience on our website and to track basic analytics. You can disable cookies in your browser settings, though some features may not work as intended.</p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-black mb-3">5. Your Rights</h2>
            <p>You have the right to request access to, correction of, or deletion of your personal data at any time. To exercise these rights, please contact us at info@aseflow.com.</p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-black mb-3">6. Contact</h2>
            <p>If you have any questions about this Privacy Policy, please reach out to us at <a href="mailto:info@aseflow.com" className="text-black underline">info@aseflow.com</a> or call us at +91 8432706701.</p>
          </section>

        </div>

        <div className="mt-16 pt-8 border-t border-gray-200">
          <a href="/" className="text-black font-medium hover:underline">← Back to Aseflow</a>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
