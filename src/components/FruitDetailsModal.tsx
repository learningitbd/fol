import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Fruit } from '../types';
import { X, ShieldCheck, MapPin, CheckCircle2, ShoppingCart, Plus, Minus } from 'lucide-react';
import { Language, TRANSLATIONS, FRUITS_TRANSLATIONS_EN } from '../translations';

interface FruitDetailsModalProps {
  fruit: Fruit | null;
  onClose: () => void;
  onAddToCartWithQty: (fruit: Fruit, qty: number) => void;
  lang: Language;
}

export default function FruitDetailsModal({ fruit, onClose, onAddToCartWithQty, lang }: FruitDetailsModalProps) {
  const [quantity, setQuantity] = useState(1);

  if (!fruit) return null;

  const t = TRANSLATIONS[lang];
  const fEn = FRUITS_TRANSLATIONS_EN[fruit.id];

  const displayName = lang === 'en' ? (fEn?.name || fruit.englishName) : fruit.name;
  const displayOrigin = lang === 'en' ? (fEn?.origin || 'Bangladesh') : fruit.origin;
  const displayDescription = lang === 'en' ? (fEn?.description || fruit.description) : fruit.description;
  const displayUnit = lang === 'en' ? t.units[fruit.unit] : fruit.unit;
  const displayCategory = lang === 'en' 
    ? (fruit.category === 'গ্রীষ্মকালীন' ? 'Summer' : fruit.category === 'শীতকালীন' ? 'Winter' : 'All Season')
    : fruit.category;
  const displayBenefits = lang === 'en' ? (fEn?.benefits || fruit.benefits) : fruit.benefits;
  const displayVitamins = lang === 'en' ? (fEn?.vitamins || fruit.vitamins) : fruit.vitamins;

  const handleIncrease = () => setQuantity(prev => prev + 1);
  const handleDecrease = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    onAddToCartWithQty(fruit, quantity);
    setQuantity(1);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-55 overflow-y-auto">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-xs"
        />

        {/* Modal Window */}
        <div className="flex min-h-screen items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl border border-orange-50 flex flex-col md:flex-row max-h-[90vh] md:max-h-none overflow-y-auto md:overflow-visible"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 p-2 bg-white/80 hover:bg-white text-gray-700 hover:text-black rounded-full shadow-md transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            {/* Image Section */}
            <div className="w-full md:w-1/2 relative bg-gray-50 h-64 md:h-auto min-h-[300px]">
              <img
                src={fruit.image}
                alt={displayName}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/50 via-transparent to-transparent flex flex-col justify-end p-6">
                <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full w-fit mb-2">
                  {displayCategory}
                </span>
                <h4 className="text-xl sm:text-2xl font-bold text-white font-display leading-tight">{displayName}</h4>
                {lang !== 'en' && <p className="text-xs text-gray-200 font-mono mt-1">{fruit.englishName}</p>}
              </div>
            </div>

            {/* Details Section */}
            <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col max-h-[60vh] md:max-h-[550px] overflow-y-auto font-sans">
              {/* Heading / Tags */}
              <div className="flex flex-wrap gap-2 items-center justify-between mb-4">
                <div className="flex items-center space-x-1 text-xs text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">
                  <MapPin size={12} className="text-red-500" />
                  <span className="font-semibold text-gray-700">{displayOrigin}</span>
                </div>
                {fruit.isOrganic && (
                  <span className="text-[10px] font-bold bg-green-50 text-green-700 border border-green-200 px-2.5 py-1 rounded-full flex items-center space-x-1">
                    <ShieldCheck size={12} />
                    <span>{t.organicLabel}</span>
                  </span>
                )}
              </div>

              {/* Pricing */}
              <div className="flex items-baseline space-x-2 mb-4 bg-orange-50/50 p-3 rounded-2xl">
                <span className="text-2xl sm:text-3xl font-black text-gray-900 font-mono">৳{fruit.price}</span>
                <span className="text-xs sm:text-sm text-gray-500 font-medium">/ {lang === 'en' ? `per ${displayUnit}` : `প্রতি ${displayUnit}`}</span>
                <span className={`ml-auto text-xs font-bold ${fruit.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                  {fruit.stock > 0 
                    ? `${lang === 'en' ? 'Stock: ' : 'মজুদ: '}${fruit.stock} ${displayUnit}` 
                    : (lang === 'en' ? 'Out of Stock' : 'স্টক শেষ')
                  }
                </span>
              </div>

              {/* Description */}
              <div className="space-y-4 flex-1">
                <div>
                  <h5 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                    {lang === 'en' ? 'Fruit Description' : 'ফলের বিবরণ'}
                  </h5>
                  <p className="text-xs sm:text-sm text-gray-650 leading-relaxed font-sans">{displayDescription}</p>
                </div>

                {/* Vitamins */}
                <div>
                  <h5 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                    {t.vitaminLabel}
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {displayVitamins.map((vit, idx) => (
                      <span key={idx} className="text-xs bg-amber-50 text-amber-800 border border-amber-100 px-2.5 py-1 rounded-lg font-medium">
                        ✦ {vit}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Benefits */}
                <div>
                  <h5 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                    {t.benefitsLabel}
                  </h5>
                  <ul className="grid grid-cols-1 gap-1.5">
                    {displayBenefits.map((benefit, idx) => (
                      <li key={idx} className="text-xs text-gray-750 flex items-start space-x-2 leading-relaxed">
                        <CheckCircle2 size={14} className="text-green-500 mt-0.5 shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action purchase tool */}
              {fruit.stock > 0 ? (
                <div className="mt-8 pt-6 border-t border-gray-100 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-600">{t.quantityLabel}</span>
                    
                    <div className="flex items-center space-x-1 bg-gray-50 border border-gray-200 rounded-xl p-1">
                      <button
                        onClick={handleDecrease}
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-600 hover:bg-gray-200 active:scale-95 transition-all cursor-pointer"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-10 text-center font-bold font-mono text-gray-900">{quantity}</span>
                      <button
                        onClick={handleIncrease}
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-600 hover:bg-gray-200 active:scale-95 transition-all cursor-pointer"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-red-500 hover:bg-red-650 text-white font-bold py-4 rounded-xl shadow-lg shadow-red-100 hover:shadow-red-200 transition-all flex items-center justify-center space-x-2 text-sm cursor-pointer"
                  >
                    <ShoppingCart size={18} />
                    <span>{lang === 'en' ? `Add to Basket - ৳${fruit.price * quantity}` : `কিনুন (অর্ডার তালিকায় যোগ) - ৳${fruit.price * quantity}`}</span>
                  </button>
                </div>
              ) : (
                <div className="mt-8 bg-gray-50 text-gray-550 text-center py-4 rounded-xl text-xs sm:text-sm font-semibold border border-dashed border-gray-200">
                  {lang === 'en' 
                    ? '⚠️ Sorry! This fruit is temporarily out of stock. Stay tuned!' 
                    : '⚠️ দুঃখিত! এই ফলটি বর্তমানে স্টকে নেই। নতুন সংগ্রহের জন্য অপেক্ষা করুন।'}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
