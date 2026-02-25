/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-gold': '#D4AF37',
        'brand-dark': '#2C2C2E',
        'brand-white': '#FFFFFF',
        'apple-gray': '#86868b',
        'apple-light-gray': '#f5f5f7',
        'apple-dark-gray': '#1d1d1f',
        'apple-text-gray': '#6e6e73',
        'premium-dark': '#F8F9FA',
        'premium-charcoal': '#E9ECEF',
        'premium-slate': '#DEE2E6',
        'premium-silver': '#6C757D',
        'premium-platinum': '#F5F5F7',
        'premium-gold': '#D4AF37',
        'premium-bronze': '#CD7F32',
        'premium-light': '#FFFFFF',
        'premium-gray': '#8E8E93',
        'premium-soft': '#F2F2F7',
      },
      fontFamily: {
        'heading': ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        'body': ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Text', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'slideInLeft': 'slideInLeft 1s ease-out',
        'slideInRight': 'slideInRight 1s ease-out',
        'slideInUp': 'slideInUp 0.8s ease-out',
        'fadeInUp': 'fadeInUp 1s ease-out',
        'typewriter': 'typewriter 4s steps(20) infinite',
        'spin-slow': 'spin 3s linear infinite',
        'zoomIn': 'zoomIn 0.8s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInUp: {
          '0%': { transform: 'translateY(50px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeInUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        typewriter: {
          '0%, 50%': { width: '0' },
          '100%': { width: '100%' },
        },
        zoomIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};