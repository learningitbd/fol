import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { Language, TRANSLATIONS } from '../translations';

interface WhyUsProps {
  lang: Language;
}

export default function WhyUs({ lang }: WhyUsProps) {
  const t = TRANSLATIONS[lang];

  const points = [
    {
      icon: '🌿',
      title: lang === 'en' ? t.featureOrganicTitle : '১০০% ফরমালিন মুক্ত',
      description: lang === 'en' ? t.featureOrganicDesc : 'আমাদের কোনো ফলে কোনো প্রকার ফরমালিন, রাসায়নিক প্রিজারভেটিভ বা ক্ষতিকর কেমিক্যাল ব্যবহার করা হয় না। এটি আমাদের শতভাগ গ্যারান্টি।'
    },
    {
      icon: '🏡',
      title: lang === 'en' ? t.featureSourcingTitle : 'সরাসরি বাগান থেকে সংগৃহীত',
      description: lang === 'en' ? t.featureSourcingDesc : 'দালাল বা মধ্যস্বত্বভোগী ছাড়া সরাসরি ঈশ্বরদী, রাজশাহী ও পাবনা অঞ্চলের নিজস্ব বাগান মালিকদের থেকে সেরা ফলগুলো বেছে সংগ্রহ করা হয়।'
    },
    {
      icon: '⚡',
      title: lang === 'en' ? t.featureDeliveryTitle : 'দ্রুত ও নিরাপদ ডেলিভারি',
      description: lang === 'en' ? t.featureDeliveryDesc : 'অর্ডার করার পর আমাদের নিজস্ব ডেলিভারি টিম দিয়ে মাত্র ২ থেকে ৪ ঘণ্টার মধ্যে সরাসরি আপনার বাসায় সতেজ ও তাজা ফল পৌঁছে দেওয়া হয়।'
    },
    {
      icon: '❤️',
      title: lang === 'en' ? t.featurePremiumTitle : 'সুস্থ জীবনের নিখাদ নিশ্চয়তা',
      description: lang === 'en' ? t.featurePremiumDesc : 'তাজা ও গুণমানসম্পন্ন ফল ভিটামিনের চাহিদা পূরণ করে প্রাকৃতিকভাবে রোগ প্রতিরোধ ক্ষমতা বৃদ্ধি করে। আপনার পরিবার থাকুক সুরক্ষিত।'
    }
  ];

  return (
    <section id="why-us" className="py-20 bg-gradient-to-b from-orange-50/10 via-white to-orange-50/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header section info */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-1.5 bg-red-50 text-red-650 px-3.5 py-1.5 rounded-full text-xs font-bold font-sans mb-3 text-center">
            <Sparkles size={13} className="text-red-500" />
            <span>{lang === 'en' ? 'Our Ultimate Vision' : 'আমাদের লক্ষ্য ও দৃষ্টিভঙ্গি'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight font-display mb-4">
            {t.whyUsSectionSubtitle}
          </h2>
          <p className="text-sm sm:text-base text-gray-500 leading-relaxed font-sans">
            {t.whyUsSectionDesc}
          </p>
        </div>

        {/* Benefits Grid list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {points.map((point, index) => (
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              key={index}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-orange-100 shadow-xs hover:shadow-lg hover:border-red-100 transition-all duration-300 flex flex-col items-center text-center space-y-4 group"
            >
              <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 group-hover:rotate-6 transition-all shadow-xs">
                {point.icon}
              </div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-red-500 transition-colors font-display line-clamp-1">
                {point.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-550 leading-relaxed font-sans">
                {point.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Banner with tagline summary */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-red-100"
        >
          <div className="absolute inset-0 bg-black/10 opacity-45 pointer-events-none"></div>
          <div className="relative z-10 max-w-xl text-center md:text-left space-y-3">
            <h3 className="text-xl sm:text-2xl font-black font-display text-white">
              {lang === 'en' ? '❤️ Fresh, Juicy & Orchard-Ripe Seasonal Fruits ❤️' : '❤️ তাজা, রসালো ও প্রাকৃতিক সিজনাল ফল ❤️'}
            </h3>
            <p className="text-sm font-semibold opacity-90 leading-relaxed font-sans">
              {lang === 'en'
                ? 'Your wellness is our ultimate promise. Savor elite healthy minerals direct from reliable countryside growers.'
                : 'আপনার সুস্থ জীবনের প্রতিশ্রুতি আমাদের সেবা। যেকোনো প্রকার পরামর্শ বা দ্রুত অর্ডারের জন্য আমাদের কাস্টমার সার্ভিসের সাহায্য নিন।'}
            </p>
          </div>
          <div className="relative z-10 flex flex-shrink-0 flex-col sm:flex-row gap-4 w-full md:w-auto">
            <a
              href="tel:+8801786803899"
              className="bg-white hover:bg-orange-50 text-red-600 font-extrabold px-6 py-3.5 rounded-2xl transition-all shadow-md text-xs text-center border cursor-pointer w-full sm:w-auto"
            >
              {lang === 'en' ? '📞 Call Us immediately (01786-803899)' : '📞 এখনই কল করুন (০১৭৮৬-৮০৩৮৯৯)'}
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
