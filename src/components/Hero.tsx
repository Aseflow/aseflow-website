import React, { useEffect, useState } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { trackPreOrderClick } from '../utils/analytics';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToNext = () => {
    const benefitsSection = document.getElementById('benefits');
    if (benefitsSection) {
      benefitsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBuyNow = () => {
    trackPreOrderClick('hero_buy_now');
    document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLearnMore = () => {
    document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative bg-white">
      <div className="container mx-auto px-6 text-center max-w-6xl">
        
        {/* Premium Badge */}
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center bg-gray-50 rounded-full px-6 py-2 mb-12 border border-gray-200">
            <div className="w-2 h-2 bg-black rounded-full mr-3"></div>
            <span className="text-sm font-medium text-gray-700 tracking-wide">INDIA'S FIRST LIQUID PROTEIN SHOT</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className={`transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-light mb-8 tracking-tight leading-none text-black">
            Protein.
            <br />
            <span className="font-normal">Reimagined.</span>
          </h1>
        </div>

        {/* Subline */}
        <div className={`mb-16 transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <p className="text-xl md:text-2xl font-light text-gray-600 max-w-3xl mx-auto leading-relaxed">
            24g of complete protein in a 40ml shot.
            <br />
            Engineered for instant absorption in under 15 minutes.
          </p>
        </div>

        {/* Key Specs */}
        <div className={`mb-16 transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-light text-black mb-2">24g</div>
              <div className="text-sm text-gray-500 font-medium">Complete Protein</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-light text-black mb-2">40ml</div>
              <div className="text-sm text-gray-500 font-medium">Ultra Compact</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-light text-black mb-2">&lt;15min</div>
              <div className="text-sm text-gray-500 font-medium">Absorption Time</div>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center mb-20 transition-all duration-1000 delay-800 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <button 
            onClick={handleBuyNow}
            className="group bg-black text-white font-medium py-4 px-8 rounded-full transition-all duration-300 hover:bg-gray-800 flex items-center gap-3 min-w-[160px]"
          >
            Buy Now
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button 
            onClick={handleLearnMore}
            className="group bg-white border border-gray-300 text-black font-medium py-4 px-8 rounded-full transition-all duration-300 hover:border-gray-400 flex items-center gap-3 min-w-[160px]"
          >
            Learn More
          </button>
        </div>

        {/* Innovation Statement */}
        <div className={`transition-all duration-1000 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <p className="text-sm text-gray-500 max-w-xl mx-auto">
            Precision-engineered liquid protein technology. 
            No shaker. No mixing. No compromise.
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button 
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
      >
        <ChevronDown size={24} />
      </button>
    </section>
  );
};

export default Hero;