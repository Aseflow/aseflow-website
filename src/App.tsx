import React from 'react';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Benefits from './components/Benefits';
import ProductImage from './components/ProductImage';
import Comparison from './components/Comparison';
import Trust from './components/Trust';
import UseCases from './components/UseCases';
import Products from './components/Products';
import OrderForm from './components/OrderForm';
import ReferralShare from './components/ReferralShare';
import Footer from './components/Footer';
import EarlyAccessPopup from './components/EarlyAccessPopup';
import WhatsAppButton from './components/WhatsAppButton';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import { trackPageView } from './utils/analytics';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    trackPageView(window.location.pathname);
  }, []);

  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  if (currentPath === '/privacy-policy') return <PrivacyPolicy />;
  if (currentPath === '/terms-of-service') return <TermsOfService />;

  return (
    <div className="min-h-screen bg-white text-black">
      <Header />
      <Hero />
      <Benefits />
      <ProductImage />
      <Comparison />
      <Trust />
      <UseCases />
      <Products />
      <OrderForm />
      <ReferralShare />
      <Footer />
      <EarlyAccessPopup />
      <WhatsAppButton />
    </div>
  );
}

export default App;