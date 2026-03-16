import React, { useEffect, useRef, useState } from 'react';
import { Check } from 'lucide-react';

const comparisons = [
  {
    feature: "Absorption",
    powder: "90–120 minutes",
    aseflow: "Under 15 minutes"
  },
  {
    feature: "Preparation",
    powder: "Mix, measure, clean",
    aseflow: "Open. Drink. Done."
  },
  {
    feature: "Portability",
    powder: "Bulky tubs and shakers",
    aseflow: "40ml. Fits anywhere."
  },
  {
    feature: "Convenience",
    powder: "Needs water, shaker, time",
    aseflow: "Zero equipment. Zero prep."
  },
  {
    feature: "Precision",
    powder: "Inconsistent scoops",
    aseflow: "Exact dose. Every time."
  }
];

const Comparison = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="comparison" className="py-32 bg-white">
      <div className="container mx-auto px-6">

        {/* Header — left aligned, confident */}
        <div className={`max-w-5xl mx-auto mb-20 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <p className="text-xs font-medium tracking-[0.3em] text-gray-300 uppercase mb-8">
            A Better Way Exists
          </p>
          <h2 className="text-5xl md:text-6xl font-light tracking-tight leading-[1.1] text-black">
            The world moved on.
            <br />
            <span className="text-gray-300">Protein should too.</span>
          </h2>
        </div>

        {/* Comparison — asymmetric layout */}
        <div className="max-w-5xl mx-auto">

          {/* Column headers */}
          <div className={`grid grid-cols-7 gap-4 mb-6 transform transition-all duration-1000 delay-200 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            {/* Feature label space */}
            <div className="col-span-3"/>

            {/* Powder — small, faded, past */}
            <div className="col-span-2 text-center">
              <div className="inline-block px-4 py-2 rounded-full border border-gray-100">
                <p className="text-xs text-gray-300 font-light tracking-widest uppercase">Powder</p>
              </div>
            </div>

            {/* Aseflow — dominant, alive */}
            <div className="col-span-2 text-center">
              <div className="inline-block bg-black px-6 py-2 rounded-full">
                <p className="text-xs text-white font-medium tracking-widest uppercase">Aseflow</p>
              </div>
            </div>
          </div>

          {/* Rows */}
          <div className="space-y-0">
            {comparisons.map((row, index) => (
              <div
                key={index}
                className={`grid grid-cols-7 gap-4 items-center py-6 border-t border-gray-100 transform transition-all duration-700 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${(index + 2) * 100}ms` }}
              >
                {/* Feature */}
                <div className="col-span-3">
                  <p className="text-base font-medium text-black">{row.feature}</p>
                </div>

                {/* Powder — grey, small, tired */}
                <div className="col-span-2 text-center">
                  <p className="text-sm text-gray-300 font-light leading-snug">{row.powder}</p>
                </div>

                {/* Aseflow — black, bold, alive */}
                <div className="col-span-2">
                  <div className="bg-black rounded-2xl px-5 py-3 flex items-center gap-3">
                    <Check className="w-4 h-4 text-white flex-shrink-0"/>
                    <p className="text-sm text-white font-medium leading-snug">{row.aseflow}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Bottom border */}
            <div className="border-t border-gray-100"/>
          </div>

          {/* Bottom CTA — not a box, just a line */}
          <div className={`mt-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 transform transition-all duration-1000 delay-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <p className="text-2xl md:text-3xl font-light text-black max-w-lg leading-tight tracking-tight">
              The science was always there.
              <span className="text-gray-300"> Someone just had to build it right.</span>
            </p>
            <button
              onClick={() => document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex-shrink-0 bg-black text-white font-light text-sm tracking-[0.15em] uppercase py-4 px-10 rounded-full hover:bg-gray-900 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              Secure My First Batch
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Comparison;
