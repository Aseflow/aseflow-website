import React from 'react';
import { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Benefits from './components/Benefits';
import ProductImage from './components/ProductImage';
import Comparison from './components/Comparison';
import Trust from './components/Trust';
import UseCases from './components/UseCases';
import Products from './components/Products';
import OrderForm from './components/OrderForm';
import Footer from './components/Footer';
import EarlyAccessPopup from './components/EarlyAccessPopup';
import { trackPageView } from './utils/analytics';

function App() {
  useEffect(() => {
    // Track initial page view with UTM parameters
    trackPageView(window.location.pathname);
  }, []);

  return (
    <div className="min-h-screen bg-brand-dark text-white">
      <Header />
      <Hero />
      <Benefits />
      <ProductImage />
      <Comparison />
      <Trust />
      <UseCases />
      <Products />
      <OrderForm />
      <Footer />
      <EarlyAccessPopup />
    </div>
  );
}

export default App;
