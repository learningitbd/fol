import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem, Fruit } from '../types';
import { X, Trash2, ShoppingBag, Plus, Minus, ArrowRight } from 'lucide-react';
import { Language, TRANSLATIONS, FRUITS_TRANSLATIONS_EN } from '../translations';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQty: (fruitId: string, quantity: number) => void;
  onRemoveItem: (fruitId: string) => void;
  onCheckOut: () => void;
  lang: Language;
}

export default function Cart({ isOpen, onClose, cart, onUpdateQty, onRemoveItem, onCheckOut, lang }: CartProps) {
  const subtotal = cart.reduce((sum, item) => sum + item.fruit.price * item.quantity, 0);
  const cartItemsCount = Math.max(0, cart.reduce((total, item) => total + item.quantity, 0));
  const t = TRANSLATIONS[lang];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-55 overflow-hidden">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-xs"
          />

          {/* Drawer content */}
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full font-sans"
            >
              {/* Header */}
              <div className="p-6 border-b border-orange-50 flex items-center justify-between bg-orange-50/20">
                <div className="flex items-center space-x-2.5">
                  <div className="bg-red-500 text-white p-2 rounded-xl">
                    <ShoppingBag size={20} />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 font-display">{t.cartTitle}</h3>
                    <p className="text-xs text-gray-500 font-medium">
                      {lang === 'en' 
                        ? `${cartItemsCount} ${cartItemsCount === 1 ? 'item' : 'items'} in basket` 
                        : `${cartItemsCount} টি আইটেম যোগ করা হয়েছে`
                      }
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-500 hover:text-black rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                    <div className="text-6xl animate-bounce">🧺</div>
                    <h4 className="text-base font-bold text-gray-800">{t.cartTitle}</h4>
                    <p className="text-xs text-gray-500 max-w-[250px] mx-auto leading-relaxed">
                      {t.cartEmpty}
                    </p>
                    <button
                      onClick={onClose}
                      className="px-6 py-2.5 bg-red-100 hover:bg-red-200 text-red-650 rounded-xl font-bold text-xs transition-colors cursor-pointer"
                    >
                      {t.continueShopping}
                    </button>
                  </div>
                ) : (
                  cart.map((item) => {
                    const fEn = FRUITS_TRANSLATIONS_EN[item.fruit.id];
                    const displayName = lang === 'en' ? (fEn?.name || item.fruit.englishName) : item.fruit.name;
                    const displayUnit = lang === 'en' ? t.units[item.fruit.unit] : item.fruit.unit;

                    return (
                      <motion.div
                        layout
                        key={item.fruit.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="flex items-center space-x-3.5 pb-4 border-b border-gray-100 last:border-b-0 group"
                      >
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-50 shrink-0 border border-gray-100">
                          <img
                            src={item.fruit.image}
                            alt={displayName}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs sm:text-sm font-bold text-gray-900 truncate font-display">
                            {displayName}
                          </h4>
                          <p className="text-[11px] text-gray-500 mt-0.5">
                            ৳{item.fruit.price} / {displayUnit}
                          </p>
                          
                          <div className="flex items-center space-x-2 mt-2">
                            {/* Quantity control */}
                            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-0.5">
                              <button
                                onClick={() => onUpdateQty(item.fruit.id, item.quantity - 1)}
                                className="w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-gray-200 rounded-md transition-colors cursor-pointer"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="w-6 text-center text-xs font-bold font-mono text-gray-800">{item.quantity}</span>
                              <button
                                onClick={() => onUpdateQty(item.fruit.id, item.quantity + 1)}
                                className="w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-gray-200 rounded-md transition-colors cursor-pointer"
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="text-right flex flex-col justify-between items-end h-16">
                          <button
                            onClick={() => onRemoveItem(item.fruit.id)}
                            className="p-1 px-2 text-gray-400 hover:text-red-500 rounded-md hover:bg-red-50 transition-all cursor-pointer animate-fade"
                            title={lang === 'en' ? 'Remove' : 'সরিয়ে ফেলুন'}
                          >
                            <Trash2 size={14} />
                          </button>
                          <span className="text-xs sm:text-sm font-bold text-gray-800 font-mono">
                            ৳{item.fruit.price * item.quantity}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </div>

              {/* Drawer Footer and Checkout Trigger */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-orange-50 bg-orange-50/10 space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs sm:text-xs text-gray-500">
                      <span>{t.subtotalLabel}</span>
                      <span className="font-bold font-mono text-gray-800">৳{subtotal}</span>
                    </div>
                    <div className="flex justify-between text-xs sm:text-xs text-gray-500">
                      <span>{t.deliveryFeeLabel}</span>
                      <span className="text-green-600 font-bold">{lang === 'en' ? 'Calculated on step 2' : 'পরবর্তী ধাপে নির্ধারিত'}</span>
                    </div>
                    <div className="border-t border-dashed border-gray-200 pt-2 flex justify-between text-sm sm:text-base font-extrabold text-gray-900">
                      <span>{t.totalLabel}</span>
                      <span className="font-mono text-red-600">৳{subtotal} + {lang === 'en' ? 'Delivery' : 'ডেলিভারি চার্জ'}</span>
                    </div>
                  </div>

                  <div className="bg-orange-50 border border-orange-100 rounded-xl p-3 text-[10px] sm:text-[11px] text-gray-650 text-center font-bold font-sans">
                    {lang === 'en' ? '🚚 Pabna Sadar express delivery in just 2-4 hours!' : '🚚 পাবনা সদরে মাত্র ২-৪ ঘণ্টায় হোম ডেলিভারি!'}
                  </div>

                  <button
                    onClick={onCheckOut}
                    className="w-full bg-red-500 hover:bg-red-650 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-red-100 hover:shadow-red-200 transition-all flex items-center justify-center space-x-1.5 cursor-pointer text-xs sm:text-sm"
                  >
                    <span>{t.orderNowButton}</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
