import React, { useState, useEffect, useRef } from 'react';
import { Share2, Copy, CheckCircle, MessageCircle, Instagram } from 'lucide-react';

const ReferralShare = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const referralUrl = 'https://aseflow.com';

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(`Hey! Check out Aseflow — India's first liquid protein shot. 24g protein in just 40ml, absorbs in under 15 minutes. Currently available at launch price! 👉 ${referralUrl}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleInstagram = () => {
    // Copy text and open Instagram
    navigator.clipboard.writeText(`Check out Aseflow — India's first liquid protein shot! ${referralUrl}`);
    window.open('https://www.instagram.com/', '_blank');
  };

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Aseflow — India\'s First Liquid Protein Shot',
        text: '24g protein in just 40ml. Absorbs in under 15 minutes. Check it out!',
        url: referralUrl,
      });
    }
  };

  return (
    <section ref={sectionRef} id="share" className="py-24 bg-black">
      <div className="container mx-auto px-6">
        <div className={`max-w-3xl mx-auto text-center transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>

          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-8">
            <Share2 className="w-7 h-7 text-white" />
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-light text-white mb-4 tracking-tight">
            Know someone who'd
            <br />
            <span className="font-normal">love this?</span>
          </h2>

          <p className="text-gray-400 text-lg font-light mb-12 max-w-xl mx-auto leading-relaxed">
            Share Aseflow with your friends and help them discover India's first liquid protein shot.
          </p>

          {/* Share Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">

            {/* WhatsApp */}
            <button
              onClick={handleWhatsApp}
              className="flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 text-white font-light py-4 px-8 rounded-full transition-all duration-300 border border-white/20"
            >
              <MessageCircle className="w-5 h-5" />
              Share on WhatsApp
            </button>

            {/* Native Share (mobile) / Instagram (desktop) */}
            {typeof navigator !== 'undefined' && navigator.share ? (
              <button
                onClick={handleNativeShare}
                className="flex items-center justify-center gap-3 bg-white text-black font-medium py-4 px-8 rounded-full transition-all duration-300 hover:bg-gray-100"
              >
                <Share2 className="w-5 h-5" />
                Share
              </button>
            ) : (
              <button
                onClick={handleInstagram}
                className="flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 text-white font-light py-4 px-8 rounded-full transition-all duration-300 border border-white/20"
              >
                <Instagram className="w-5 h-5" />
                Share on Instagram
              </button>
            )}
          </div>

          {/* Copy Link */}
          <div className="flex items-center justify-center gap-3 max-w-sm mx-auto">
            <div className="flex-1 bg-white/10 border border-white/20 rounded-full px-5 py-3 text-gray-400 text-sm font-light text-left truncate">
              {referralUrl}
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 bg-white text-black font-medium py-3 px-5 rounded-full transition-all duration-300 hover:bg-gray-100 text-sm whitespace-nowrap"
            >
              {copied ? (
                <>
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy Link
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ReferralShare;
