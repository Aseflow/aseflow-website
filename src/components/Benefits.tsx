import React, { useEffect, useRef, useState } from 'react';
import { Zap, Clock, Droplets, Shield } from 'lucide-react';

const Benefits = () => {
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

  const benefits = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "24g Protein in 40ml",
      description: "Maximum protein density in minimal volume. Precision-engineered for efficiency."
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "15 Minute Absorption",
      description: "Advanced hydrolyzed protein technology for rapid bioavailability."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Zero Sugar, Zero Fat",
      description: "Pure protein formulation. No unnecessary additives or fillers."
    },
    {
      icon: <Droplets className="w-8 h-8" />,
      title: "Ready to Drink",
      description: "No preparation required. Engineered for ultimate convenience."
    }
  ];

  return (
    <section ref={sectionRef} id="benefits" className="py-32 bg-gray-50">
      <div className="container mx-auto px-6">
        
        {/* Section Header */}
        <div className={`text-center mb-20 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-4xl md:text-6xl font-light mb-6 tracking-tight text-black">
            Engineered for
            <br />
            <span className="font-normal">Performance</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
            Every aspect optimized for the modern athlete's needs.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className={`group bg-white rounded-2xl p-8 transition-all duration-700 hover:shadow-lg border border-gray-100 ${
                isVisible ? 'animate-fadeInUp' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-gray-100 transition-colors duration-300">
                <div className="text-black">
                  {benefit.icon}
                </div>
              </div>
              
              {/* Title */}
              <h3 className="text-xl font-medium text-black mb-4 leading-tight">
                {benefit.title}
              </h3>
              
              {/* Description */}
              <p className="text-gray-600 leading-relaxed font-light">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Statement */}
        <div className={`text-center mt-20 transform transition-all duration-1000 delay-600 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-600 font-light leading-relaxed">
              Traditional protein supplements were designed for a different era. 
              Aseflow represents the future of nutrition technology.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;