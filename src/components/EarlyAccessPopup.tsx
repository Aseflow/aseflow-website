import React, { useState, useEffect } from 'react';
import { X, Mail, Sparkles, CheckCircle } from 'lucide-react';
import { submitNewsletter } from '../services/api';
import { trackEarlyAccessSubmit } from '../utils/analytics';

const EarlyAccessPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Only hide permanently after they successfully submitted email
    const hasSignedUp = localStorage.getItem('aseflow_early_access_submitted');
    if (!hasSignedUp) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Do NOT save to localStorage on close - popup shows again next visit
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await submitNewsletter({
        email,
        source: 'popup'
      });

      trackEarlyAccessSubmit(email);

      setIsSuccess(true);
      // Only save after successful submission - popup won't show again
      localStorage.setItem('aseflow_early_access_submitted', 'true');

      setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    } catch (err) {
      setError('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full relative shadow-2xl animate-slideInUp">

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8 md:p-12">
          {!isSuccess ? (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2 mb-6">
                  <Sparkles className="w-4 h-4 text-black" />
                  <span className="text-sm font-medium text-gray-700 tracking-wide">EARLY ACCESS</span>
                </div>

                <h2 className="text-3xl md:text-4xl font-light text-black mb-4 tracking-tight">
                  Get <span className="font-normal">Exclusive</span> Access
                </h2>

                <p className="text-gray-600 text-lg font-light leading-relaxed">
                  Be the first to experience India's revolutionary liquid protein shot. Limited slots available.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <Mail className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                    }}
                    placeholder="Enter your email address"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                    disabled={isSubmitting}
                  />
                </div>

                {error && (
                  <p className="text-red-500 text-sm">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-black text-white font-medium py-4 px-8 rounded-full transition-all duration-300 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Get Early Access'}
                </button>
              </form>

              {/* Benefits */}
              <div className="mt-8 pt-8 border-t border-gray-100">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-600 text-sm">
                    <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                    <span>Exclusive launch pricing</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600 text-sm">
                    <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                    <span>Priority delivery access</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600 text-sm">
                    <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                    <span>Special member benefits</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* Success State */
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-50 rounded-full mb-6">
                <CheckCircle className="w-8 h-8 text-black" />
              </div>

              <h3 className="text-2xl font-medium text-black mb-4">
                You're In!
              </h3>

              <p className="text-gray-600 text-lg font-light leading-relaxed mb-6">
                Check your email for exclusive early access details and special offers.
              </p>

              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-black font-medium text-sm">
                  Welcome to the Aseflow family
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EarlyAccessPopup;
