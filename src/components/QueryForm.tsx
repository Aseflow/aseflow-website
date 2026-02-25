import React, { useState } from 'react';
import { Send, MessageCircle, User, Mail, Phone, CheckCircle, AlertCircle } from 'lucide-react';

const QueryForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/.netlify/functions/email-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        setError('Failed to send message. Please try again.');
      }
    } catch (error) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-32 bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-brand-gold/20 to-yellow-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Floating Particles */}
        <div className="absolute top-32 left-1/4 w-3 h-3 bg-brand-gold/60 rounded-full animate-bounce delay-100"></div>
        <div className="absolute top-48 right-1/4 w-2 h-2 bg-purple-400/60 rounded-full animate-bounce delay-300"></div>
        <div className="absolute bottom-40 left-1/3 w-4 h-4 bg-pink-400/60 rounded-full animate-bounce delay-500"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-brand-gold/20 to-purple-500/20 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-bold mb-8 border border-brand-gold/30">
              <MessageCircle className="w-4 h-4" />
              <span className="bg-gradient-to-r from-brand-gold to-yellow-400 bg-clip-text text-transparent tracking-wider">GET IN TOUCH</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent mb-8 leading-tight">
              Have Questions?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Our team of experts is here to help you achieve your fitness goals. Reach out to us!
            </p>
          </div>

          {!isSubmitted ? (
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-white/10 relative">
              {/* Floating Elements */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-brand-gold to-yellow-400 rounded-full animate-bounce delay-100"></div>
              <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-bounce delay-300"></div>

              {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <p className="text-red-400">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <div className="relative group">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-brand-gold transition-colors" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 border border-white/20 rounded-xl focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-all duration-300 bg-white/10 backdrop-blur-sm text-white placeholder-gray-400"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="relative group">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-brand-gold transition-colors" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 border border-white/20 rounded-xl focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-all duration-300 bg-white/10 backdrop-blur-sm text-white placeholder-gray-400"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Phone Field */}
                  <div className="relative group">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-brand-gold transition-colors" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 border border-white/20 rounded-xl focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-all duration-300 bg-white/10 backdrop-blur-sm text-white placeholder-gray-400"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>

                  {/* Subject Field */}
                  <div className="relative group">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Subject *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-4 border border-white/20 rounded-xl focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-all duration-300 bg-white/10 backdrop-blur-sm text-white"
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="product-inquiry">Product Inquiry</option>
                      <option value="order-support">Order Support</option>
                      <option value="nutrition-advice">Nutrition Advice</option>
                      <option value="partnership">Partnership</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Message Field */}
                <div className="relative group">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-4 border border-white/20 rounded-xl focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-all duration-300 bg-white/10 backdrop-blur-sm resize-none text-white placeholder-gray-400"
                    placeholder="Tell us how we can help you..."
                    required
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex items-center gap-3 bg-gradient-to-r from-brand-gold to-yellow-500 hover:from-yellow-500 hover:to-brand-gold text-black px-10 py-5 rounded-xl font-bold transition-all duration-500 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-brand-gold/25"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-white/30 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* Success State */
            <div className="text-center">
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/10 max-w-md mx-auto">
                <div className="w-20 h-20 bg-gradient-to-r from-brand-gold to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Message Sent Successfully!</h3>
                <p className="text-gray-300 mb-8">
                  Thank you for reaching out! Our team will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-brand-gold hover:text-yellow-400 font-medium transition-colors"
                >
                  Send another message
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default QueryForm;