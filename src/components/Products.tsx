import React, { useEffect, useRef, useState } from 'react';
import { Fish, Leaf, Zap, Clock } from 'lucide-react';
import { trackPreOrderClick } from '../utils/analytics';

const Products = () => {
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

  const scrollToOrder = () => {
    trackPreOrderClick('products_section');
    const orderSection = document.getElementById('order');
    if (orderSection) orderSection.scrollIntoView({ behavior: 'smooth' });
  };

  const products = [
    {
      icon: <Fish className="w-8 h-8" />,
      name: "Marine Protein",
      builtFor: "Built for maximum performance and recovery",
      bullets: ["Complete amino acid profile", "Fast absorption formulation", "Premium marine source"],
      specs: "24g protein • 40 ml shot • Absorbs in under 15 minutes • Zero sugar • Zero fat",
      introPrice: 2999, mrpPrice: 4999
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      name: "Vegan Protein",
      builtFor: "Built for clean, plant-based performance",
      bullets: ["100% plant-based blend", "Easy on digestion", "Sustainable protein source"],
      specs: "24g protein • 40 ml shot • Absorbs in under 15 minutes • Zero sugar • Zero fat",
      introPrice: 2999, mrpPrice: 4999
    }
  ];

  return (
    <section ref={sectionRef} id="products" className="py-32 bg-white">
      <div className="container mx-auto px-6">

        {/* Header */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-5xl md:text-6xl font-light mb-6 tracking-tight text-black">
            Choose Your Protein
          </h2>
          <div className="flex flex-col items-center gap-3">
            <div className="inline-flex items-center gap-2 bg-black text-white rounded-full px-6 py-3">
              <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></span>
              <span className="text-sm font-medium tracking-wide">First Batch Limited to <strong>999 Units</strong> Only</span>
            </div>
            <p className="text-sm text-gray-500 font-light">Be part of it — or miss it.</p>
          </div>
        </div>

        {/* TRIAL PACK HERO CARD */}
        <div className={`max-w-2xl mx-auto mb-20 transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="relative bg-black text-white rounded-3xl p-8 md:p-10 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-[0.03] rounded-full -translate-y-1/2 translate-x-1/2"></div>

            <div className="inline-flex items-center gap-2 bg-white text-black text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
              <Zap className="w-3 h-3" />
              Best Way to Start
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-medium mb-2">Trial Pack</h3>
                <p className="text-gray-400 font-light mb-6">6 shots · Try before you commit</p>
                <ul className="space-y-2 mb-8">
                  {["Experience results in 6 days", "Mix & match Marine + Vegan", "Free shipping included", "No subscription required"].map(b => (
                    <li key={b} className="flex items-center gap-3 text-sm text-gray-300">
                      <span className="w-1.5 h-1.5 bg-white rounded-full flex-shrink-0"></span>
                      {b}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-gray-500 font-light">24g protein • 40ml shot • Zero sugar • Zero fat</p>
              </div>

              <div className="text-center md:text-right">
                <div className="text-gray-500 line-through text-lg mb-1">₹1,499</div>
                <div className="text-5xl font-bold mb-1">₹799</div>
                <div className="inline-block bg-white/10 text-white text-xs px-3 py-1 rounded-full mb-6">
                  47% OFF · Introductory Price
                </div>
                <button
                  onClick={scrollToOrder}
                  className="w-full bg-white text-black font-bold py-4 px-8 rounded-full transition-all duration-300 hover:bg-gray-100 hover:scale-105 active:scale-95 mb-3"
                >
                  Claim Trial Pack
                </button>
                <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  <span>Ships in 3–5 business days</span>
                </div>
              </div>
            </div>

              <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-center gap-2">
                <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></span>
                <span className="text-xs text-red-400 font-medium">Part of our 999-unit first batch — pre-order to secure yours</span>
              </div>
          </div>
        </div>

        {/* Full Packs */}
        <div className="text-center mb-12">
          <p className="text-gray-400 text-sm uppercase tracking-widest font-light">Or go all in with a full pack</p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 max-w-5xl mx-auto mb-24">
          {products.map((product, index) => (
            <div
              key={index}
              className={`transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="mb-8 text-black">{product.icon}</div>
              <h3 className="text-3xl font-medium text-black mb-2">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-8 leading-relaxed">{product.builtFor}</p>
              <ul className="space-y-3 mb-8">
                {product.bullets.map((bullet, bulletIndex) => (
                  <li key={bulletIndex} className="text-black text-sm leading-relaxed flex items-start">
                    <span className="mr-3 mt-1.5 w-1 h-1 bg-black rounded-full flex-shrink-0"></span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <p className="text-gray-500 text-xs leading-relaxed mb-8 font-light">{product.specs}</p>
              <div className="mb-8">
                <div className="text-2xl font-medium text-black mb-1">₹{product.introPrice.toLocaleString()}</div>
                <div className="text-sm text-gray-400 line-through">₹{product.mrpPrice.toLocaleString()} MRP</div>
                <p className="text-xs text-gray-500 mt-2 font-light">Introductory pricing · First batch only.</p>
              </div>
              <button
                onClick={scrollToOrder}
                className="w-full bg-black text-white font-medium py-3 px-6 rounded-full transition-all duration-300 hover:bg-gray-800 mb-3"
              >
                Pre-order
              </button>
              <p className="text-xs text-gray-500 text-center font-light">Ships soon. Limited first batch.</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
