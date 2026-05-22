import React, { useState } from 'react';
import { ShoppingCart, Phone, Menu, X, MapPin } from 'lucide-react';
import { CartItem } from '../types';
import { Language, TRANSLATIONS } from '../translations';

interface NavbarProps {
  cart: CartItem[];
  setIsCartOpen: (open: boolean) => void;
  scrollToSection: (id: string) => void;
  lang: Language;
  setLang: (lang: Language) => void;
}

export default function Navbar({ cart, setIsCartOpen, scrollToSection, lang, setLang }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cartItemsCount = Math.max(0, cart.reduce((total, item) => total + item.quantity, 0));
  const t = TRANSLATIONS[lang];

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-orange-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer select-none" onClick={() => scrollToSection('hero')}>
            <img 
              src="https://images.unsplash.com/photo-1610832958506-ee56336e3e18?auto=format&fit=crop&q=80&w=200" 
              alt="সিজনাল ফল লোগো" 
              referrerPolicy="no-referrer"
              className="w-14 h-14 object-cover rounded-full shadow-md shadow-orange-100 hover:scale-105 transition-transform duration-300 border border-orange-50 bg-white"
            />
            <div>
              <span className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-emerald-700 via-green-600 to-amber-500 bg-clip-text text-transparent tracking-tight font-display">
                {t.brandName}
              </span>
              <div className="flex items-center space-x-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-[10px] text-green-600 font-medium font-mono uppercase tracking-wider">{lang === 'en' ? 'Always Open' : 'সর্বদা খোলা'}</span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <button 
              onClick={() => scrollToSection('products')} 
              className="text-gray-700 hover:text-red-500 font-bold text-xs lg:text-sm transition-colors cursor-pointer"
            >
              {lang === 'en' ? 'Our Fruits' : 'ফল সমাহার'}
            </button>
            <button 
              onClick={() => scrollToSection('why-us')} 
              className="text-gray-700 hover:text-red-500 font-bold text-xs lg:text-sm transition-colors cursor-pointer"
            >
              {lang === 'en' ? 'Why Choose Us' : 'আমাদের বৈশিষ্ট্য'}
            </button>
            <button 
              onClick={() => scrollToSection('testimonials')} 
              className="text-gray-700 hover:text-red-500 font-bold text-xs lg:text-sm transition-colors cursor-pointer"
            >
              {lang === 'en' ? 'Customer Reviews' : 'গ্রাহক মন্তব্য'}
            </button>
            <button 
              onClick={() => scrollToSection('faq')} 
              className="text-gray-700 hover:text-red-500 font-bold text-xs lg:text-sm transition-colors cursor-pointer"
            >
              {lang === 'en' ? 'FAQ' : 'জিজ্ঞাসা (FAQ)'}
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="text-gray-700 hover:text-red-500 font-bold text-xs lg:text-sm transition-colors cursor-pointer"
            >
              {lang === 'en' ? 'Contact' : 'যোগাযোগ'}
            </button>
          </div>

          {/* Call & Cart & Language buttons */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-5">
            {/* Language Switch */}
            <div className="flex items-center bg-gray-50 border border-gray-200 p-1 rounded-2xl select-none shrink-0">
              <button
                onClick={() => setLang('bn')}
                type="button"
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${lang === 'bn' ? 'bg-white text-emerald-800 shadow-xs' : 'text-gray-400 hover:text-gray-700'}`}
              >
                বাং
              </button>
              <button
                onClick={() => setLang('en')}
                type="button"
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${lang === 'en' ? 'bg-white text-emerald-800 shadow-xs' : 'text-gray-400 hover:text-gray-700'}`}
              >
                EN
              </button>
            </div>

            <a 
              href="tel:+8801786803899" 
              className="hidden lg:flex items-center space-x-1.5 text-gray-750 hover:text-red-650 bg-orange-50 hover:bg-orange-100/80 px-3.5 py-2 rounded-xl transition-all duration-300 group font-mono"
            >
              <div className="bg-red-500 text-white p-1 rounded-md group-hover:scale-110 transition-transform">
                <Phone size={12} className="animate-wiggle" />
              </div>
              <span className="text-[11px] font-bold text-gray-800">
                {lang === 'en' ? '01786-803899' : '০১৭৮৬-৮০৩৮৯৯'}
              </span>
            </a>
            
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-all duration-300 flex items-center justify-center cursor-pointer shadow-xs"
              aria-label="Shopping Cart"
            >
              <ShoppingCart size={20} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm font-mono">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>

          {/* Right Mobile Actions (Cart & Language & Burger) */}
          <div className="flex items-center space-x-2 md:hidden">
            {/* Language Switch for mobile */}
            <div className="flex items-center bg-gray-100 p-0.5 rounded-xl border border-gray-200 select-none">
              <button
                onClick={() => setLang('bn')}
                type="button"
                className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${lang === 'bn' ? 'bg-white text-emerald-900 shadow-xs' : 'text-gray-400'}`}
              >
                বাং
              </button>
              <button
                onClick={() => setLang('en')}
                type="button"
                className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${lang === 'en' ? 'bg-white text-emerald-900 shadow-xs' : 'text-gray-400'}`}
              >
                EN
              </button>
            </div>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 bg-red-50 rounded-xl text-red-600 cursor-pointer"
            >
              <ShoppingCart size={18} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center font-mono">
                  {cartItemsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-xl transition-colors cursor-pointer"
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-orange-50 px-4 py-5 space-y-4 shadow-lg absolute w-full left-0 transition-all duration-300">
          <div className="flex flex-col space-y-4">
            <button
              onClick={() => {
                scrollToSection('products');
                setIsMobileMenuOpen(false);
              }}
              className="text-left text-gray-800 hover:text-red-500 font-semibold py-1.5 border-b border-gray-100"
            >
              {lang === 'en' ? 'Our Fruits' : 'ফল সমাহার'}
            </button>
            <button
              onClick={() => {
                scrollToSection('why-us');
                setIsMobileMenuOpen(false);
              }}
              className="text-left text-gray-800 hover:text-red-500 font-semibold py-1.5 border-b border-gray-100"
            >
              {lang === 'en' ? 'Why Choose Us' : 'আমাদের বৈশিষ্ট্য'}
            </button>
            <button
              onClick={() => {
                scrollToSection('testimonials');
                setIsMobileMenuOpen(false);
              }}
              className="text-left text-gray-800 hover:text-red-500 font-semibold py-1.5 border-b border-gray-100"
            >
              {lang === 'en' ? 'Customer Reviews' : 'গ্রাহক মন্তব্য'}
            </button>
            <button
              onClick={() => {
                scrollToSection('faq');
                setIsMobileMenuOpen(false);
              }}
              className="text-left text-gray-800 hover:text-red-500 font-semibold py-1.5 border-b border-gray-100"
            >
              {lang === 'en' ? 'FAQ' : 'জিজ্ঞাসা (FAQ)'}
            </button>
            <button
              onClick={() => {
                scrollToSection('contact');
                setIsMobileMenuOpen(false);
              }}
              className="text-left text-gray-800 hover:text-red-500 font-semibold py-1.5"
            >
              {lang === 'en' ? 'Contact' : 'যোগাযোগ'}
            </button>
          </div>

          <div className="pt-4 border-t border-orange-100 flex flex-col space-y-3">
            <a 
              href="tel:+8801786803899" 
              className="flex items-center justify-center space-x-2 w-full py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold text-center shadow-md shadow-red-200 transition-colors"
            >
              <Phone size={16} />
              <span>{lang === 'en' ? 'Call: 01786-803899' : 'কল করুন: ০১৭৮৬-৮০৩৮৯৯'}</span>
            </a>
            <div className="flex justify-center text-xs text-center text-gray-500 mt-2 font-medium">
              {t.footerAddress}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
