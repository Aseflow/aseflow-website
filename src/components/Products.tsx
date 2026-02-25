import React, { useEffect, useRef, useState } from 'react';
import { Fish, Leaf } from 'lucide-react';
import { trackPreOrderClick } from '../utils/analytics';

const Products = () => {
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

  const scrollToOrder = () => {
    trackPreOrderClick('products_section');
    const orderSection = document.getElementById('order');
    if (orderSection) {
      orderSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const products = [
    {
      icon: <Fish className="w-8 h-8" />,
      name: "Marine Protein",
      builtFor: "Built for maximum performance and recovery",
      bullets: [
        "Complete amino acid profile",
        "Fast absorption formulation",
        "Premium marine source"
      ],
      specs: "24g protein • 40 ml shot • Absorbs in under 15 minutes • Zero sugar • Zero fat",
      introPrice: 2999,
      mrpPrice: 4999
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      name: "Vegan Protein",
      builtFor: "Built for clean, plant-based performance",
      bullets: [
        "100% plant-based blend",
        "Easy on digestion",
        "Sustainable protein source"
      ],
      specs: "24g protein • 40 ml shot • Absorbs in under 15 minutes • Zero sugar • Zero fat",
      introPrice: 2999,
      mrpPrice: 4999
    }
  ];

  return (
    <section ref={sectionRef} id="products" className="py-32 bg-white">
      <div className="container mx-auto px-6">

        {/* Header */}
        <div className={`text-center mb-24 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-5xl md:text-6xl font-light mb-8 tracking-tight text-black">
            Choose Your Protein
          </h2>
        </div>

        {/* Product Cards */}
        <div className="grid md:grid-cols-2 gap-16 max-w-5xl mx-auto mb-24">
          {products.map((product, index) => (
            <div
              key={index}
              className={`transform transition-all duration-700 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className="mb-8 text-black">
                {product.icon}
              </div>

              {/* Product Name */}
              <h3 className="text-3xl font-medium text-black mb-2">
                {product.name}
              </h3>

              {/* Built For Line */}
              <p className="text-gray-600 text-sm mb-8 leading-relaxed">
                {product.builtFor}
              </p>

              {/* Key Differentiator Bullets */}
              <ul className="space-y-3 mb-8">
                {product.bullets.map((bullet, bulletIndex) => (
                  <li key={bulletIndex} className="text-black text-sm leading-relaxed flex items-start">
                    <span className="mr-3 mt-1.5 w-1 h-1 bg-black rounded-full flex-shrink-0"></span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* Product Specifications */}
              <p className="text-gray-500 text-xs leading-relaxed mb-8 font-light">
                {product.specs}
              </p>

              {/* Pricing */}
              <div className="mb-8">
                <div className="text-2xl font-medium text-black mb-1">
                  ₹{product.introPrice.toLocaleString()}
                </div>
                <div className="text-sm text-gray-400 line-through">
                  ₹{product.mrpPrice.toLocaleString()} MRP
                </div>
                <p className="text-xs text-gray-500 mt-2 font-light">
                  Introductory pricing for first batch.
                </p>
              </div>

              {/* CTA Button */}
              <button
                onClick={scrollToOrder}
                className="w-full bg-black text-white font-medium py-3 px-6 rounded-full transition-all duration-300 hover:bg-gray-800 mb-3"
              >
                Pre-order
              </button>

              {/* CTA Subtext */}
              <p className="text-xs text-gray-500 text-center font-light">
                Ships soon. Limited first batch.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
