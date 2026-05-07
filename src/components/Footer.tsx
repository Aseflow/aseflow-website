import React from 'react';
import { Mail, Phone, MapPin, Instagram } from 'lucide-react';

const Footer = () => {
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
                
              </p>
            </div>
            <p className="text-gray-400 mb-6 max-w-md leading-relaxed font-light text-sm">
              Revolutionary protein supplements designed for the modern athlete. 
              Precision-engineered, scientifically formulated, and trusted by professionals.
            </p>
            {/* Instagram */}
            <a
              href="https://www.instagram.com/aseflowwellness"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300 group"
            >
              <div className="w-9 h-9 rounded-full border border-gray-700 flex items-center justify-center group-hover:border-white transition-colors duration-300">
                <Instagram className="w-4 h-4" />
              </div>
              <span className="text-sm font-light">@aseflowwellness</span>
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-medium mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              {['About', 'Benefits', 'Science', 'Use Cases', 'Order'].map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 font-light text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-medium mb-6 text-white">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-400">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <p className="font-light text-sm">info@aseflow.com</p>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <p className="font-light text-sm">+91 8432706701</p>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <p className="font-light text-sm">India</p>
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
              <a href="#" className="text-gray-400 hover:text-white transition-colors font-light">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors font-light">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
