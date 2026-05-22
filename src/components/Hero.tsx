import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, ShieldCheck, Truck, Award, ChevronLeft, ChevronRight, Facebook, Phone } from 'lucide-react';
import { Language, TRANSLATIONS } from '../translations';

interface HeroProps {
  scrollToSection: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  lang: Language;
}

const getHeroSlides = (lang: Language) => [
  {
    url: 'https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?auto=format&fit=crop&q=80&w=600',
    alt: lang === 'en' ? 'Seasonal Fruit - Taste of Nature, in Every Season' : 'সিজনাল ফল - প্রকৃতির স্বাদ, প্রতিটি মৌসুমে',
    badge: lang === 'en' ? 'Main Banner' : 'প্রধান ব্যানার',
    title: lang === 'en' ? 'Taste of Nature, in Every Season' : 'প্রকৃতির স্বাদ, প্রতিটি মৌসুমে',
    description: lang === 'en' ? '100% formalin & chemical free tree-ripened fruit guarantee.' : '১০০% ফরমালিন ও কেমিক্যাল মুক্ত বাগান পাকা ফলের নিশ্চয়তা।'
  },
  {
    url: 'https://images.unsplash.com/photo-1501746877-14782df589a0?auto=format&fit=crop&q=80&w=600',
    alt: lang === 'en' ? 'Authentic chemical-free Ishwardi litchis' : 'ঈশ্বরদীর ঐতিহ্যবাহী লিচু বিক্রি করছি',
    badge: lang === 'en' ? 'Litchi Special Offer' : 'লিচু স্পেশাল অফার',
    title: lang === 'en' ? 'Fresh, Juicy & Sweet Litchi from Ishwardi' : 'তাজা, রসালো ও মিষ্টি ঈশ্বরদীর লিচু',
    description: lang === 'en' ? 'Handpicked sweet chemical-free litchis straight from orchards.' : 'সরাসরি বাগান থেকে বাছাইকৃত ও কেমিক্যালমুক্ত মিষ্টি লিচু।'
  }
];

export default function Hero({ scrollToSection, searchQuery, setSearchQuery, lang }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroSlides = getHeroSlides(lang);
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-orange-50 via-white to-orange-50/20 pt-12 pb-20 lg:pt-20 lg:pb-32">
      {/* Decorative Floating Blobs */}
      <div className="absolute top-1/4 -left-36 w-72 h-72 bg-gradient-to-tr from-amber-300 to-red-300 rounded-full blur-3xl opacity-30 animate-pulse pointer-events-none"></div>
      <div className="absolute top-2/3 -right-36 w-96 h-96 bg-gradient-to-tr from-orange-300 to-yellow-200 rounded-full blur-3xl opacity-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Text */}
          <div className="lg:col-span-7 flex flex-col space-y-8 text-center lg:text-left">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center justify-center lg:justify-start space-x-2 bg-red-50 border border-red-100 text-red-650 px-4 py-2 rounded-full w-fit mx-auto lg:mx-0 shadow-xs"
            >
              <Sparkles size={16} className="text-red-500 animate-spin" />
              <span className="text-xs sm:text-xs font-semibold tracking-wide">
                {lang === 'en' ? '100% Formalin-Free & Tree Ripened Orchard Guarantee' : '১০০% তাজা ও কেমিক্যালমুক্ত গাছ পাকা ফলের নিশ্চয়তা'}
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 font-display leading-[1.15]">
                {lang === 'en' ? (
                  <>
                    Orchard Fresh, <br />
                    <span className="relative inline-block mt-2">
                      <span className="relative z-10 bg-gradient-to-r from-emerald-700 to-amber-500 bg-clip-text text-transparent">
                        Seasonal Organic Fruits
                      </span>
                      <span className="absolute left-0 right-0 bottom-1 sm:bottom-2 h-3 bg-emerald-50 rounded-full -z-10"></span>
                    </span>
                  </>
                ) : (
                  <>
                    তাজা, রসালো ও <br />
                    <span className="relative inline-block mt-2">
                      <span className="relative z-10 bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                        প্রাকৃতিক সিজনাল ফল
                      </span>
                      <span className="absolute left-0 right-0 bottom-1 sm:bottom-2 h-3 bg-red-100/50 rounded-full -z-10"></span>
                    </span>
                  </>
                )}
              </h1>
              <p className="text-base sm:text-lg text-gray-650 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-sans">
                {lang === 'en' ? (
                  <>
                    ❤️ Sourced with love from organic farms directly to your doorstep ❤️ <br /> Sourced locally across Pabna, Ishwardi & Rajshahi for elite natural flavor.
                  </>
                ) : (
                  <>
                    ❤️ তাজা, রসালো ও প্রাকৃতিক সিজনাল ফল ❤️ <br /> সরাসরি অনন্য ঈশ্বরদী, রাজশাহী ও পাবনা অঞ্চলের নিজস্ব বাগান থেকে সংগৃহীত।
                  </>
                )}
              </p>
            </motion.div>

            {/* Quick Search and Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <div className="relative w-full sm:w-80 shadow-xs rounded-2xl">
                <input
                  type="text"
                  placeholder={t.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-5 py-4 rounded-2xl bg-white border border-orange-100 text-gray-800 placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-red-500 transition-all shadow-xs pr-12 focus:border-red-500"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-2xl">🔍</span>
              </div>

              <button
                onClick={() => scrollToSection('products')}
                className="w-full sm:w-auto px-8 py-4 bg-red-500 hover:bg-red-650 text-white font-bold rounded-2xl flex items-center justify-center space-x-2 shadow-lg shadow-red-100 hover:shadow-xl hover:shadow-red-200 transition-all transform hover:-translate-y-0.5 cursor-pointer text-sm"
              >
                <span>{lang === 'en' ? 'Shop Fruits Now' : 'ফলের সমাহার দেখুন'}</span>
                <ArrowRight size={18} />
              </button>
            </motion.div>

            {/* Business value badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-3 gap-4 pt-4 text-center border-t border-orange-100 max-w-xl mx-auto lg:mx-0"
            >
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center text-red-500 mb-2">
                  <ShieldCheck size={22} />
                </div>
                <span className="text-xs sm:text-xs font-bold text-gray-805">{t.featureOrganicTitle}</span>
                <span className="text-[10px] text-gray-500">{lang === 'en' ? '100% pure' : 'ফরমালিন মুক্ত'}</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center text-orange-500 mb-2">
                  <Truck size={22} />
                </div>
                <span className="text-xs sm:text-xs font-bold text-gray-850">{lang === 'en' ? 'Super Fast Delivery' : 'দ্রুত ডেলিভারি'}</span>
                <span className="text-[10px] text-gray-500">{lang === 'en' ? '3-Hour Home Drop' : 'পাবনায় ২-৪ ঘন্টায়'}</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center text-amber-500 mb-2">
                  <Award size={22} />
                </div>
                <span className="text-xs sm:text-xs font-bold text-gray-850">{lang === 'en' ? 'Honest Pricing' : 'বাগান মূল্য'}</span>
                <span className="text-[10px] text-gray-500">{lang === 'en' ? 'Direct Orchard' : 'দালাল মুক্ত সেরা দাম'}</span>
              </div>
            </motion.div>
          </div>

          {/* Hero Banner Image Layer */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full max-w-md sm:max-w-lg aspect-[1.78] h-[280px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 flex items-center justify-center"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentSlide}
                  src={heroSlides[currentSlide].url}
                  alt={heroSlides[currentSlide].alt}
                  referrerPolicy="no-referrer"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full object-cover select-none"
                />
              </AnimatePresence>

              {/* Slider Controls */}
              <button
                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-gray-800 flex items-center justify-center shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer z-20"
                aria-label="Previous Slide"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-gray-800 flex items-center justify-center shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer z-20"
                aria-label="Next Slide"
              >
                <ChevronRight size={18} />
              </button>

              {/* Dynamic Overlay Info badge */}
              <div className="absolute top-3 left-3 bg-red-655/95 text-white text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full shadow-xs z-10 backdrop-blur-xs">
                {heroSlides[currentSlide].badge}
              </div>
            </motion.div>

            {/* Slide Indicators */}
            <div className="flex space-x-2.5 mt-4">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    currentSlide === index ? 'bg-red-500 w-6' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Social / Contact Quick Badges below the image */}
            <div className="flex flex-wrap gap-2.5 justify-center mt-5">
              <a
                href="https://facebook.com/seasonalfool"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 hover:border-blue-300 px-3.5 py-1.5 rounded-full text-[11px] font-semibold transition-all shadow-xs border border-blue-100 hover:scale-105"
              >
                <Facebook size={13} className="fill-blue-600 text-transparent" />
                <span>facebook.com/seasonalfool</span>
              </a>
              <a
                href="tel:+8801786803899"
                className="flex items-center space-x-1.5 bg-emerald-50 text-emerald-750 hover:bg-emerald-100 hover:border-emerald-300 px-3.5 py-1.5 rounded-full text-[11px] font-semibold transition-all shadow-xs border border-emerald-100 hover:scale-105 font-mono"
              >
                <Phone size={13} />
                <span>{lang === 'en' ? '01786-803899' : '০১৭৮৬-৮০৩৮৯৯'}</span>
              </a>
            </div>

            {/* Accent Circle Badge */}
            <div 
              className="absolute -bottom-6 -left-6 bg-amber-400 text-slate-900 w-[72px] h-[72px] rounded-full flex flex-col items-center justify-center text-center font-bold shadow-lg transform -rotate-12 animate-bounce cursor-pointer z-10 font-sans" 
              onClick={() => scrollToSection('products')}
            >
              <span className="text-[10px] uppercase font-mono tracking-wide">100%</span>
              <span className="text-xs font-black leading-none">{lang === 'en' ? 'Pure' : 'খাঁটি'}</span>
              <span className="text-[8px] text-slate-800 mt-0.5">{lang === 'en' ? 'Sure' : 'গ্যারান্টি'}</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
