import React, { useEffect, useRef, useState } from 'react';

const About = () => {
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
    <section ref={sectionRef} id="about" className="py-32 bg-white">
      <div className="container mx-auto px-6">

        <div className={`max-w-3xl mx-auto transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-5xl md:text-6xl font-light mb-12 tracking-tight text-black leading-tight">
            A category-defining innovation.
          </h2>

          <div className="space-y-8 text-gray-700 text-lg leading-relaxed">
            <p>
              Traditional protein supplements were designed for a different era. They're inconvenient, messy, and require preparation.
            </p>

            <p>
              Aseflow changes this. A complete protein shot that absorbs in under 15 minutes. No shaker. No mixing. No compromise.
            </p>

            <p>
              This is protein for how people actually live today.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
