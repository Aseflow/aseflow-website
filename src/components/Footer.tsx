import React from 'react';
import { Mail, Phone, MapPin, Instagram, MessageCircle, Linkedin } from 'lucide-react';

const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const quickLinks = [
    { label: 'Benefits', section: 'benefits' },
    { label: 'Science', section: 'trust' },
    { label: 'Use Cases', section: 'usecases' },
    { label: 'Products', section: 'products' },
    { label: 'Order', section: 'order' },
  ];

  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">

          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h3 className="text-2xl font-light text-white tracking-tight">
                Aseflow
              </h3>
              <p className="text-gray-400 font-light mt-2">
                India's First Liquid Protein Shot
              </p>
            </div>
            <p className="text-gray-400 mb-6 max-w-md leading-relaxed font-light">
              Revolutionary protein supplements designed for the modern athlete.
              Precision-engineered, scientifically formulated, and trusted by professionals.
            </p>

            {/* Social Media Links */}
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/aseflowwellness"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://www.linkedin.com/company/aseflow-wellness"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://wa.me/918432706701"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors duration-300"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-medium mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.section)}
                    className="text-gray-400 hover:text-white transition-colors duration-300 font-light text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-medium mb-6 text-white">Contact</h4>
            <div className="space-y-4">
              <a href="mailto:info@aseflow.com" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300">
                <Mail className="w-5 h-5" />
                <p className="font-light">info@aseflow.com</p>
              </a>

              <a href="https://wa.me/918432706701" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300">
                <Phone className="w-5 h-5" />
                <p className="font-light">+91 8432706701</p>
              </a>

              <div className="flex items-center gap-3 text-gray-400">
                <MapPin className="w-5 h-5" />
                <p className="font-light">India</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm font-light">
              © 2026 Aseflow. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors font-light">Privacy Policy</a>
              <a href="/terms-of-service" className="text-gray-400 hover:text-white transition-colors font-light">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;