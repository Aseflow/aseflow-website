import React, { useState, useRef, useEffect } from 'react';
import { ShoppingCart, User, Mail, Phone, MapPin, CheckCircle } from 'lucide-react';
import { submitPreOrder } from '../services/api.ts';
import { trackEvent } from '../utils/analytics';

const OrderForm = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    productType: 'marine',
    quantity: 1
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isSubmitted && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isSubmitted]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!/^\+?[\d\s\-\(\)]{10,15}$/.test(formData.phone)) newErrors.phone = 'Phone must be valid';
    if (!formData.address.trim()) newErrors.address = 'Address is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      await submitPreOrder({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        productType: formData.productType,
        quantity: formData.quantity
      });
      
      trackEvent('preorder_submit', {
        event_category: 'conversion',
        product_type: formData.productType,
        quantity: formData.quantity,
        value: formData.quantity * 2999
      });
      
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        productType: 'marine',
        quantity: 1
      });
      
      setTimeout(() => {
        setIsSubmitted(false);
        setIsSubmitting(false);
      }, 5000);
    } catch (error) {
      console.error('Pre-order submission error:', error);
      setErrors({ submit: error instanceof Error ? error.message : 'Failed to submit pre-order. Please try again.' });
      setIsSubmitting(false);
    }
  };

  const getUnitPrice = () => formData.productType === 'trial' ? 799 : 2999;
  const totalPrice = formData.quantity * getUnitPrice();

  return (
    <section id="order" className="py-32 bg-gray-50" ref={sectionRef}>
      
      {/* Success Message Overlay */}
      {isSubmitted && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full relative">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-6">
                <CheckCircle className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-2xl font-medium text-black mb-4">Order Confirmed</h3>
              <p className="text-gray-600 text-lg mb-4 font-light">
                Thank you for your pre-order. We'll contact you with delivery details.
              </p>
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <p className="text-black font-medium">
                  Check your email for confirmation.
                </p>
              </div>
              <button
                onClick={() => setIsSubmitted(false)}
                className="bg-black text-white font-medium py-3 px-6 rounded-full"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-light mb-6 tracking-tight text-black">
            Pre-Order
            <br />
            <span className="font-normal">Aseflow</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light mb-8">
            Be among the first to experience the future of protein supplementation.
          </p>
          <div className="inline-flex items-center bg-white rounded-full px-6 py-3 border border-gray-200">
            <div className="w-2 h-2 bg-black rounded-full mr-3"></div>
            <span className="text-sm font-medium text-gray-700">Limited Early Access • 40% Off Launch Price</span>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl p-8 md:p-12 border border-gray-200">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center text-black font-medium mb-3">
                    <User className="w-5 h-5 mr-2 text-gray-400" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                    placeholder="Enter your full name"
                    disabled={isSubmitting}
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="flex items-center text-black font-medium mb-3">
                    <Mail className="w-5 h-5 mr-2 text-gray-400" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                    placeholder="Enter your email"
                    disabled={isSubmitting}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="flex items-center text-black font-medium mb-3">
                    <Phone className="w-5 h-5 mr-2 text-gray-400" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                    placeholder="Enter your phone number"
                    disabled={isSubmitting}
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="flex items-center text-black font-medium mb-3">
                    <ShoppingCart className="w-5 h-5 mr-2 text-gray-400" />
                    Product Type
                  </label>
                  <select
                    name="productType"
                    value={formData.productType}
                    onChange={handleInputChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                    disabled={isSubmitting}
                  >
                    <option value="trial">⚡ Trial Pack — 6 Shots (₹799)</option>
                    <option value="marine">Marine Protein — 30 Shots (₹2,999)</option>
                    <option value="vegan">Vegan Protein — 30 Shots (₹2,999)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="flex items-center text-black font-medium mb-3">
                  <MapPin className="w-5 h-5 mr-2 text-gray-400" />
                  Delivery Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-black resize-none focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                  placeholder="Enter your complete address"
                  disabled={isSubmitting}
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
              </div>

              <div className="grid md:grid-cols-2 gap-6 items-end">
                <div>
                  <label className="text-black font-medium mb-3 block">Quantity</label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 1;
                      setFormData((prev) => ({
                        ...prev,
                        quantity: Math.max(1, Math.min(50, val))
                      }));
                    }}
                    min="1"
                    max="50"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="text-right">
                  <div className="text-gray-500 font-light mb-1">Total Amount</div>
                  <div className="text-lg text-gray-400 font-light line-through">₹{formData.productType === 'trial' ? formData.quantity * 1499 : formData.quantity * 4999}</div>
                  <div className="text-3xl font-light text-black">
                    ₹{totalPrice}
                    <span className="text-sm text-gray-500 font-light ml-2">({formData.productType === 'trial' ? '47% off' : '40% off'})</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                <p className="text-black font-light text-sm">
                  <strong>Note:</strong> This is a pre-order. Payment will be collected upon delivery. 
                  We'll contact you to confirm your order and provide delivery timeline.
                </p>
              </div>

              {errors.submit && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <p className="text-red-700 font-light text-sm">{errors.submit}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black text-white font-medium py-4 px-8 rounded-full transition-all duration-300 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Processing...' : 'Place Pre-Order'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderForm;
