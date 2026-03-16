import React, { useEffect, useRef, useState } from 'react';

const About = () => {
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
    <section ref={sectionRef} id="about" className="py-40 bg-white">
      <div className="container mx-auto px-6">
        <div className={`max-w-3xl mx-auto transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>

          {/* No label. The words speak for themselves. */}

          {/* TRUTH — undeniable, universal */}
          <p className="text-4xl md:text-5xl font-light text-black leading-[1.15] tracking-tight mb-12">
            Some people refuse to accept
            ordinary — in their work,
            their training, their life.
          </p>

          {/* TENSION — the gap that exists */}
          <p className="text-xl text-gray-400 font-light leading-relaxed mb-12 max-w-2xl">
            They obsess over every detail. They optimise everything.
            They hold themselves to a standard the world has not yet caught up with.
            And yet — for decades — their nutrition was never built for them.
            It was built for everyone. Which means it was built for no one exceptional.
          </p>

          {/* BELIEF — what Aseflow exists to do */}
          <p className="text-xl text-gray-400 font-light leading-relaxed mb-20 max-w-2xl">
            We believe precision nutrition should match the precision
            of the people who consume it. Instant. Exact. Uncompromising.
            A single shot that delivers everything the human body needs
            to perform at its absolute peak — and nothing it doesn't.
          </p>

          {/* DECLARATION — the line that earns its place */}
          <div className="pt-16 border-t border-gray-100">
            <p className="text-4xl md:text-5xl font-light text-black tracking-tight leading-[1.15]">
              This is not a supplement.
              <br />
              <span className="text-gray-300">This is a standard.</span>
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
