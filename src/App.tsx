import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem, Fruit } from './types';
import { FRUITS_DATA } from './data';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhyUs from './components/WhyUs';
import FruitCard from './components/FruitCard';
import FruitDetailsModal from './components/FruitDetailsModal';
import Cart from './components/Cart';
import CheckoutModal from './components/CheckoutModal';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import { Sparkles, ShoppingBag, ArrowUp, CheckCircle, Search, HelpCircle } from 'lucide-react';
import { Language, TRANSLATIONS, FRUITS_TRANSLATIONS_EN } from './translations';
import AdminDashboard from './components/AdminDashboard';
import { fetchAllFruits } from './lib/firebase';

export default function App() {
  // States
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('seasonal_fruit_lang');
    return (saved === 'en' || saved === 'bn') ? saved : 'bn';
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('seasonal_fruit_cart');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedFruit, setSelectedFruit] = useState<Fruit | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'সব ফল' | 'গ্রীষ্মকালীন' | 'শীতকালীন' | 'বারোমাসি'>('সব ফল');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Dynamic system routing
  const [currentPage, setCurrentPage] = useState<'shop' | 'admin'>(() => {
    const path = window.location.pathname;
    const hash = window.location.hash;
    const isLoginPath = path.endsWith('/login') || path.endsWith('/admin') || hash === '#login' || hash === '#admin';
    return isLoginPath ? 'admin' : 'shop';
  });

  // Dynamic Fruits Inventory state loaded from Firestore
  const [fruits, setFruits] = useState<Fruit[]>(FRUITS_DATA);

  const loadFruits = async () => {
    try {
      const live = await fetchAllFruits();
      setFruits(live);
    } catch (e) {
      console.warn('Firestore fetch failed. Sourcing from static data.', e);
    }
  };

  useEffect(() => {
    loadFruits();
  }, []);

  // Listen to popstate and hashchange for clean administrative URL switching
  useEffect(() => {
    const handleUrlPath = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path.endsWith('/login') || path.endsWith('/admin') || hash === '#login' || hash === '#admin') {
        setCurrentPage('admin');
      } else {
        setCurrentPage('shop');
      }
    };
    window.addEventListener('popstate', handleUrlPath);
    window.addEventListener('hashchange', handleUrlPath);
    handleUrlPath();
    return () => {
      window.removeEventListener('popstate', handleUrlPath);
      window.removeEventListener('hashchange', handleUrlPath);
    };
  }, []);

  // Sync language to local storage
  useEffect(() => {
    localStorage.setItem('seasonal_fruit_lang', lang);
  }, [lang]);

  // Sync cart to local storage
  useEffect(() => {
    localStorage.setItem('seasonal_fruit_cart', JSON.stringify(cart));
  }, [cart]);

  // Back to Top trigger
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Utility to scroll smoothly to sections
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Toast trigger helper
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // Add to cart main
  const handleAddToCart = (fruit: Fruit) => {
    const fruitName = lang === 'en' ? (FRUITS_TRANSLATIONS_EN[fruit.id]?.name || fruit.englishName) : fruit.name;
    const unitText = lang === 'en' ? TRANSLATIONS[lang].units[fruit.unit] : fruit.unit;
    setCart(prev => {
      const match = prev.find(item => item.fruit.id === fruit.id);
      if (match) {
        showToast(lang === 'en' ? `Increased "${fruitName}" quantity by 1 ${unitText}!` : `"${fruitName}" অর্ডার ঝুড়িতে ১ ${unitText} বৃদ্ধি করা হয়েছে!`);
        return prev.map(item =>
          item.fruit.id === fruit.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      showToast(lang === 'en' ? `"${fruitName}" added to cart!` : `"${fruitName}" অর্ডার তালিকায় যোগ করা হয়েছে!`);
      return [...prev, { fruit, quantity: 1 }];
    });
  };

  // Add to cart with dynamic quantity
  const handleAddToCartWithQty = (fruit: Fruit, qty: number) => {
    const fruitName = lang === 'en' ? (FRUITS_TRANSLATIONS_EN[fruit.id]?.name || fruit.englishName) : fruit.name;
    const unitText = lang === 'en' ? TRANSLATIONS[lang].units[fruit.unit] : fruit.unit;
    setCart(prev => {
      const match = prev.find(item => item.fruit.id === fruit.id);
      if (match) {
        showToast(lang === 'en' ? `Added ${qty} ${unitText} of "${fruitName}" to cart!` : `"${fruitName}" অর্ডার তালিকায় ${qty} ${unitText} যোগ করা হয়েছে!`);
        return prev.map(item =>
          item.fruit.id === fruit.id ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      showToast(lang === 'en' ? `"${fruitName}" added to cart!` : `"${fruitName}" অর্ডার তালিকায় যোগ করা হয়েছে!`);
      return [...prev, { fruit, quantity: qty }];
    });
  };

  // Update item quantity inside cart
  const handleUpdateQty = (fruitId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(fruitId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.fruit.id === fruitId ? { ...item, quantity } : item))
    );
  };

  // Remove completely
  const handleRemoveItem = (fruitId: string) => {
    const itemToRemove = cart.find(item => item.fruit.id === fruitId);
    if (itemToRemove) {
      const fruitName = lang === 'en' ? (FRUITS_TRANSLATIONS_EN[itemToRemove.fruit.id]?.name || itemToRemove.fruit.englishName) : itemToRemove.fruit.name;
      showToast(lang === 'en' ? `"${fruitName}" removed from cart.` : `"${fruitName}" অর্ডার তালিকা থেকে বাদ দেওয়া হয়েছে।`);
    }
    setCart(prev => prev.filter(item => item.fruit.id !== fruitId));
  };

  // Clear cart
  const handleClearCart = () => {
    setCart([]);
  };

  // Trigger Checkout view sliding
  const handleCheckoutTrigger = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // Filtering computational logic
  const filteredFruits = fruits.filter(fruit => {
    const matchesCategory = activeCategory === 'সব ফল' || fruit.category === activeCategory;
    
    const searchLower = searchQuery.toLowerCase().trim();
    const matchesSearch = !searchLower || 
      fruit.name.toLowerCase().includes(searchLower) ||
      fruit.englishName.toLowerCase().includes(searchLower) ||
      fruit.origin.toLowerCase().includes(searchLower) ||
      fruit.vitamins.some(vit => vit.toLowerCase().includes(searchLower)) ||
      fruit.description.toLowerCase().includes(searchLower);

    return matchesCategory && matchesSearch;
  });

  if (currentPage === 'admin') {
    return (
      <AdminDashboard 
        lang={lang} 
        onLogout={() => {
          const homePath = window.location.pathname.replace(/(?:login|admin)\/?$/, '');
          window.history.pushState({}, '', homePath || './');
          window.location.hash = '';
          setCurrentPage('shop');
        }}
        onRefreshFruits={loadFruits}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col relative antialiased selection:bg-red-500 selection:text-white">
      
      {/* Dynamic Pop-up Toast Notifications */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            className="fixed top-24 left-1/2 transform -translate-x-1/2 z-55 w-full max-w-sm px-4"
          >
            <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-2xl px-5 py-3.5 shadow-xl flex items-center space-x-3 border border-red-500/10">
              <span className="text-xl">🍓</span>
              <span className="text-xs sm:text-sm font-bold font-sans flex-1 leading-snug">{toastMessage}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Persistent Components */}
      <Navbar
        cart={cart}
        setIsCartOpen={setIsCartOpen}
        scrollToSection={scrollToSection}
        lang={lang}
        setLang={setLang}
      />

      <Hero
        scrollToSection={scrollToSection}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        lang={lang}
      />

      <WhyUs lang={lang} />

      {/* Main E-commerce Shop Shelf */}
      <main id="products" className="py-20 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Heading */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
            <div>
              <div className="inline-flex items-center space-x-1.5 bg-red-50 text-red-655 px-3 py-1 rounded-full text-xs font-bold font-sans mb-3">
                <ShoppingBag size={13} />
                <span>{TRANSLATIONS[lang].shopBadge}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight font-display text-emerald-800">
                {TRANSLATIONS[lang].shopTitle}
              </h2>
              <p className="text-sm text-gray-500 font-sans mt-2 max-w-xl">
                {TRANSLATIONS[lang].shopSubtitle}
              </p>
            </div>

            {/* Category selection Tabs bar */}
            <div className="flex flex-wrap gap-2">
              {(['সব ফল', 'গ্রীষ্মকালীন', 'শীতকালীন', 'বারোমাসি'] as const).map(cat => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                  }}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold font-sans border transition-all cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-red-500 text-white border-red-500 shadow-md shadow-red-100'
                      : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {cat === 'সব ফল' ? TRANSLATIONS[lang].allFruits
                   : cat === 'গ্রীষ্মকালীন' ? TRANSLATIONS[lang].summerFruits
                   : cat === 'শীতকালীন' ? TRANSLATIONS[lang].winterFruits
                   : TRANSLATIONS[lang].allSeason}
                </button>
              ))}
            </div>
          </div>

          {/* Search brief status if filtering */}
          {searchQuery && (
            <div className="mb-6 p-4 bg-orange-50/40 border border-orange-100 text-xs sm:text-sm text-gray-700 rounded-2xl flex items-center justify-between font-sans">
              <span>🔎 <strong>"{searchQuery}"</strong> {TRANSLATIONS[lang].searchStatus}</span>
              <button 
                onClick={() => setSearchQuery('')}
                className="text-xs text-red-500 hover:underline font-bold cursor-pointer"
              >
                {TRANSLATIONS[lang].searchReset}
              </button>
            </div>
          )}

          {/* Core dynamic Fruits Grid */}
          {filteredFruits.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 border border-dashed border-gray-200 rounded-3xl space-y-4">
              <span className="text-6xl text-gray-400 block">🍂</span>
              <h4 className="text-lg font-bold text-gray-800">{TRANSLATIONS[lang].noFruitsFound}</h4>
              <p className="text-xs text-gray-400 max-w-xs mx-auto font-sans">
                {TRANSLATIONS[lang].noFruitsDesc}
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('সব ফল');
                }}
                className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold text-xs cursor-pointer shadow-md transition-all font-sans"
              >
                {TRANSLATIONS[lang].viewAllFruits}
              </button>
            </div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              <AnimatePresence mode="popLayout">
                {filteredFruits.map(fruit => (
                  <div key={fruit.id}>
                    <FruitCard
                      fruit={fruit}
                      onAddToCart={handleAddToCart}
                      onSelectFruit={setSelectedFruit}
                      lang={lang}
                    />
                  </div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

        </div>
      </main>

      <Testimonials lang={lang} />

      <FAQ lang={lang} />

      <Footer scrollToSection={scrollToSection} lang={lang} />

      {/* Modals & Slideouts Layer */}
      <FruitDetailsModal
        fruit={selectedFruit}
        onClose={() => setSelectedFruit(null)}
        onAddToCartWithQty={handleAddToCartWithQty}
        lang={lang}
      />

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onCheckOut={handleCheckoutTrigger}
        lang={lang}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        onClearCart={handleClearCart}
        lang={lang}
      />

      {/* Floating Back to top and Shop Cart quick summary bar */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3"
          >
            {/* Quick checkout summary indicator */}
            {cart.length > 0 && !isCartOpen && (
              <button
                onClick={() => setIsCartOpen(true)}
                className="p-4 bg-gradient-to-r from-red-650 to-orange-500 text-white rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center space-x-2 relative cursor-pointer group"
                title={lang === 'en' ? 'View Cart' : 'অর্ডার দেখুন'}
              >
                <ShoppingBag size={20} className="animate-wiggle" />
                <span className="text-xs font-bold pr-1 font-sans hidden sm:inline">
                  {lang === 'en' ? 'View Basket' : 'অর্ডার স্লিপ দেখুন'}
                </span>
                <span className="absolute -top-1.5 -right-1.5 bg-gray-900 border-2 border-white text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </span>
              </button>
            )}

            {/* UP Trigger button */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="p-3.5 bg-white border border-orange-100 text-gray-800 hover:text-red-500 hover:border-red-500 rounded-full shadow-lg hover:shadow-xl active:scale-90 transition-all flex items-center justify-center cursor-pointer"
              title={lang === 'en' ? 'Scroll Top' : 'উপরে যান'}
            >
              <ArrowUp size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
