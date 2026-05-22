import React from 'react';
import { MapPin, Phone, Mail, Clock, Calendar, Heart, Facebook } from 'lucide-react';
import { Language, TRANSLATIONS } from '../translations';

interface FooterProps {
  scrollToSection: (id: string) => void;
  lang: Language;
}

export default function Footer({ scrollToSection, lang }: FooterProps) {
  const t = TRANSLATIONS[lang];
  const mapUrl = "https://www.bing.com/maps/default.aspx?v=2&pc=FACEBK&mid=8100&where1=%E0%A6%AA%E0%A6%BE%E0%A6%AC%E0%A6%A8%E0%A6%BE%20%E0%A6%B8%E0%A6%A6%E0%A6%B0%20%2C%20%E0%A6%AA%E0%A6%BE%E0%A6%AC%E0%A6%A8%E0%A6%BE%2C%20Pabna%2C%20Bangladesh%2C%206600&FORM=FBKPL1&mkt=en-US";

  return (
    <footer id="contact" className="bg-slate-950 text-gray-300 pt-20 pb-8 relative overflow-hidden border-t-4 border-orange-500 font-sans">
      
      {/* Decorative Blur Background bubbles */}
      <div className="absolute bottom-0 left-10 w-64 h-64 bg-red-850 rounded-full blur-3xl opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          {/* Logo Brand Slogan */}
          <div className="md:col-span-4 space-y-6">
            <div className="flex items-center space-x-3 cursor-pointer select-none" onClick={() => scrollToSection('hero')}>
              <img 
                src="https://images.unsplash.com/photo-1610832958506-ee56336e3e18?auto=format&fit=crop&q=80&w=200" 
                alt="সিজনাল ফল লোগো" 
                referrerPolicy="no-referrer"
                className="w-12 h-12 object-cover rounded-full shadow-lg border border-gray-800 bg-white shadow-orange-50/10"
              />
              <span className="text-xl sm:text-2xl font-black bg-gradient-to-r from-emerald-450 via-green-450 to-amber-300 bg-clip-text text-transparent font-display tracking-tight">
                {t.brandName}
              </span>
            </div>

            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              {lang === 'en' 
                ? '❤️ Sourcing 100% formalin-free & tree ripened fruits directly from farmers to Pabna and Ishwardi regions.' 
                : '❤️ তাজা, রসালো ও প্রাকৃতিক সিজনাল ফল ❤️ আপনার সুস্থ জীবনের প্রতিশ্রুতি। আমরা সেরা মানের কার্বাইডমুক্ত সরাসরি গাছ পাকা ফল সরবরাহ করি।'}
            </p>

            <div className="space-y-3 pt-2 text-xs">
              <div className="flex items-center space-x-2.5">
                <div className="text-green-450 bg-green-500/10 p-1.5 rounded-lg">
                  <Clock size={14} />
                </div>
                <span>
                  {lang === 'en' ? 'Status: ' : 'শপ স্ট্যাটাস: ' }
                  <strong className="text-green-400">{lang === 'en' ? 'Always Open' : 'সবসময় খোলা (Always Open)'}</strong>
                </span>
              </div>
              <div className="flex items-center space-x-2.5">
                <div className="text-amber-450 bg-amber-500/10 p-1.5 rounded-lg">
                  <Calendar size={14} />
                </div>
                <span>
                  {lang === 'en' ? 'Days: ' : 'কার্যদিন: ' }
                  <strong className="text-amber-450">{lang === 'en' ? '7 Days a Week' : 'সপ্তাহে ৭ দিন-ই খোলা'}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Useful Quick Action Links */}
          <div className="md:col-span-3 space-y-6">
            <h4 className="text-sm font-extrabold text-white font-display border-l-4 border-red-500 pl-3 uppercase tracking-wider">
              {lang === 'en' ? 'Useful Links' : 'কুইক লিংক সমূহ'}
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm flex flex-col items-start font-medium text-gray-400">
              <li>
                <button onClick={() => scrollToSection('products')} className="hover:text-red-400 transition-colors cursor-pointer text-left">
                  🍒 {lang === 'en' ? 'Fruits Catalog & Menu' : 'ফলের সমাহার ও মূল্য তালিকা'}
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('why-us')} className="hover:text-red-400 transition-colors cursor-pointer text-left">
                  🌟 {lang === 'en' ? 'Our Feature Guarantee' : 'আমাদের বিশেষত্ব ও নিশ্চয়তা'}
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('testimonials')} className="hover:text-red-400 transition-colors cursor-pointer text-left">
                  💬 {lang === 'en' ? 'Testimonials / Reviews' : 'গ্রাহকদের মন্তব্য সমূহ'}
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('faq')} className="hover:text-red-400 transition-colors cursor-pointer text-left">
                  ❓ {lang === 'en' ? 'FAQ Help' : 'সচরাচর জিজ্ঞাসিত প্রশ্ন'}
                </button>
              </li>
              <li>
                <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="hover:text-red-400 transition-colors text-left flex items-center space-x-1">
                  <span>📍 {lang === 'en' ? 'Visual Map Directory' : 'গুগল/বিং ম্যাপ লোকেশন'}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Location Map Placeholder & Contact Card */}
          <div className="md:col-span-5 space-y-6">
            <h4 className="text-sm font-extrabold text-white font-display border-l-4 border-red-500 pl-3 uppercase tracking-wider">
              {lang === 'en' ? 'Contact Details' : 'যোগাযোগ ও ঠিকানা'}
            </h4>
            
            <div className="space-y-4 text-xs sm:text-sm">
              <a 
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start space-x-3 text-gray-400 hover:text-white transition-all p-3 border border-gray-800 rounded-2xl bg-gray-950/40 hover:bg-gray-950/80 group"
              >
                <div className="text-red-450 bg-red-500/10 p-2 rounded-xl group-hover:scale-105 transition-transform">
                  <MapPin size={20} />
                </div>
                <div>
                  <h5 className="font-extrabold text-gray-100">{lang === 'en' ? 'Pabna Sadar Hub (Bangladesh)' : 'পাবনা সদর হাব (Pabna Sadar)'}</h5>
                  <p className="text-xs mt-1 leading-relaxed text-gray-400">
                    {t.footerAddress}
                  </p>
                  <span className="inline-block text-[10px] text-red-400 font-bold mt-2 hover:underline">
                    🗺️ {lang === 'en' ? 'Click to navigate via Map GPS' : 'ম্যাপে লোকেশন দেখতে ক্লিক করুন'}
                  </span>
                </div>
              </a>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a 
                  href="tel:+8801786803899" 
                  className="flex items-center space-x-2.5 p-3 border border-gray-800 rounded-xl bg-gray-950/20 hover:bg-gray-950/60 transition-colors"
                >
                  <Phone size={16} className="text-emerald-400 font-bold shrink-0" />
                  <div className="font-mono text-xs overflow-hidden">
                    <span className="block text-gray-500 text-[9px] font-sans font-medium">{lang === 'en' ? 'Call Phone' : 'মোবাইল নাম্বার'}</span>
                    <strong className="text-gray-200 block truncate">{lang === 'en' ? '01786-803899' : '+৮৮০ ১৭৮৬-৮০৩৮৯৯'}</strong>
                  </div>
                </a>

                <a 
                  href="mailto:seasonalfool@gmail.com" 
                  className="flex items-center space-x-2.5 p-3 border border-gray-800 rounded-xl bg-gray-950/20 hover:bg-gray-950/60 transition-colors"
                >
                  <Mail size={16} className="text-blue-400 shrink-0" />
                  <div className="font-mono text-xs overflow-hidden">
                    <span className="block text-gray-500 text-[9px] font-sans font-medium">{lang === 'en' ? 'Official Mail' : 'অফিসিয়াল ইমেইল'}</span>
                    <strong className="text-gray-200 block truncate">seasonalfool@gmail.com</strong>
                  </div>
                </a>

                <a 
                  href="https://facebook.com/seasonalfool" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2.5 p-3 border border-gray-800 rounded-xl bg-gray-950/20 hover:bg-gray-950/60 transition-colors sm:col-span-2"
                >
                  <Facebook size={16} className="text-blue-500 fill-blue-500/10 shrink-0" />
                  <div className="font-mono text-xs overflow-hidden">
                    <span className="block text-gray-500 text-[9px] font-sans font-medium">{lang === 'en' ? 'Official Facebook' : 'ফেসবুক পেজ'}</span>
                    <strong className="text-gray-200 block truncate">facebook.com/seasonalfool</strong>
                  </div>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Closing details and signature credits */}
        <div className="border-t border-gray-800 pt-8 mt-12 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 space-y-4 md:space-y-0">
          <div>
            &copy; {new Date().getFullYear()} <strong className="text-gray-400">{t.brandName}</strong>. {lang === 'en' ? ' All rights reserved. Pabna, Bangladesh.' : ' সর্বস্বত্ব সংরক্ষিত পাবনা, বাংলাদেশ।'}
          </div>
          <div className="flex items-center space-x-1 font-medium">
            <span>{lang === 'en' ? 'Crafted with' : 'স্থাপিত'}</span>
            <Heart size={12} className="text-red-500 animate-pulse fill-red-500 inline" />
            <span>{lang === 'en' ? 'for healthy premium family nutrition.' : 'বাংলাদেশি গ্রাহকদের জন্য সুস্থ ও সতেজ জীবনের প্রতিশ্রুতিতে।'}</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
