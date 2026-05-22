export type Language = 'bn' | 'en';

export interface TranslationDictionary {
  brandName: string;
  brandTagline: string;
  searchPlaceholder: string;
  popularSearch: string;
  heroBadge: string;
  organicGuarantee: string;
  deliverySpeedTitle: string;
  deliverySpeedDesc: string;
  chemicalFreeTitle: string;
  chemicalFreeDesc: string;
  happyCustomersTitle: string;
  happyCustomersDesc: string;
  whyUsSectionTitle: string;
  whyUsSectionSubtitle: string;
  whyUsSectionDesc: string;
  featureOrganicTitle: string;
  featureOrganicDesc: string;
  featureSourcingTitle: string;
  featureSourcingDesc: string;
  featurePremiumTitle: string;
  featurePremiumDesc: string;
  featureDeliveryTitle: string;
  featureDeliveryDesc: string;
  shopBadge: string;
  shopTitle: string;
  shopSubtitle: string;
  allFruits: string;
  summerFruits: string;
  winterFruits: string;
  allSeason: string;
  searchStatus: string;
  searchReset: string;
  noFruitsFound: string;
  noFruitsDesc: string;
  viewAllFruits: string;
  organicLabel: string;
  popularLabel: string;
  stockLabel: string;
  kgLabel: string;
  crateLabel: string;
  pcLabel: string;
  originLabel: string;
  vitaminLabel: string;
  benefitsLabel: string;
  addToCartLabel: string;
  viewDetailsLabel: string;
  ratingLabel: string;
  reviewsTitle: string;
  reviewsSubtitle: string;
  reviewsBadge: string;
  faqTitle: string;
  faqSubtitle: string;
  faqBadge: string;
  faqContactPrompt: string;
  footerSlogan: string;
  footerQuickLinks: string;
  footerCallToOrder: string;
  footerCopyright: string;
  footerAddress: string;
  contactHeader: string;
  cartTitle: string;
  cartEmpty: string;
  subtotalLabel: string;
  deliveryFeeLabel: string;
  totalLabel: string;
  orderNowButton: string;
  continueShopping: string;
  checkoutTitle: string;
  checkoutSubtitle: string;
  fullNameLabel: string;
  fullNamePlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  areaLabel: string;
  methodLabel: string;
  notesLabel: string;
  notesPlaceholder: string;
  paymentWarning: string;
  pabnaSadar: string;
  ishwardi: string;
  bera: string;
  chatmohar: string;
  sujanagar: string;
  dhakaCourier: string;
  otherCourier: string;
  cod: string;
  prepayment: string;
  validationPhoneError: string;
  validationGenericError: string;
  orderViaWhatsApp: string;
  orderViaCall: string;
  cancelButton: string;
  toastAddedOne: string;
  toastAddedMany: string;
  toastRemoved: string;
  units: {
    'কেজি': string;
    'ডজন': string;
    'খাঁচি': string;
    'পিস': string;
  };
  productDetailsTitle: string;
  quantityLabel: string;
  totalAmountLabel: string;
  phoneCallButton: string;
}

export const TRANSLATIONS: Record<Language, TranslationDictionary> = {
  bn: {
    brandName: 'সিজনাল ফল',
    brandTagline: 'প্রকৃতির সোয়াদ, প্রতিটি মৌসুমে',
    searchPlaceholder: 'পছন্দের ফল খুঁজুন (যেমন: লিচু, আম, তরমুজ)...',
    popularSearch: 'জনপ্রিয়:',
    heroBadge: '১০০% তাজা ও কেমিক্যালমুক্ত',
    organicGuarantee: '১০০% খাঁটি গ্যারান্টি',
    deliverySpeedTitle: 'পাবনায় ৩ ঘন্টায় ডেলিভারি',
    deliverySpeedDesc: 'সরাসরি আপনার দোরগোড়ায় সুপারফাস্ট হোম ডেলিভারি।',
    chemicalFreeTitle: 'কেমিক্যালমুক্ত ফল',
    chemicalFreeDesc: 'কোন প্রকার রাসায়নিক বা স্প্রে ছাড়া গাছ পাকা ফল।',
    happyCustomersTitle: '৫,০০০+ খুশি কাস্টমার',
    happyCustomersDesc: 'পাবনা ও সারা দেশে শ্রেষ্ঠ মানের ফলের বিশ্বস্ত প্রতিষ্ঠান।',
    whyUsSectionTitle: 'আমাদের বিশেষত্ব',
    whyUsSectionSubtitle: 'কেন অনন্য সিজনাল ফল?',
    whyUsSectionDesc: 'আমরা কোনো কোল্ড স্টোরেজ বা প্রিজারভেটিভ ব্যবহার করি না। সরাসরি বাগান থেকে সংগৃহীত সেরা মানের ফলের নিশ্চয়তা দিই।',
    featureOrganicTitle: 'শতভাগ কেমিক্যালমুক্ত',
    featureOrganicDesc: 'আমাদের ফলগুলোতে কোনো ফরমালিন, কার্বাইড কিংবা কৃত্রিম হরমোন ব্যবহার করা হয় না।',
    featureSourcingTitle: 'সরাসরি বাগান থেকে',
    featureSourcingDesc: 'পাবনা, ঈশ্বরদী ও রাজশাহীর বিখ্যাত বাগানগুলো থেকে যত্ন সহকারে ফল সংগ্রহ করা হয়।',
    featurePremiumTitle: 'প্রিমিয়াম কোয়ালিটি',
    featurePremiumDesc: 'প্রতিটি ফল আলাদাভাবে হাত দিয়ে বাছাই করা হয়, যাতে আপনি পান সেরা ও নিখুঁত স্বাদ।',
    featureDeliveryTitle: 'দ্রুত ও নিরাপদ ডেলিভারি',
    featureDeliveryDesc: 'পাবনা সদর ও ঈশ্বরদীতে নিজস্ব ডেলিভারি এবং দেশের যেকোনো জেলায় কুরিয়ার সুবিধা।',
    shopBadge: 'তাজা ও ফ্রেশ সিজনাল ফল বিপণি',
    shopTitle: 'আমাদের ফলের সমাহার',
    shopSubtitle: 'কোনো প্রকার রাসায়নিক বা ফরমালিন ছাড়া সরাসরি গাছ পাকা ফলের স্বাদ নিন। "কিনুন" বাটনে প্রেস করে এক ক্লিকেই সম্পূর্ণ করুন আপনার অর্ডার।',
    allFruits: 'সব ফল',
    summerFruits: 'গ্রীষ্মকালীন',
    winterFruits: 'শীতকালীন',
    allSeason: 'বারোমাসি',
    searchStatus: 'এর জন্য অনুসন্ধান করা হয়েছে...',
    searchReset: 'রিসেট করতে ক্লিক করুন',
    noFruitsFound: 'কোনো ফল খুঁজে পাওয়া যায়নি!',
    noFruitsDesc: 'আপনার অনুসন্ধানের নামের সাথে সামঞ্জস্যপূর্ণ কোনো সিজনাল ফল বর্তমানে স্টকে নেই। অন্য কোনো নামে চেষ্টা করুন।',
    viewAllFruits: 'সব ফল দেখুন',
    organicLabel: '১০০% অর্গানিক',
    popularLabel: 'জনপ্রিয় ফল',
    stockLabel: 'স্টক সংখ্যা',
    kgLabel: 'কেজি',
    crateLabel: 'খাঁচি',
    pcLabel: 'পিস',
    originLabel: 'উৎপত্তি',
    vitaminLabel: 'ভিটামিন / পুষ্টি',
    benefitsLabel: 'উপকারিতাসমূহ',
    addToCartLabel: 'কিনুন',
    viewDetailsLabel: 'বিস্তারিত দেখুন',
    ratingLabel: 'রেটিং',
    reviewsTitle: 'গ্রাহকদের মুখের কথা',
    reviewsSubtitle: 'আমাদের রিভিউপদ্ধতি ও গ্রাহকের সন্তুষ্টি',
    reviewsBadge: 'রিভিউ ও ফিডব্যাক',
    faqTitle: 'সাধারণ জিজ্ঞাসা',
    faqSubtitle: 'সচরাচর জিজ্ঞেস করা প্রশ্নের উত্তর',
    faqBadge: 'জিজ্ঞাসাবাদ',
    faqContactPrompt: 'আপনার মনে অন্য কোনো প্রশ্ন আছে? সরাসরি আমাদের সাথে যোগাযোগ করুন!',
    footerSlogan: 'আমরা সরাসরি বাগান থেকে ফরমালিন মুক্ত তাজা ও মৌসুমী ফল সরবরাহ করতে প্রতিশ্রুতিবদ্ধ। আপনার সুস্থতাই আমাদের বড় সার্থকতা।',
    footerQuickLinks: 'সহজ নেভিগেশন',
    footerCallToOrder: 'অর্ডার করতে কল করুন',
    footerCopyright: '© ২০২৬ সিজনাল ফল। সর্বস্বত্ব সংরক্ষিত। উই ডিজাইন টিম দ্বারা নির্মিত।',
    footerAddress: '📍 পাবনা সদর, পাবনা, রাজশাহী বিভাগ, বাংলাদেশ।',
    contactHeader: 'যোগাযোগ ও সাপোর্ট',
    cartTitle: 'আপনার শপিং বাস্কেট',
    cartEmpty: 'আপনার শপিং বাস্কেটটি খালি আছে। পছন্দের তাজা ফলগুলো আমাদের "কিনুন" বাটন দিয়ে যুক্ত করুন!',
    subtotalLabel: 'উপ-মোট',
    deliveryFeeLabel: 'ডেলিভারি চার্জ',
    totalLabel: 'সর্বমোট মূল্য',
    orderNowButton: 'অর্ডার করুন',
    continueShopping: 'কেনাকাটা চালিয়ে যান',
    checkoutTitle: 'ডেলিভারি ও পেমেন্ট তথ্য',
    checkoutSubtitle: 'নিচের ফর্মটি পূরণ করে সেকেন্ডের মধ্যে অর্ডার প্লেস করুন।',
    fullNameLabel: 'আপনার নাম (আবশ্যক)*',
    fullNamePlaceholder: 'যেমন: মোহাম্মদ আব্দুল্লাহ',
    phoneLabel: 'মোবাইল নাম্বার (আবশ্যক)*',
    phonePlaceholder: 'যেমন: ০১৭৮৬-৮০৩৮৯৯',
    emailLabel: 'ইমেইল ঠিকানা (ঐচ্ছিক)',
    emailPlaceholder: 'যেমন: abdullah@gmail.com',
    areaLabel: 'ডেলিভারি এলাকা নির্বাচন করুন*',
    methodLabel: 'পেমেন্ট পদ্ধতি নির্বাচন করুন*',
    notesLabel: 'ডেলিভারি নোট বা মেসেজ (ঐচ্ছিক)',
    notesPlaceholder: 'যেমন: বাসার গেট বা কোনো বিশেষ নির্দেশনা থাকলে লিখে দিন।',
    paymentWarning: '⭐ বিকাশ/নগদ পার্সোনাল: ০১৭৮৬-৮০৩৮৯৯ নাম্বারে পেমেন্ট করে মোবাইল নম্বরের শেষ অংশ ডেলিভারি নোটে লিখতে পারেন।',
    pabnaSadar: 'পাবনা সদর (ডেলিভারি: ৪০ টাকা)',
    ishwardi: 'ঈশ্বরদী (ডেলিভারি: ৬০ টাকা)',
    bera: 'বেড়া (ডেলিভারি: ৮০ টাকা)',
    chatmohar: 'চাটমোহর (ডেলিভারি: ৮০ টাকা)',
    sujanagar: 'সুজানগর (ডেলিভারি: ৮০ টাকা)',
    dhakaCourier: 'ঢাকা কুরিয়ার (ডেলিভারি: ১২০ টাকা)',
    otherCourier: 'অন্যান্য জেলা কুরিয়ার (ডেলিভারি: ১৫০ টাকা)',
    cod: 'ক্যাশ অন ডেলিভারি (Cash on Delivery)',
    prepayment: 'বিকাশ / রকেট / নগদ (অগ্রিম)',
    validationPhoneError: 'মোবাইল নাম্বারটি সঠিক নয়। অনুগ্রহ করে ১১ ডিজিট লিখুন (যেমন: 01786803899)',
    validationGenericError: 'অনুগ্রহ করে আবশ্যিক ক্ষেত্রগুলো সঠিকভাবে পূরণ করুন।',
    orderViaWhatsApp: 'হোয়াটসঅ্যাপে অর্ডার দিন 💬',
    orderViaCall: 'সরাসরি ফোনে অর্ডার দিন 📞',
    cancelButton: 'ফিরে যান',
    toastAddedOne: 'অর্ডার তালিকায় ১ খাঁচি/কেজি/পিস যোগ করা হয়েছে!',
    toastAddedMany: 'তাজা ফল অর্ডার তালিকায় যোগ করা হয়েছে!',
    toastRemoved: 'অর্ডার তালিকা থেকে বাদ দেওয়া হয়েছে।',
    units: {
      'কেজি': 'কেজি',
      'ডজন': 'ডজন',
      'খাঁচি': 'খাঁচি',
      'পিস': 'পিস'
    },
    productDetailsTitle: 'ফলের বিস্তারিত তথ্য',
    quantityLabel: 'পরিমাণ',
    totalAmountLabel: 'মোট মূল্য',
    phoneCallButton: '০১৭৮৬-৮০৩৮৯৯'
  },
  en: {
    brandName: 'Seasonal Fruit',
    brandTagline: 'Taste of Nature, in Every Season',
    searchPlaceholder: 'Search for fruits (e.g., Litchi, Mango, Watermelon)...',
    popularSearch: 'Popular:',
    heroBadge: '100% Fresh & Chemical-free',
    organicGuarantee: '100% Pure Guarantee',
    deliverySpeedTitle: '3-Hour Delivery in Pabna',
    deliverySpeedDesc: 'Super-fast home delivery straight to your doorstep.',
    chemicalFreeTitle: 'Chemical-Free Fruits',
    chemicalFreeDesc: 'Tree-ripened fruits without any chemicals or sprays.',
    happyCustomersTitle: '5,000+ Happy Customers',
    happyCustomersDesc: 'The most trusted premium fruit supplier in Pabna & countrywide.',
    whyUsSectionTitle: 'Our Specialties',
    whyUsSectionSubtitle: 'Why Choose Seasonal Fruit?',
    whyUsSectionDesc: 'We do not use cold storage or chemical preservatives. Enjoy premium orchard-fresh quality, guaranteed.',
    featureOrganicTitle: '100% Chemical-Free',
    featureOrganicDesc: 'No formalin, carbide, or synthetic hormones are used in our fruits.',
    featureSourcingTitle: 'Directly From Orchards',
    featureSourcingDesc: 'Carefully sourced from the famous fruit orchards of Pabna, Ishwardi & Rajshahi.',
    featurePremiumTitle: 'Premium Quality',
    featurePremiumDesc: 'Each fruit is handpicked individually to ensure perfect size, shape, and taste.',
    featureDeliveryTitle: 'Fast & Secure Delivery',
    featureDeliveryDesc: 'Direct home delivery in Pabna Sadar & Ishwardi, and courier shipping nationwide.',
    shopBadge: 'Fresh Organic Seasonal Fruits Shop',
    shopTitle: 'Our Fruit Harvest',
    shopSubtitle: 'Enjoy taste direct from nature with zero chemical preservatives. Add items to your cart and check out in seconds!',
    allFruits: 'All Fruits',
    summerFruits: 'Summer Specials',
    winterFruits: 'Winter Collection',
    allSeason: 'All-Season Favorites',
    searchStatus: 'Search results for...',
    searchReset: 'Click to reset search',
    noFruitsFound: 'No fruits found!',
    noFruitsDesc: 'No fruits found matching your active search query. Please try searching for another seasonal fruit.',
    viewAllFruits: 'View All Fruits',
    organicLabel: '100% Organic',
    popularLabel: 'Popular Pick',
    stockLabel: 'In Stock',
    kgLabel: 'kg',
    crateLabel: 'Crate',
    pcLabel: 'pc',
    originLabel: 'Origin',
    vitaminLabel: 'Vitamins & Nutrition',
    benefitsLabel: 'Health Benefits',
    addToCartLabel: 'Add to Cart',
    viewDetailsLabel: 'View Details',
    ratingLabel: 'Rating',
    reviewsTitle: 'Customer Diaries',
    reviewsSubtitle: 'What Our Customers Say About Us',
    reviewsBadge: 'Reviews & Feedback',
    faqTitle: 'Frequently Asked Questions',
    faqSubtitle: 'Got questions? We have answers!',
    faqBadge: 'FAQ Board',
    faqContactPrompt: 'Have other questions in mind? Contact us directly anytime!',
    footerSlogan: 'We are committed to delivering formalin-free, premium organical seasonal fruits straight from orchards. Your wellness is our success.',
    footerQuickLinks: 'Quick Links',
    footerCallToOrder: 'Call to Place Order',
    footerCopyright: '© 2026 Seasonal Fruit. All rights reserved. Crafted by We Design Team.',
    footerAddress: '📍 Pabna Sadar, Pabna, Rajshahi, Bangladesh.',
    contactHeader: 'Contact & Support',
    cartTitle: 'Shopping Cart',
    cartEmpty: 'Your shopping cart is empty. Savor the nature by adding fresh fruits!',
    subtotalLabel: 'Subtotal',
    deliveryFeeLabel: 'Delivery Charge',
    totalLabel: 'Total Amount',
    orderNowButton: 'Proceed Order',
    continueShopping: 'Continue Shopping',
    checkoutTitle: 'Delivery & Payment Info',
    checkoutSubtitle: 'Fill this brief form to confirm your cash/mobile order securely in seconds.',
    fullNameLabel: 'Your Full Name (Required)*',
    fullNamePlaceholder: 'e.g., Mohammad Abdullah',
    phoneLabel: 'Active Phone Number (Required)*',
    phonePlaceholder: 'e.g., 01786803899',
    emailLabel: 'Email Address (Optional)',
    emailPlaceholder: 'e.g., abdullah@gmail.com',
    areaLabel: 'Select Delivery Area*',
    methodLabel: 'Select Payment Method*',
    notesLabel: 'Delivery Notes or Custom Msg (Optional)',
    notesPlaceholder: 'e.g., Leave at gate, or call when near landmark.',
    paymentWarning: '⭐ bKash/Nagad Personal: Pay to 01786-803899 and insert your transaction/mobile last digits in notes.',
    pabnaSadar: 'Pabna Sadar (Delivery: ৳40)',
    ishwardi: 'Ishwardi (Delivery: ৳60)',
    bera: 'Bera (Delivery: ৳80)',
    chatmohar: 'Chatmohar (Delivery: ৳80)',
    sujanagar: 'Sujanagar (Delivery: ৳80)',
    dhakaCourier: 'Dhaka Courier (Delivery: ৳120)',
    otherCourier: 'Other Districts Courier (Delivery: ৳150)',
    cod: 'Cash on Delivery (COD)',
    prepayment: 'bKash / Rocket / Nagad (Pre-pay)',
    validationPhoneError: 'Invalid mobile number. Please type exactly 11 digits (e.g. 01786803899)',
    validationGenericError: 'Please fill out all the required fields correctly.',
    orderViaWhatsApp: 'Order via WhatsApp 💬',
    orderViaCall: 'Order via Direct Call 📞',
    cancelButton: 'Go Back',
    toastAddedOne: 'Added 1 unit to cart!',
    toastAddedMany: 'Successfully added to cart!',
    toastRemoved: 'Removed item from shopping cart.',
    units: {
      'কেজি': 'kg',
      'ডজন': 'dozen',
      'খাঁচি': 'crate',
      'পিস': 'piece'
    },
    productDetailsTitle: 'Fruit Breakdown',
    quantityLabel: 'Quantity',
    totalAmountLabel: 'Total price',
    phoneCallButton: '01786-803899'
  }
};

// Localized orchard fruits dataset overrides
export const FRUITS_TRANSLATIONS_EN: Record<string, {
  name: string;
  description: string;
  origin: string;
  benefits: string[];
  vitamins: string[];
}> = {
  'litchi-mozaffar': {
    name: 'Ishwardi Mozaffar Litchi',
    description: 'Ishwardi\'s heritage fresh and ultra-sweet Mozaffar litchis. 100% tree ripened and chemical preservative-free. Extremely juicy & delicious.',
    origin: 'Ishwardi, Pabna',
    benefits: ['Boosts immune system', 'Keeps skin glowing and supple', 'Promotes healthy digestion', 'Dense in critical antioxidants'],
    vitamins: ['Vitamin C', 'Potassium', 'Magnesium']
  },
  'mango-himsagar': {
    name: 'Rajshahi Himsagar Mango',
    description: 'Himsagar is truly the King of Mangoes! Fiberless, exceptionally sweet, and aromatic. Uniquely handpicked with a 100% organic guarantee.',
    origin: 'Rajshahi & Pabna border',
    benefits: ['Enhances healthy eyesight', 'Aids cholesterol management', 'Provides swift energy reserves', 'Boosts brain memory'],
    vitamins: ['Vitamin A', 'Vitamin C', 'Iron']
  },
  'pineapple-honey': {
    name: 'Madhupur Honey Queen Pineapple',
    description: 'The world-famous Jaldugi (Honey Queen) pineapple from Madhupur. Medium in size but unparalleled in sweetness and juiciness.',
    origin: 'Madhupur, Tangail',
    benefits: ['Strengthens bones & teeth', 'Helps counter mild cold & cough', 'Extremely low calorie for weight-loss', 'Improves digestion enzyme cycle'],
    vitamins: ['Bromelain enzyme', 'Vitamin C', 'Manganese']
  },
  'jackfruit-sweet': {
    name: 'Pabna Sweet Jackfruit',
    description: 'Naturally tree-ripened fresh jackfruits. Deep yellow sections are highly sweet and crisp.Sourced from countryside home gardens.',
    origin: 'Pabna Sadar',
    benefits: ['Maintains active brain health', 'Fights state of anemia', 'Regulates hypertension', 'Strengthens muscle fibers'],
    vitamins: ['Vitamin B6', 'Potassium', 'Calcium']
  },
  'watermelon-red': {
    name: 'Vibrant Red Watermelon',
    description: 'Beautifully red and sugary sweet watermelons that melt inside your mouth. Perfect hydration during intense summer heat.',
    origin: 'Barishal Delta Region',
    benefits: ['Eradicates severe dehydration', 'Exudes natural skin radiance', 'Promotes core cardiac wellness', 'Eases post-activity muscle fatigue'],
    vitamins: ['Lycopene antioxidant', 'Vitamin C', 'Potassium']
  },
  'guava-sweet': {
    name: 'Sweet Thai Guava',
    description: 'The crunchy and mildly sweet Thai-3 & Thai-5 guavas harvested locally. Highly recommended for dietary management and diabetic patients.',
    origin: 'Chatmohar, Pabna',
    benefits: ['Effectively regulates glycemic index', 'Lightens hyperpigmentation', 'Cures severe constipation', 'Very high in dietary fiber'],
    vitamins: ['Vitamin C (4x more than Orange)', 'Folic acid', 'High fiber']
  },
  'plum-sweet': {
    name: 'Sweet Apple Plum & Bau Kul',
    description: 'Crisp and sweet Bau Kul plums harvested during transition to spring. Refreshing, juicy & thoroughly loved by children.',
    origin: 'Rural Pabna Orchards',
    benefits: ['Restores regular appetite', 'Supports active hepatic function', 'Reinforces bodily defense system', 'Amazing fruit for weight management'],
    vitamins: ['Vitamin A', 'Vitamin C', 'Phosphorous']
  },
  'orange-organic': {
    name: 'Hill Tracts Organic Orange',
    description: 'Juicy, farm-fresh orange clusters harvested from Sajek and Sylhet hilly borders. Gently sweet with a gorgeous wild citrus perfume.',
    origin: 'Sajek Hill Tracts',
    benefits: ['Fights cold and dry coughs', 'Promotes active cardiovascular fitness', 'Assists mild pressure regulation', 'Boosts natural skin collagen'],
    vitamins: ['Vitamin C (Highly Saturated)', 'Nature flavonoids', 'Sufficient calcium']
  }
};

export const REVIEWS_TRANSLATIONS_EN: Record<string, {
  userName: string;
  comment: string;
  date: string;
}> = {
  'rev-1': {
    userName: 'Mohammed Imran Hasan',
    comment: 'I ordered Mozaffar Litchis right from Pabna Sadar. Delivered in under 2 hours! Fresh, incredibly sweet, and zero damage. Flawless experience!',
    date: '2026-05-15'
  },
  'rev-2': {
    userName: 'Asma Khatun',
    comment: 'The Rajshahi Himsagar mangoes were extremely aromatic and ultra-sweet. Sourcing chemical-free organic mangoes is tough nowadays. Loved by all!',
    date: '2026-05-18'
  },
  'rev-3': {
    userName: 'Dr. Sajjadul Huq',
    comment: 'Guavas and pineapples were super fresh and organic. Truly appreciate their healthy vision and natural supply. Best wishes for Seasonal Fruit!',
    date: '2026-05-20'
  }
};

export const FAQ_TRANSLATIONS_EN = [
  {
    question: 'What are the main attributes of Seasonal Fruit? Where are they sourced?',
    answer: 'We harvest fresh fruits directly from certified local gardens in Pabna Sadar, Ishwardi, Rajshahi, and other famous orchards. Fruits are entirely tree-ripened, chemical-free, formalin-free, and carbide-free, ensuring 100% natural flavor when shipped.'
  },
  {
    question: 'What are the delivery charges and times across Pabna & other cities?',
    answer: 'We cover Pabna Sadar & Ishwardi in 2 to 4 hours with our dedicated fast couriers. Delivery is ৳40 in Pabna Sadar and ৳60 in Ishwardi. For other districts, we utilize Sundarban Courier service, reaching you safely in 1-2 sweet days.'
  },
  {
    question: 'How do I place an order easily?',
    answer: 'Simply add your favorite organic fruits to the web cart and press "Proceed Order." Enter your Name, Phone Number, and Address, then hit "Order via WhatsApp" or "Confirm via Phone" to lock in your seasonal harvest in seconds! Or call 01786-803899 directly.'
  },
  {
    question: 'Can I pay on delivery or requires advanced payment?',
    answer: 'We naturally support 100% secure Cash on Delivery (COD). You inspect the freshness upon delivery and pay the money. You can also pay seamlessly online via bKash, Rocket, or Nagad personal.'
  }
];
