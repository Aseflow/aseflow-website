import React from 'react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-white text-black">
      <div className="container mx-auto px-6 py-24 max-w-3xl">
        <h1 className="text-4xl font-light mb-4 tracking-tight">Terms of Service</h1>
        <p className="text-gray-500 text-sm mb-12">Last updated: January 2025</p>

        <div className="space-y-10 font-light text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-xl font-medium text-black mb-3">1. Acceptance of Terms</h2>
            <p>By accessing and using the Aseflow website (aseflow.com), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services.</p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-black mb-3">2. Pre-Orders</h2>
            <p>Aseflow is currently in a pre-order phase. By placing a pre-order, you are reserving a product from our first batch. Payment is collected upon delivery. We will contact you via email or phone to confirm your order and provide an estimated delivery timeline. Pre-orders may be cancelled at any time before delivery by contacting us at info@aseflow.com.</p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-black mb-3">3. Product Information</h2>
            <p>We strive to display accurate product information including ingredients, specifications, and pricing. However, we reserve the right to make changes to product formulations and pricing before final delivery. You will be notified of any significant changes to your order.</p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-black mb-3">4. Health Disclaimer</h2>
            <p>Aseflow products are dietary supplements and are not intended to diagnose, treat, cure, or prevent any disease. Please consult a healthcare professional before using any supplement, especially if you have existing medical conditions, are pregnant, or are taking medications.</p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-black mb-3">5. Limitation of Liability</h2>
            <p>Aseflow Wellness shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or website. Our total liability to you shall not exceed the amount paid for the product in question.</p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-black mb-3">6. Governing Law</h2>
            <p>These Terms of Service are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts of India.</p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-black mb-3">7. Contact</h2>
            <p>For any questions regarding these Terms, contact us at <a href="mailto:info@aseflow.com" className="text-black underline">info@aseflow.com</a> or call +91 8432706701.</p>
          </section>

        </div>

        <div className="mt-16 pt-8 border-t border-gray-200">
          <a href="/" className="text-black font-medium hover:underline">← Back to Aseflow</a>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
