import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQ_DATA } from '../data';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Language, TRANSLATIONS, FAQ_TRANSLATIONS_EN } from '../translations';

interface FAQProps {
  lang: Language;
}

export default function FAQ({ lang }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const t = TRANSLATIONS[lang];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const activeFaqSource = lang === 'en' ? FAQ_TRANSLATIONS_EN : FAQ_DATA;

  return (
    <section id="faq" className="py-20 bg-white font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-1.5 bg-orange-50 text-orange-655 px-3.5 py-1.5 rounded-full text-xs font-bold font-sans mb-3 text-center">
            <HelpCircle size={13} />
            <span>{t.faqBadge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight font-display mb-4">
            {t.faqTitle}
          </h2>
          <p className="text-sm text-gray-500 font-sans leading-relaxed">
            {t.faqSubtitle}
          </p>
        </div>

        {/* FAQs List Accordion Layout */}
        <div className="space-y-4">
          {activeFaqSource.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border border-orange-100 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-shadow bg-orange-50/5"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-sm sm:text-base text-gray-900 hover:text-red-500 transition-colors focus:outline-hidden cursor-pointer bg-white font-sans"
                >
                  <span className="font-display font-extrabold leading-snug">{faq.question}</span>
                  <div className="bg-orange-50 text-orange-650 p-1.5 rounded-lg shrink-0 ml-4">
                    {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="p-5 border-t border-orange-100 text-xs sm:text-sm text-gray-600 leading-relaxed font-sans bg-white/70">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Support helper details */}
        <div className="mt-12 bg-orange-50/60 p-6 rounded-3xl border border-orange-100/80 text-center space-y-4">
          <p className="text-xs sm:text-sm font-medium text-gray-700 font-sans">
            {t.faqContactPrompt}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:seasonalfool@gmail.com"
              className="px-5 py-2.5 bg-white border border-orange-200 text-orange-700 hover:text-white hover:bg-orange-600 font-bold text-xs rounded-xl transition-all cursor-pointer shadow-xs font-sans"
            >
              ✉️ {lang === 'en' ? 'Email: seasonalfool@gmail.com' : 'ইমেল: seasonalfool@gmail.com'}
            </a>
            <a
              href="tel:+8801786803899"
              className="px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white font-bold text-xs rounded-xl transition-all cursor-pointer shadow-md font-sans"
            >
              📞 {lang === 'en' ? 'Direct Hotline: 01786-803899' : 'কল করুন: ০১৭৮৬-৮০৩৮৯৯'}
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
