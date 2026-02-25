import React, { useEffect, useRef, useState } from 'react';
import { Dumbbell, Briefcase, Plane, Trophy } from 'lucide-react';

const UseCases = () => {
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

  const useCases = [
    {
      icon: <Dumbbell className="w-8 h-8" />,
      title: "Post Workout",
      description: "Instant recovery after training sessions"
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "Busy Workdays",
      description: "Protein fuel between meetings"
    },
    {
      icon: <Plane className="w-8 h-8" />,
      title: "Travel",
      description: "Compact nutrition on-the-go"
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Sports",
      description: "Fast fuel for peak performance"
    }
  ];

  return (
    <section ref={sectionRef} id="usecases" className="py-32 bg-white">
      <div className="container mx-auto px-6">

        {/* Use Cases Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-5xl mx-auto">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className={`transform transition-all duration-700 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className="mb-4 text-black">
                {useCase.icon}
              </div>

              {/* Title */}
              <h3 className="font-medium text-black mb-2 text-sm">
                {useCase.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {useCase.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;