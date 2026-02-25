import React, { useState } from 'react';
import { Mail, Send, Gift, Star, CheckCircle } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    try {
      const response = await fetch('/.netlify/functions/email-newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setEmail('');
      }
    } catch (error) {
      console.error('Newsletter signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-32 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-brand-gold/20 to-yellow-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Floating Particles */}
        <div className="absolute top-20 left-1/4 w-3 h-3 bg-brand-gold/60 rounded-full animate-bounce delay-100"></div>
        <div className="absolute top-40 right-1/4 w-2 h-2 bg-purple-400/60 rounded-full animate-bounce delay-300"></div>
        <div className="absolute bottom-32 left-1/3 w-4 h-4 bg-pink-400/60 rounded-full animate-bounce delay-500"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {!isSubmitted ? (
            <>
              {/* Header */}
              <div className="mb-12">
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-brand-gold/20 to-purple-500/20 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-bold mb-8 border border-brand-gold/30">
                  <Gift className="w-4 h-4" />
                  <span className="bg-gradient-to-r from-brand-gold to-yellow-400 bg-clip-text text-transparent tracking-wider">EXCLUSIVE OFFERS</span>
                </div>
                
                <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
                  Join the{' '}
                  <br />
                  <span className="bg-gradient-to-r from-brand-gold via-yellow-400 to-brand-gold bg-clip-text text-transparent">
                    Revolution
                  </span>
                </h2>
                
                <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                  Get exclusive access to new products, special discounts, and revolutionary fitness tips
                </p>

                {/* Benefits */}
                <div className="flex flex-wrap justify-center gap-8 mb-16">
                  {[
                    { icon: Star, text: "Exclusive Discounts" },
                    { icon: Gift, text: "Early Access" },
                    { icon: Mail, text: "Premium Content" }
                  ].map((benefit, index) => {
                    const IconComponent = benefit.icon;
                    return (
                      <div key={index} className="flex items-center gap-3 text-gray-300 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
                        <div className="w-8 h-8 bg-gradient-to-r from-brand-gold to-yellow-500 rounded-lg flex items-center justify-center">
                          <IconComponent className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm font-semibold">{benefit.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Newsletter Form */}
              <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-gold to-yellow-500 rounded-2xl blur opacity-60 group-hover:opacity-100 transition duration-500"></div>
                  <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-3 border border-white/20">
                    <div className="flex">
                      <div className="flex-1 relative">
                        <Mail className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-brand-gold transition-colors" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email address"
                          className="w-full pl-14 pr-4 py-5 bg-transparent text-white placeholder-gray-400 focus:outline-none text-lg"
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-gradient-to-r from-brand-gold to-yellow-500 hover:from-yellow-500 hover:to-brand-gold text-black px-10 py-5 rounded-xl font-bold transition-all duration-500 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 group relative overflow-hidden shadow-xl"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-white/30 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        {isLoading ? (
                          <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin relative z-10"></div>
                        ) : (
                          <>
                            <Send className="w-6 h-6 group-hover:translate-x-1 transition-transform relative z-10" />
                            <span className="relative z-10">Subscribe</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-400 text-sm mt-6">
                  No spam, unsubscribe at any time. Your privacy is our priority.
                </p>
              </form>
            </>
          ) : (
            /* Success State */
            <div className="max-w-lg mx-auto">
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-12 border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-r from-brand-gold to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-6">Welcome to the Revolution!</h3>
                <p className="text-gray-300 mb-8 text-lg">
                  You're now part of our exclusive community. Check your email for a special welcome offer!
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-brand-gold hover:text-yellow-400 transition-colors font-semibold"
                >
                  Subscribe another email
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Newsletter;