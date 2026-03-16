import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { trackPreOrderClick } from '../utils/analytics';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const handleBuyNow = () => {
    trackPreOrderClick('hero_buy_now');
    document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToNext = () => {
    document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex flex-col items-center justify-center relative bg-white">

      <div className="container mx-auto px-6 text-center max-w-4xl">

        {/* India's First — tiny, quiet, confident */}
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="text-xs font-medium tracking-[0.3em] text-gray-400 uppercase mb-16">
            India's First Liquid Protein Shot
          </p>
        </div>

        {/* THE headline — nothing else matters */}
        <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h1 className="text-6xl md:text-8xl font-light tracking-tight leading-[1.05] text-black mb-8">
            The future of protein.
            <br />
            <em className="not-italic font-extralight text-gray-400">In a single shot.</em>
          </h1>
        </div>

        {/* One line. That's it. */}
        <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="text-lg md:text-xl font-light text-gray-500 mb-16 tracking-wide">
            Small shot. Serious results.
          </p>
        </div>

        {/* One button. */}
        <div className={`transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <button
            onClick={handleBuyNow}
            className="bg-black text-white font-light text-sm tracking-[0.15em] uppercase py-4 px-12 rounded-full hover:bg-gray-900 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            Secure My First Batch
          </button>
        </div>

        {/* First batch — whispered, not shouted */}
        <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="text-xs text-gray-300 mt-5 tracking-widest font-light">
            First batch · 999 units only
          </p>
        </div>

      </div>

      {/* Scroll */}
      <button
        onClick={scrollToNext}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-200 hover:text-gray-400 transition-colors duration-300"
      >
        <ChevronDown size={20} />
      </button>

    </section>
  );
};

export default Hero;
