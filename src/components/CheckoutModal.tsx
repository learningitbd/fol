import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem, OrderDetails, Order } from '../types';
import { X, User, Phone, MapPin, ClipboardList, Wallet, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { Language, TRANSLATIONS, FRUITS_TRANSLATIONS_EN } from '../translations';
import { saveOrder } from '../lib/firebase';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onClearCart: () => void;
  lang: Language;
}

export default function CheckoutModal({ isOpen, onClose, cart, onClearCart, lang }: CheckoutModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [submittedOrder, setSubmittedOrder] = useState<any>(null);
  const t = TRANSLATIONS[lang];

  const areas = [
    { value: 'Pabna Sadar', labelBn: 'পাবনা সদর (চার্জ ৳৪০)', labelEn: 'Pabna Sadar (Fee ৳40)', fee: 40 },
    { value: 'Ishwardi', labelBn: 'ঈশ্বরদী (চার্জ ৳৬০)', labelEn: 'Ishwardi (Fee ৳60)', fee: 60 },
    { value: 'Chatmohar', labelBn: 'চাটমোহর (চার্জ ৳৮০)', labelEn: 'Chatmohar (Fee ৳80)', fee: 80 },
    { value: 'Bera', labelBn: 'বেড়া (চার্জ ৳৮০)', labelEn: 'Bera (Fee ৳80)', fee: 80 },
    { value: 'Sujanagar', labelBn: 'সুজানগর (চার্জ ৳৮০)', labelEn: 'Sujanagar (Fee ৳80)', fee: 80 },
    { value: 'Dhaka Courier', labelBn: 'ঢাকা কুরিয়ার (চার্জ ৳১২০)', labelEn: 'Dhaka Courier (Fee ৳120)', fee: 120 },
    { value: 'Other Districts', labelBn: 'অন্যান্য জেলা কুরিয়ার (চার্জ ৳১২০)', labelEn: 'Other Districts Courier (Fee ৳120)', fee: 120 },
  ];

  const paymentMethods = [
    { 
      value: 'Cash on Delivery', 
      labelBn: '💵 ক্যাশ অন ডেলিভারি', 
      labelEn: '💵 Cash on Delivery (COD)', 
      descBn: 'পণ্য বুঝে পেয়ে হাতেনাতে টাকা পরিশোধ করুন। সবচেয়ে নিরাপদ ব্যবস্থা।', 
      descEn: 'Pay with physical cash upon receiving fruits at your address. Highly secure.' 
    },
    { 
      value: 'Mobile Wallet (Advance)', 
      labelBn: '📱 বিকাশ / নগদ / রকেট (অগ্রিম পেমেন্ট)', 
      labelEn: '📱 bKash / Nagad / Rocket (Advance)', 
      descBn: 'অর্ডার করার পর আমাদের পার্সোনাল নাম্বারে সেন্ট মানি করে অর্ডার দ্রুত করুন।', 
      descEn: 'Send Money to our personal wallet number below to expedite dispatch and confirmation.',
      subDescBn: '⭐ বিকাশ/নগদ পার্সোনাল: ',
      subDescEn: '⭐ bKash/Nagad Personal: '
    },
  ];

  const [details, setDetails] = useState<OrderDetails>({
    customerName: '',
    phone: '',
    email: '',
    address: '',
    area: 'Pabna Sadar',
    paymentMethod: 'Cash on Delivery',
    notes: '',
  });

  const [validationError, setValidationError] = useState('');

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.fruit.price * item.quantity, 0);

  const getDeliveryFee = (areaVal: string) => {
    const found = areas.find(a => a.value === areaVal);
    return found ? found.fee : 40;
  };

  const getAreaLabel = (areaVal: string) => {
    const found = areas.find(a => a.value === areaVal);
    if (!found) return areaVal;
    return lang === 'en' ? found.labelEn : found.labelBn;
  };

  const getPaymentLabel = (payVal: string) => {
    const found = paymentMethods.find(p => p.value === payVal);
    if (!found) return payVal;
    return lang === 'en' ? found.labelEn : found.labelBn;
  };

  const deliveryFee = getDeliveryFee(details.area);
  const total = subtotal + deliveryFee;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDetails(prev => ({ ...prev, [name]: value }));
    setValidationError('');
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!details.customerName.trim()) {
        setValidationError(lang === 'en' ? 'Please enter your name.' : 'অনুগ্রহ করে আপনার নাম লিখুন।');
        return;
      }
      if (!details.phone.trim()) {
        setValidationError(lang === 'en' ? 'Please enter your mobile number.' : 'অনুগ্রহ করে আপনার মোবাইল নাম্বার লিখুন।');
        return;
      }
      const bangladeshiPhoneRegex = /^(?:\+88|88)?(01[3-9]\d{8})$/;
      if (!bangladeshiPhoneRegex.test(details.phone.replace(/[\s-]/g, ''))) {
        setValidationError(lang === 'en' ? 'Invalid mobile phone number. Please write 11 digits (e.g. 01786803899)' : 'মোবাইল নাম্বারটি সঠিক নয়। অনুগ্রহ করে ১১ ডিজিট লিখুন (যেমন: 01786803899)');
        return;
      }
      if (!details.address.trim()) {
        setValidationError(lang === 'en' ? 'Please provide your detailed delivery address.' : 'অনুগ্রহ করে আপনার সঠিক ঠিকানাটি লিখুন।');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handlePrevStep = () => {
    if (step === 2) setStep(1);
    if (step === 3) setStep(2);
  };

  // Formulate text for WhatsApp
  const generateWhatsAppMessage = () => {
    let msg = lang === 'en' 
      ? `*সিজনাল ফল (Seasonal Fruits)*\n*New Organic Order Details:*\n`
      : `*সিজনাল ফল (Seasonal Fruits)*\n*নতুন অর্ডারের বিস্তারিত:*\n`;
    msg += `---------------------------\n`;
    msg += lang === 'en'
      ? `👤 Name: ${details.customerName}\n📞 Phone: ${details.phone}\n📍 Area: ${getAreaLabel(details.area)}\n🏠 Address: ${details.address}\n💳 Payment: ${getPaymentLabel(details.paymentMethod)}\n`
      : `👤 নাম: ${details.customerName}\n📞 ফোন: ${details.phone}\n📍 এরিয়া: ${getAreaLabel(details.area)}\n🏠 ঠিকানা: ${details.address}\n💳 পেমেন্ট মাধ্যম: ${getPaymentLabel(details.paymentMethod)}\n`;
    if (details.notes) {
      msg += (lang === 'en' ? `📝 Notes: ` : `📝 নোট: `) + `${details.notes}\n`;
    }
    msg += `---------------------------\n`;
    msg += lang === 'en' ? `*Purchased Fruits List:*\n` : `*ক্রয়কৃত ফলের তালিকা:*\n`;
    
    cart.forEach((item, index) => {
      const fEn = FRUITS_TRANSLATIONS_EN[item.fruit.id];
      const displayName = lang === 'en' ? (fEn?.name || item.fruit.englishName) : item.fruit.name;
      const displayUnit = lang === 'en' ? t.units[item.fruit.unit] : item.fruit.unit;
      msg += `${index + 1}. ${displayName} - ${item.quantity} ${displayUnit} x ৳${item.fruit.price} = ৳${item.fruit.price * item.quantity}\n`;
    });
    
    msg += `---------------------------\n`;
    msg += lang === 'en'
      ? `💵 Subtotal: ৳${subtotal}\n🚚 Delivery Charge: ৳${deliveryFee}\n💰 *Grand Total: ৳${total}*\n\nThank you, please confirm my order.`
      : `💵 উপমোট: ৳${subtotal}\n🚚 ডেলিভারি চার্জ: ৳${deliveryFee}\n💰 *সর্বমোট মূল্য: ৳${total}*\n\nধন্যবাদ, আমার অর্ডারটি দয়া করে কনফার্ম করুন।`;
    
    return encodeURIComponent(msg);
  };

  const handleCheckoutWhatsApp = () => {
    const waUrl = `https://wa.me/8801786803899?text=${generateWhatsAppMessage()}`;
    window.open(waUrl, '_blank');
    completeOrder('whatsapp');
  };

  const handleCheckoutCOD = () => {
    completeOrder('cod');
  };

  const completeOrder = async (type: 'whatsapp' | 'cod') => {
    const orderId = `SF-${Math.floor(100000 + Math.random() * 900000)}`;
    const dateStr = new Date().toLocaleDateString(lang === 'en' ? 'en-US' : 'bn-BD');
    const orderData: Order = {
      id: orderId,
      details,
      items: cart,
      subtotal,
      deliveryFee,
      total,
      status: 'পেন্ডিং',
      date: dateStr
    };

    try {
      await saveOrder(orderData);
    } catch (error) {
      console.warn('Could not save order directly to Firestore', error);
    }

    setSubmittedOrder({
      ...orderData,
      type
    });
    onClearCart();
  };

  const handleCloseSuccess = () => {
    setStep(1);
    setSubmittedOrder(null);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-55 overflow-y-auto font-sans">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={submittedOrder ? handleCloseSuccess : onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-xs"
        />

        <div className="flex min-h-screen items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            className="relative w-full max-w-xl overflow-hidden rounded-3xl bg-white shadow-2xl border border-orange-100 flex flex-col p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-950 font-display">
                {submittedOrder 
                  ? (lang === 'en' ? 'Order Submitted Successfully!' : 'অর্ডার সম্পন্ন হয়েছে!') 
                  : (lang === 'en' ? 'Order Checkout & Payment' : 'অর্ডার ফর্ম ও পেমেন্ট')
                }
              </h3>
              <button
                onClick={submittedOrder ? handleCloseSuccess : onClose}
                className="p-1.5 hover:bg-gray-100 text-gray-500 hover:text-black rounded-lg cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Error alerts */}
            {validationError && (
              <div className="mb-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs font-bold p-3 rounded-lg">
                ⚠️ {validationError}
              </div>
            )}

            {/* Success Screens */}
            {submittedOrder ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6 text-center py-4"
              >
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-2 animate-bounce">
                  <CheckCircle size={36} />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-extrabold text-gray-900">
                    {lang === 'en' ? 'Your order has been registered!' : 'আপনার অর্ডারটি নিবন্ধিত হয়েছে!'}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    {lang === 'en' ? 'Order Code: ' : 'অর্ডার নম্বর: ' }
                    <span className="font-mono font-extrabold text-red-650">{submittedOrder.orderId}</span>
                  </p>
                </div>

                {/* Printable Invoice Card */}
                <div className="bg-orange-50/50 border border-orange-100 rounded-2xl p-5 text-left space-y-4 text-xs">
                  <div className="flex justify-between border-b border-gray-200 pb-2 mb-2 font-bold font-display">
                    <span>{lang === 'en' ? 'Invoice: Seasonal Fruits' : 'রসিদ: সিজনাল ফল'}</span>
                    <span>{lang === 'en' ? 'Date: ' : 'তারিখ: '}{submittedOrder.date}</span>
                  </div>
                  
                  {/* Customer details info */}
                  <div className="space-y-1.5 text-gray-650">
                    <p>
                      👦 {lang === 'en' ? 'Customer: ' : 'গ্রাহক: '}
                      <span className="font-bold text-gray-900">{submittedOrder.details.customerName}</span>
                    </p>
                    <p>
                      📞 {lang === 'en' ? 'Phone: ' : 'ফোন: '}
                      <span className="font-bold text-gray-900 font-mono">{submittedOrder.details.phone}</span>
                    </p>
                    <p>
                      📍 {lang === 'en' ? 'Address: ' : 'ঠিকানা: '}
                      <span className="font-semibold text-gray-900">{submittedOrder.details.address} ({getAreaLabel(submittedOrder.details.area)})</span>
                    </p>
                    <p>
                      💳 {lang === 'en' ? 'Payment Method: ' : 'পেমেন্ট মোড: '}
                      <span className="font-bold text-gray-900">{getPaymentLabel(submittedOrder.details.paymentMethod)}</span>
                    </p>
                  </div>

                  {/* Pricing brief */}
                  <div className="border-t border-dashed border-gray-300 pt-2 space-y-1.5">
                    <div className="flex justify-between text-gray-500">
                      <span>{t.subtotalLabel}</span>
                      <span className="font-bold text-gray-800 font-mono">৳{submittedOrder.subtotal}</span>
                    </div>
                    <div className="flex justify-between text-gray-500">
                      <span>{lang === 'en' ? 'Delivery Charge: ' : 'ডেলিভারি চার্জ: '}</span>
                      <span className="font-bold text-gray-800 font-mono">৳{submittedOrder.deliveryFee}</span>
                    </div>
                    <div className="flex justify-between text-sm font-black border-t border-gray-200 pt-2 text-red-600 font-mono">
                      <span>{t.totalAmountLabel}</span>
                      <span>৳{submittedOrder.total}</span>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-gray-500 leading-relaxed px-4 font-sans font-medium">
                  🍎 {submittedOrder.type === 'whatsapp' 
                    ? (lang === 'en' ? 'Your WhatsApp message is preparing. Our representative will contact you in 24 hours.' : 'আপনার হোয়াটসঅ্যাপ মেসেজটি পাঠানো হচ্ছে। আমাদের রিপ্রেজেন্টেটিভ আপনার সাথে যোগাযোগ করবেন।') 
                    : (lang === 'en' ? 'Our hotline team will contact you shortly to verify details and begin packaging. Thank you!' : 'আমাদের হেল্পলাইন থেকে অতিসত্বর ফোন কলের মাধ্যমে অর্ডারটির সত্যতা যাচাই করে প্রসেস করা হবে। ধন্যবাদ!')
                  }
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <a
                    href="tel:+8801786803899"
                    className="flex-1 py-3.5 bg-orange-100 hover:bg-orange-200 text-orange-800 rounded-xl font-bold text-xs text-center cursor-pointer transition-colors"
                  >
                    📞 {lang === 'en' ? 'Call hotline directly' : 'কল করে দ্রুত নিশ্চিত করুন'}
                  </a>
                  <button
                    onClick={handleCloseSuccess}
                    className="flex-1 py-3.5 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold text-xs cursor-pointer transition-all shadow-md shadow-red-100"
                  >
                    {lang === 'en' ? 'OK, Got It' : 'ঠিক আছে'}
                  </button>
                </div>
              </motion.div>
            ) : (
              <div>
                {/* Steps markers tracker */}
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center space-x-2">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-mono ${step >= 1 ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-400'}`}>1</span>
                    <span className="text-xs font-extrabold text-gray-800">{lang === 'en' ? 'Info' : 'তথ্য'}</span>
                  </div>
                  <div className="flex-1 h-0.5 bg-gray-100 mx-2" />
                  <div className="flex items-center space-x-2">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-mono ${step >= 2 ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-400'}`}>2</span>
                    <span className="text-xs font-extrabold text-gray-800">{lang === 'en' ? 'Payment' : 'পেমেন্ট'}</span>
                  </div>
                  <div className="flex-1 h-0.5 bg-gray-100 mx-2" />
                  <div className="flex items-center space-x-2">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-mono ${step >= 3 ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-400'}`}>3</span>
                    <span className="text-xs font-extrabold text-gray-800">{lang === 'en' ? 'Confirm' : 'নিশ্চিতকরণ'}</span>
                  </div>
                </div>

                {/* Steps Content switcher */}
                <div className="mb-8">
                  {step === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4"
                    >
                      <h4 className="text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-wider flex items-center space-x-1.5 mb-2">
                        <User size={14} /> 
                        <span>{lang === 'en' ? 'Recipient Details' : 'প্রাপকের তথ্য'}</span>
                      </h4>
                      
                      <div className="space-y-1">
                        <label className="text-xs font-extrabold text-gray-750 block">{lang === 'en' ? 'Full Name *' : 'নাম *'}</label>
                        <input
                          type="text"
                          name="customerName"
                          placeholder={lang === 'en' ? 'Enter your complete name' : 'আপনার সম্পূর্ণ নাম লিখুন'}
                          value={details.customerName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-extrabold text-gray-750 block">{lang === 'en' ? 'Mobile Number *' : 'মোবাইল নাম্বার *'}</label>
                          <input
                            type="tel"
                            name="phone"
                            placeholder="e.g. 01786803899"
                            value={details.phone}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all font-mono"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-extrabold text-gray-750 block">{lang === 'en' ? 'Email (Optional)' : 'ইমেইল (ঐচ্ছিক)'}</label>
                          <input
                            type="email"
                            name="email"
                            placeholder="yourname@gmail.com"
                            value={details.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all font-sans"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                        <div className="space-y-1">
                          <label className="text-xs font-extrabold text-gray-750 block">{lang === 'en' ? 'Delivery Area *' : 'ডেলিভারি এরিয়া *'}</label>
                          <select
                            name="area"
                            value={details.area}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all cursor-pointer bg-white"
                          >
                            {areas.map(a => (
                              <option key={a.value} value={a.value}>
                                {lang === 'en' ? a.labelEn : a.labelBn}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-extrabold text-gray-750 block">{lang === 'en' ? 'Delivery Address *' : 'ঠিকানা বিস্তারিত *'}</label>
                          <input
                            type="text"
                            name="address"
                            placeholder={lang === 'en' ? 'House, Road, Area landmarks...' : 'বাড়ি/গ্রাম, রোড নম্বর, পরিচিত স্থান...'}
                            value={details.address}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-extrabold text-gray-750 block">{lang === 'en' ? 'Special Notes or Preferences (Optional)' : 'বিশেষ অনুরোধ বা নোট (ঐচ্ছিক)'}</label>
                        <textarea
                          name="notes"
                          placeholder={lang === 'en' ? 'Ripe preference, custom packing request or preferred timeline...' : 'পাকা ফল বা কাঁচা ফলের পছন্দ, অথবা কোনো নির্দিষ্ট ডেলিভারি টাইম...'}
                          value={details.notes || ''}
                          onChange={handleInputChange}
                          rows={2}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all placeholder:text-gray-400"
                        />
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4"
                    >
                      <h4 className="text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-wider flex items-center space-x-1.5 mb-2">
                        <Wallet size={14} /> 
                        <span>{lang === 'en' ? 'Select Payment Mode' : 'পেমেন্ট মাধ্যম নির্বাচন করুন'}</span>
                      </h4>
                      
                      <div className="grid grid-cols-1 gap-3 font-sans">
                        {paymentMethods.map(p => (
                          <label 
                            key={p.value} 
                            className={`border rounded-2xl p-4 flex items-start space-x-3 cursor-pointer transition-all ${details.paymentMethod === p.value ? 'border-red-500 bg-red-50/10' : 'border-gray-200'}`}
                          >
                            <input
                              type="radio"
                              name="paymentMethod"
                              value={p.value}
                              checked={details.paymentMethod === p.value}
                              onChange={handleInputChange}
                              className="mt-1"
                            />
                            <div>
                              <span className="text-xs sm:text-sm font-bold text-gray-900 block">
                                {lang === 'en' ? p.labelEn : p.labelBn}
                              </span>
                              <span className="text-[11px] text-gray-500 block leading-relaxed mt-0.5">
                                {lang === 'en' ? p.descEn : p.descBn}
                              </span>
                              
                              {p.value === 'Mobile Wallet (Advance)' && (
                                <div className="mt-2 bg-orange-50 border border-orange-100 rounded-lg p-2.5 text-[10px] text-orange-850">
                                  <span>{lang === 'en' ? p.subDescEn : p.subDescBn}</span>
                                  <span className="font-mono font-bold text-red-600 select-all">01786-803899</span>
                                </div>
                              )}
                            </div>
                          </label>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4"
                    >
                      <h4 className="text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-wider flex items-center space-x-1.5 mb-2">
                        <ClipboardList size={14} /> 
                        <span>{lang === 'en' ? 'Receipt and Final Confirmation' : 'অর্ডারের রসিদ ও নিশ্চিতকরণ'}</span>
                      </h4>
                      
                      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 space-y-3 text-xs max-h-56 overflow-y-auto">
                        <div className="border-b border-gray-200 pb-2 mb-2 font-bold text-gray-800">
                          {lang === 'en' ? 'Item Summary:' : 'অর্ডার আইটেম সমূহ:'}
                        </div>
                        {cart.map((item) => {
                          const fEn = FRUITS_TRANSLATIONS_EN[item.fruit.id];
                          const displayName = lang === 'en' ? (fEn?.name || item.fruit.englishName) : item.fruit.name;
                          const displayUnit = lang === 'en' ? t.units[item.fruit.unit] : item.fruit.unit;
                          return (
                            <div key={item.fruit.id} className="flex justify-between text-gray-650">
                              <span>
                                {displayName} <span className="font-bold text-gray-900 font-mono">x{item.quantity}</span>
                              </span>
                              <span className="font-mono text-gray-900">৳{item.fruit.price * item.quantity}</span>
                            </div>
                          );
                        })}
                        
                        <div className="border-t border-dashed border-gray-300 pt-2.5 space-y-1.5">
                          <div className="flex justify-between text-gray-500">
                            <span>{t.subtotalLabel}</span>
                            <span className="font-bold text-gray-800 font-mono">৳{subtotal}</span>
                          </div>
                          <div className="flex justify-between text-gray-500">
                            <span>{lang === 'en' ? 'Delivery Charge: ' : 'ডেলিভারি চার্জ: '}</span>
                            <span className="font-bold text-gray-800 font-mono">৳{deliveryFee}</span>
                          </div>
                          <div className="flex justify-between text-xs sm:text-sm font-black border-t border-gray-200 pt-2 text-red-600 font-mono">
                            <span>{t.totalAmountLabel}</span>
                            <span>৳{total}</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-orange-50 border border-orange-100 rounded-xl p-3 text-center text-[10px] sm:text-[11px] text-gray-650 font-sans leading-relaxed">
                        📍 {lang === 'en' ? 'Address: ' : 'ডেলিভারি ঠিকানা: '}
                        <span className="font-bold text-gray-800">{details.address}, {getAreaLabel(details.area)}</span>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Footer Controls switcher */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  {step > 1 ? (
                    <button
                      onClick={handlePrevStep}
                      className="flex items-center space-x-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold text-xs transition-colors cursor-pointer"
                    >
                      <ArrowLeft size={14} />
                      <span>{lang === 'en' ? 'Back' : 'পিছনে'}</span>
                    </button>
                  ) : (
                    <div />
                  )}

                  {step < 3 ? (
                    <button
                      onClick={handleNextStep}
                      className="flex items-center space-x-1 px-6 py-2.5 bg-red-500 hover:bg-red-650 text-white rounded-xl font-bold text-xs shadow-md shadow-red-100 hover:shadow-red-200 transition-all transform hover:-translate-y-0.5 cursor-pointer"
                    >
                      <span>{lang === 'en' ? 'Next Step' : 'পরবর্তী ধাপ'}</span>
                      <ArrowRight size={14} />
                    </button>
                  ) : (
                    <div className="flex flex-col sm:flex-row gap-2 w-full">
                      <button
                        onClick={handleCheckoutWhatsApp}
                        className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl flex items-center justify-center space-x-1.5 shadow-md shadow-green-100 text-xs transition-all cursor-pointer"
                      >
                        <span>{lang === 'en' ? '💬 Order via WhatsApp' : '💬 হোয়াটসঅ্যাপে অর্ডার দিন'}</span>
                      </button>
                      <button
                        onClick={handleCheckoutCOD}
                        className="flex-1 py-3 bg-red-500 hover:bg-red-650 text-white font-bold rounded-xl flex items-center justify-center space-x-1.5 shadow-md shadow-red-100 text-xs transition-all cursor-pointer"
                      >
                        <span>{lang === 'en' ? '📦 Confirm Online Reciept' : '📦 অনলাইনে প্লেস করুন (COD)'}</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
