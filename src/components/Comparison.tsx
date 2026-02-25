import React, { useEffect, useRef, useState } from 'react';
import { X, Check } from 'lucide-react';

const Comparison = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const comparisons = [
    {
      feature: "Absorption Time",
      traditional: "90-120 minutes",
      aseflow: "Under 15 minutes"
    },
    {
      feature: "Preparation",
      traditional: "Mixing, measuring, cleaning",
      aseflow: "Ready to drink"
    },
    {
      feature: "Portability",
      traditional: "Bulky containers",
      aseflow: "40ml compact shot"
    },
    {
      feature: "Convenience",
      traditional: "Requires shaker + water",
      aseflow: "No equipment needed"
    }
  ];

  return (
    <section ref={sectionRef} id="comparison" className="py-32 bg-white">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className={`text-center mb-20 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-4xl md:text-6xl font-light mb-6 tracking-tight text-black">
            Traditional vs
            <br />
            <span className="font-normal">Revolutionary</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
            A fundamental reimagining of protein supplementation.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="max-w-5xl mx-auto">
          
          {/* Headers */}
          <div className={`grid grid-cols-3 gap-8 mb-12 transform transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div></div>
            <div className="text-center">
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <h3 className="text-lg font-medium text-gray-700 mb-2">Traditional Protein</h3>
                <p className="text-sm text-gray-500">Powder supplements</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-black rounded-2xl p-6">
                <h3 className="text-lg font-medium text-white mb-2">Aseflow</h3>
                <p className="text-sm text-gray-300">Liquid protein shot</p>
              </div>
            </div>
          </div>

          {/* Comparison Rows */}
          <div className="space-y-6">
            {comparisons.map((comparison, index) => (
              <div 
                key={index}
                className={`grid grid-cols-3 gap-8 items-center py-6 border-b border-gray-100 last:border-b-0 transform transition-all duration-1000 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ animationDelay: `${(index + 1) * 200}ms` }}
              >
                {/* Feature */}
                <div>
                  <h4 className="text-lg font-medium text-black">{comparison.feature}</h4>
                </div>

                {/* Traditional */}
                <div className="text-center">
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <X className="w-5 h-5 text-gray-400" />
                    </div>
                    <span className="text-gray-600 font-light">{comparison.traditional}</span>
                  </div>
                </div>

                {/* Aseflow */}
                <div className="text-center">
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <Check className="w-5 h-5 text-black" />
                    </div>
                    <span className="text-black font-medium">{comparison.aseflow}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Statement */}
          <div className={`text-center mt-20 transform transition-all duration-1000 delay-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="bg-gray-50 rounded-2xl p-12 border border-gray-200">
              <h3 className="text-2xl md:text-3xl font-light text-black mb-6">
                The future of protein is here.
              </h3>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto font-light">
                Experience the next generation of nutrition technology.
              </p>
              <button 
                onClick={() => document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-black text-white font-medium py-4 px-8 rounded-full transition-all duration-300 hover:bg-gray-800"
              >
                Experience Aseflow
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comparison;