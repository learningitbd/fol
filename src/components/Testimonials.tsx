import React from 'react';
import { motion } from 'motion/react';
import { REVIEWS_DATA } from '../data';
import { Star, MessageSquare } from 'lucide-react';
import { Language, TRANSLATIONS, REVIEWS_TRANSLATIONS_EN } from '../translations';

interface TestimonialsProps {
  lang: Language;
}

export default function Testimonials({ lang }: TestimonialsProps) {
  const t = TRANSLATIONS[lang];

  return (
    <section id="testimonials" className="py-20 bg-gray-50/50 relative overflow-hidden font-sans">
      {/* Decorative Blur and pattern */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-red-105 rounded-full blur-3xl opacity-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-1.5 bg-red-50 text-red-600 px-3.5 py-1.5 rounded-full text-xs font-bold font-sans mb-3 text-center">
            <MessageSquare size={13} />
            <span>{t.reviewsBadge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight font-display mb-4">
            {t.reviewsTitle}
          </h2>
          <p className="text-sm sm:text-base text-gray-500 leading-relaxed font-sans">
            {t.reviewsSubtitle}
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS_DATA.map((review, index) => {
            const rEn = REVIEWS_TRANSLATIONS_EN[review.id];
            const displayUserName = lang === 'en' ? (rEn?.userName || review.userName) : review.userName;
            const displayComment = lang === 'en' ? (rEn?.comment || review.comment) : review.comment;

            return (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                key={review.id}
                className="bg-white rounded-3xl border border-orange-50/80 p-6 sm:p-8 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative group"
              >
                {/* Star rating and icon */}
                <div>
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}
                      />
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm text-gray-650 leading-relaxed font-sans italic">
                    "{displayComment}"
                  </p>
                </div>

                {/* Customer Avatar & info */}
                <div className="mt-8 pt-6 border-t border-gray-100 flex items-center space-x-3">
                  <div className="w-11 h-11 rounded-xl bg-orange-50 overflow-hidden flex items-center justify-center p-0.5 border border-orange-100 shrink-0">
                    <img
                      src={review.avatar}
                      alt={displayUserName}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-gray-900 font-display">{displayUserName}</h4>
                    <p className="text-[10px] text-gray-400 font-mono font-medium mt-0.5">{review.date}</p>
                  </div>

                  <div className="ml-auto text-4xl text-orange-200/50 group-hover:scale-110 transition-transform select-none">
                    ❝
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Quick review metric board */}
        <div className="mt-16 bg-white border border-red-100 p-6 rounded-3xl max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-4 shadow-md shadow-red-50">
          <div>
            <div className="text-xl sm:text-2xl font-black text-gray-900 font-display">
              {lang === 'en' ? '4.9 ★ Weighted Average Rating' : '৪.৯ ★ সর্বমোট গড় রেটিং'}
            </div>
            <p className="text-xs text-gray-500 font-medium">
              {lang === 'en' ? 'Trusted by 5,000+ happy domestic customers' : 'পাবনা ও ঈশ্বরদীর ৫০০+ গ্রাহকের বিশ্বস্ত প্রতিষ্ঠান'}
            </p>
          </div>
          <a
            href="tel:+8801786803899"
            className="w-full sm:w-auto px-6 py-2.5 bg-red-500 hover:bg-red-650 text-white font-bold rounded-xl text-xs text-center transition-colors shadow-xs cursor-pointer font-sans"
          >
            {lang === 'en' ? 'Submit Feedback' : 'কল করে মতামত দিন'}
          </a>
        </div>

      </div>
    </section>
  );
}
