import React from 'react';
import { motion } from 'motion/react';
import { Fruit } from '../types';
import { Star, ShieldCheck, MapPin, Eye, ShoppingCart } from 'lucide-react';
import { Language, TRANSLATIONS, FRUITS_TRANSLATIONS_EN } from '../translations';

interface FruitCardProps {
  fruit: Fruit;
  onAddToCart: (fruit: Fruit) => void;
  onSelectFruit: (fruit: Fruit) => void;
  lang: Language;
}

export default function FruitCard({ fruit, onAddToCart, onSelectFruit, lang }: FruitCardProps) {
  const t = TRANSLATIONS[lang];
  const fEn = FRUITS_TRANSLATIONS_EN[fruit.id];

  const displayName = lang === 'en' ? (fEn?.name || fruit.englishName) : fruit.name;
  const displayOrigin = lang === 'en' ? (fEn?.origin || 'Bangladesh') : fruit.origin;
  const displayDescription = lang === 'en' ? (fEn?.description || fruit.description) : fruit.description;
  const displayUnit = lang === 'en' ? t.units[fruit.unit] : fruit.unit;
  const displayCategory = lang === 'en' 
    ? (fruit.category === 'গ্রীষ্মকালীন' ? 'Summer' : fruit.category === 'শীতকালীন' ? 'Winter' : 'All Season')
    : fruit.category;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-3xl overflow-hidden border border-orange-100 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col h-full group"
    >
      {/* Fruit Image Layer */}
      <div className="relative aspect-4/3 overflow-hidden bg-gray-100">
        <img
          src={fruit.image}
          alt={displayName}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Floating Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-1.5">
          <span className="text-[10px] font-bold bg-white text-gray-800 px-3 py-1 rounded-full shadow-xs border border-gray-100 flex items-center space-x-1">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
            <span>{displayCategory}</span>
          </span>
          {fruit.isOrganic && (
            <span className="text-[9px] font-extrabold bg-green-600 text-white px-2.5 py-0.5 rounded-full shadow-xs uppercase tracking-wider flex items-center space-x-1">
              <ShieldCheck size={10} />
              <span>{lang === 'en' ? 'Bio Organic' : '১০০% অর্গানিক'}</span>
            </span>
          )}
        </div>

        {fruit.isPopular && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-orange-500 text-white text-[9px] font-extrabold px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
            {lang === 'en' ? '🔥 Bestseller' : '🔥 সেরা পছন্দ'}
          </div>
        )}

        {/* Hover quick look button */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button
            onClick={() => onSelectFruit(fruit)}
            className="p-3 bg-white hover:bg-red-500 hover:text-white text-gray-800 rounded-full shadow-lg transform transition-all duration-300 scale-90 group-hover:scale-100 cursor-pointer"
            title={lang === 'en' ? 'View details' : 'বিস্তারিত দেখুন'}
          >
            <Eye size={22} />
          </button>
        </div>
      </div>

      {/* Fruit Stats & Details */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Rating and Sourced location */}
        <div className="flex items-center justify-between text-[11px] text-gray-500 mb-2">
          <div className="flex items-center space-x-1 text-amber-500">
            <Star size={14} fill="currentColor" />
            <span className="font-bold font-mono">{fruit.rating.toFixed(1)}</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-500">
            <MapPin size={12} className="text-red-400" />
            <span className="font-medium truncate max-w-[124px]">{displayOrigin}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-red-500 transition-colors line-clamp-1 font-display">
          {displayName}
        </h3>
        {lang !== 'en' && <p className="text-[10px] text-gray-400 font-mono mt-0.5">{fruit.englishName}</p>}

        {/* Description brief */}
        <p className="text-xs sm:text-sm text-gray-550 mt-2.5 line-clamp-2 leading-relaxed flex-1 font-sans">
          {displayDescription}
        </p>

        {/* Price & Cart Actions */}
        <div className="mt-5 pt-4 border-t border-orange-50/80 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-gray-400 block font-medium">
              {lang === 'en' ? `Per ${displayUnit}` : `প্রতি ${displayUnit}`}
            </span>
            <span className="text-xl font-black text-gray-900 font-mono">
              ৳{fruit.price}
            </span>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => onSelectFruit(fruit)}
              className="p-2.5 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-xl transition-all cursor-pointer border border-gray-100"
              title={lang === 'en' ? 'Explore' : 'বিস্তারিত'}
            >
              <Eye size={16} />
            </button>
            <button
              onClick={() => onAddToCart(fruit)}
              className="bg-red-500 hover:bg-red-650 text-white font-bold px-3.5 py-2.5 rounded-xl transition-all flex items-center space-x-1 shadow-md shadow-red-100 hover:shadow-lg hover:shadow-red-200 transform hover:-translate-y-0.5 cursor-pointer text-xs"
            >
              <ShoppingCart size={14} />
              <span>{lang === 'en' ? 'Buy' : 'কিনুন'}</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
