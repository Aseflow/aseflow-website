import React, { useEffect, useRef, useState } from 'react';
import { Shield, Award, Zap, Users } from 'lucide-react';

const Trust = () => {
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

  const trustFactors = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Science-Backed",
      description: "Advanced hydrolyzed protein technology for maximum bioavailability"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Lab Tested",
      description: "Third-party verified for purity, potency, and safety standards"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Proven Results",
      description: "Clinically demonstrated 8x faster absorption than traditional powders"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Athlete Approved",
      description: "Trusted by professional athletes and fitness experts"
    }
  ];

  return (
    <section ref={sectionRef} id="trust" className="py-32 bg-gray-50">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className={`text-center mb-20 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-4xl md:text-6xl font-light mb-6 tracking-tight text-black">
            Science Meets
            <br />
            <span className="font-normal">Innovation</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
            Every Aseflow shot is engineered with cutting-edge nutrition science.
          </p>
        </div>

        {/* Trust Factors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20 max-w-7xl mx-auto">
          {trustFactors.map((factor, index) => (
            <div 
              key={index}
              className={`bg-white rounded-2xl p-8 border border-gray-100 transition-all duration-700 hover:shadow-lg ${
                isVisible ? 'animate-fadeInUp' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-6">
                <div className="text-black">
                  {factor.icon}
                </div>
              </div>
              
              {/* Title */}
              <h3 className="text-xl font-medium text-black mb-4">
                {factor.title}
              </h3>
              
              {/* Description */}
              <p className="text-gray-600 leading-relaxed font-light">
                {factor.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Trust;