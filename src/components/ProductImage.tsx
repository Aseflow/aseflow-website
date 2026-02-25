import React, { useEffect, useRef, useState } from 'react';

const ProductImage = () => {
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

  return (
    <section ref={sectionRef} id="product-image" className="py-20 md:py-24 pb-32 bg-white">
      <div className="container mx-auto px-6">
        <div className={`max-w-3xl mx-auto transform transition-all duration-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="flex flex-col items-center">
            {/* Label */}
            <h3 className="text-sm font-light text-black mb-16 tracking-wide">
              The product.
            </h3>

            {/* Product Image */}
            <div className="w-full flex justify-center mb-12">
              <img
                src="/Website.png"
                alt="Aseflow Protein Shot"
                className="max-w-2xl w-full h-auto object-contain"
                style={{
                  filter: 'drop-shadow(0 8px 32px rgba(0, 0, 0, 0.12))'
                }}
              />
            </div>

            {/* Micro Text */}
            <p className="text-xs text-gray-400 font-light">
              40 ml liquid protein shot
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductImage;
