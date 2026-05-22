import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Fruit, Order, UnitType } from '../types';
import { 
  fetchAllFruits, 
  saveFruit, 
  deleteFruitDoc, 
  fetchAllOrders, 
  updateOrderStatus 
} from '../lib/firebase';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Clipboard, 
  ShoppingBag, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  LogOut, 
  Printer, 
  Send, 
  Mail, 
  X, 
  Lock, 
  User, 
  FileText, 
  Info,
  Calendar,
  Layers,
  Sparkles,
  MapPin,
  FileSpreadsheet
} from 'lucide-react';

interface AdminDashboardProps {
  lang: 'en' | 'bn';
  onLogout?: () => void;
  onRefreshFruits?: () => void;
}

export default function AdminDashboard({ lang, onLogout, onRefreshFruits }: AdminDashboardProps) {
  // Authentication states
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('noyon_admin_logged') === 'true';
  });
  const [loginError, setLoginError] = useState('');

  // Data states
  const [fruits, setFruits] = useState<Fruit[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'orders' | 'products' | 'stats'>('orders');

  // Product edit states
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingFruit, setEditingFruit] = useState<Fruit | null>(null);
  const [productForm, setProductForm] = useState<Partial<Fruit>>({
    id: '',
    name: '',
    englishName: '',
    description: '',
    price: 0,
    unit: 'কেজি',
    image: '',
    category: 'গ্রীষ্মকালীন',
    rating: 5.0,
    stock: 50,
    benefits: [],
    origin: '',
    vitamins: [],
    isOrganic: true,
    isPopular: false
  });

  // Invoice view states
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<Order | null>(null);

  // Load data if logged in
  useEffect(() => {
    if (isLoggedIn) {
      loadDashboardData();
    }
  }, [isLoggedIn]);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const liveFruits = await fetchAllFruits();
      setFruits(liveFruits);
      const liveOrders = await fetchAllOrders();
      setOrders(liveOrders);
    } catch (error) {
      console.error('Error loading admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() === 'noyon' && password.trim() === 'noyon') {
      localStorage.setItem('noyon_admin_logged', 'true');
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError(lang === 'en' ? 'Incorrect credentials. Try again.' : 'ইউজারনেম বা পাসওয়ার্ড ভুল হয়েছে। পুনরায় চেষ্টা করুন।');
    }
  };

  const handleLogoutClick = () => {
    localStorage.removeItem('noyon_admin_logged');
    setIsLoggedIn(false);
    if (onLogout) onLogout();
  };

  // Create or Update Product
  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name || !productForm.price || !productForm.id) {
      alert(lang === 'en' ? 'Please fill out required fields' : 'অনুগ্রহ করে প্রয়োজনীয় ঘরগুলো পূরণ করুন');
      return;
    }

    const payload: Fruit = {
      id: productForm.id.trim().toLowerCase().replace(/\s+/g, '-'),
      name: productForm.name,
      englishName: productForm.englishName || productForm.name,
      description: productForm.description || '',
      price: Number(productForm.price),
      unit: (productForm.unit as UnitType) || 'কেজি',
      image: productForm.image || 'https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?auto=format&fit=crop&q=80&w=600',
      category: productForm.category as 'গ্রীষ্মকালীন' | 'শীতকালীন' | 'বারোমাসি',
      rating: Number(productForm.rating) || 5.0,
      stock: Number(productForm.stock) || 0,
      benefits: Array.isArray(productForm.benefits) ? productForm.benefits : [],
      origin: productForm.origin || 'পাবনা',
      vitamins: Array.isArray(productForm.vitamins) ? productForm.vitamins : [],
      isOrganic: productForm.isOrganic !== false,
      isPopular: !!productForm.isPopular
    };

    try {
      setLoading(true);
      await saveFruit(payload);
      setIsProductModalOpen(false);
      setEditingFruit(null);
      await loadDashboardData();
      if (onRefreshFruits) onRefreshFruits();
      alert(lang === 'en' ? 'Product saved successfully!' : 'পণ্যটি সফলভাবে সংরক্ষিত হয়েছে!');
    } catch (err) {
      alert('Error saving: ' + err);
    } finally {
      setLoading(false);
    }
  };

  // Open Add modal
  const openAddProduct = () => {
    setEditingFruit(null);
    setProductForm({
      id: 'fruit-' + Math.floor(Math.random() * 10000),
      name: '',
      englishName: '',
      description: '',
      price: 100,
      unit: 'কেজি',
      image: '',
      category: 'গ্রীষ্মকালীন',
      rating: 5.0,
      stock: 100,
      benefits: ['রোগ প্রতিরোধ বাড়ায়', 'ত্বক ভালো রাখে', 'পুষ্টি সরবরাহ করে'],
      origin: 'পাবনা সদর',
      vitamins: ['ভিটামিন সি', 'ক্যালসিয়াম'],
      isOrganic: true,
      isPopular: false
    });
    setIsProductModalOpen(true);
  };

  // Open Edit modal
  const openEditProduct = (fruit: Fruit) => {
    setEditingFruit(fruit);
    setProductForm({ ...fruit });
    setIsProductModalOpen(true);
  };

  // Delete product
  const handleDeleteProduct = async (id: string, name: string) => {
    if (window.confirm(lang === 'en' ? `Delete "${name}"?` : `আপনি কি সত্যি "${name}" মুছে ফেলতে চান?`)) {
      try {
        setLoading(true);
        await deleteFruitDoc(id);
        await loadDashboardData();
        if (onRefreshFruits) onRefreshFruits();
      } catch (err) {
        alert('Error deleting: ' + err);
      } finally {
        setLoading(false);
      }
    }
  };

  // Update order status
  const handleUpdateStatus = async (orderId: string, newStatus: Order['status']) => {
    try {
      setLoading(true);
      await updateOrderStatus(orderId, newStatus);
      await loadDashboardData();
    } catch (err) {
      alert('Error: ' + err);
    } finally {
      setLoading(false);
    }
  };

  // Generate shareable invoice copy
  const getInvoiceText = (order: Order) => {
    let text = `🧾 *সিজনাল ফল (Seasonal Fruits) - চালানের রশিদ*\n`;
    text += `অর্ডার আইডি: ${order.id}\n`;
    text += `তারিখ: ${order.date}\n`;
    text += `---------------------------------\n`;
    text += `👦 কাস্টমার নাম: ${order.details.customerName}\n`;
    text += `📞 মোবাইল: ${order.details.phone}\n`;
    text += `🏠 ঠিকানা: ${order.details.address} (${order.details.area})\n`;
    text += `💳 পেমেন্ট মাধ্যম: ${order.details.paymentMethod}\n`;
    text += `---------------------------------\n`;
    text += `*ক্রয়কৃত ফলের তালিকা:*\n`;
    order.items.forEach((item, index) => {
      text += `${index + 1}. ${item.fruit.name} : ${item.quantity} ${item.fruit.unit} x ৳${item.fruit.price} = ৳${item.fruit.price * item.quantity}\n`;
    });
    text += `---------------------------------\n`;
    text += `💵 উপমোট: ৳${order.subtotal}\n`;
    text += `🚚 ডেলিভারি চার্জ: ৳${order.deliveryFee}\n`;
    text += `💰 *সর্বমোট প্রদেয় মূল্য: ৳${order.total}*\n\n`;
    text += `অনলাইন থেকে কেনাকাটা করার জন্য ধন্যবাদ!\n`;
    text += `মোবাইল হটলাইন: 01786803899`;
    return encodeURIComponent(text);
  };

  // Share action WhatsApp
  const handleShareWhatsApp = (order: Order) => {
    const text = getInvoiceText(order);
    const url = `https://api.whatsapp.com/send?phone=${order.details.phone.replace(/[^0-9]/g, '')}&text=${text}`;
    window.open(url, '_blank');
  };

  // Share action Mail
  const handleShareEmail = (order: Order) => {
    const subject = encodeURIComponent(`invoice_${order.id} - Seasonal Fruit Shop`);
    const body = getInvoiceText(order);
    const mailtoUrl = `mailto:${order.details.email || ''}?subject=${subject}&body=${body}`;
    window.open(mailtoUrl, '_blank');
  };

  // Trigger print logic
  const handlePrint = () => {
    window.print();
  };

  // Compute analysis variables
  const totalRevenue = orders
    .filter(o => o.status === 'সম্পূর্ণ' || o.status === 'কনফার্মড')
    .reduce((sum, o) => sum + o.total, 0);

  const pendingCount = orders.filter(o => o.status === 'পেন্ডিং').length;
  const draftCount = orders.filter(o => o.status === 'কনফার্মড').length;
  const dispatchCount = orders.filter(o => o.status === 'ডেলিভারি চলছে').length;
  const completeCount = orders.filter(o => o.status === 'সম্পূর্ণ').length;

  if (!isLoggedIn) {
    return (
      <div id="login" className="min-h-screen bg-slate-50 flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-orange-400/20 to-transparent pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-orange-150/40 relative"
        >
          <div className="text-center">
            <span className="text-4xl">👑</span>
            <h2 className="mt-4 text-2xl font-black text-gray-900 font-display">
              {lang === 'en' ? 'Administrative Access' : 'অ্যাডমিন প্যানেল লগইন'}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-gray-500">
              {lang === 'en' ? 'Please log in with credentials to manage shop.' : 'দয়া করে ইউজারনেম ও পাসওয়ার্ড দিয়ে ড্যাশবোর্ডে প্রবেশ করুন।'}
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            {loginError && (
              <div className="p-3 bg-red-50 text-red-650 rounded-xl text-xs font-bold border border-red-100 flex items-center space-x-1.5 leading-relaxed">
                <span>⚠️</span>
                <span>{loginError}</span>
              </div>
            )}

            <div className="space-y-4 rounded-md">
              <div className="relative">
                <label className="text-[10px] font-black uppercase text-gray-400 block mb-1 tracking-wider">Username</label>
                <div className="absolute inset-y-0 left-0 pl-3.5 pt-6 flex items-center pointer-events-none text-gray-400">
                  <User size={16} />
                </div>
                <input
                  type="text"
                  required
                  placeholder="noyon"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 w-full px-4 py-3 rounded-xl border border-gray-200 text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-red-500 bg-gray-50/50"
                />
              </div>

              <div className="relative">
                <label className="text-[10px] font-black uppercase text-gray-400 block mb-1 tracking-wider">Password</label>
                <div className="absolute inset-y-0 left-0 pl-3.5 pt-6 flex items-center pointer-events-none text-gray-400">
                  <Lock size={16} />
                </div>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 w-full px-4 py-3 rounded-xl border border-gray-200 text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-red-500 bg-gray-50/50"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-3.5 bg-red-500 hover:bg-red-650 text-white rounded-xl text-xs sm:text-sm font-bold shadow-lg shadow-red-100 hover:shadow-red-200 transition-all cursor-pointer transform hover:-translate-y-0.5 active:scale-95"
              >
                🔐 {lang === 'en' ? 'Log In' : 'ড্যাশবোর্ডে প্রবেশ করুন'}
              </button>
            </div>
            
            <button
              type="button"
              onClick={() => {
                const homePath = window.location.pathname.replace(/(?:login|admin)\/?$/, '');
                window.history.pushState({}, '', homePath || './');
                window.location.hash = '';
                const event = new PopStateEvent('popstate');
                window.dispatchEvent(event);
              }}
              className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-650 rounded-xl text-xs font-bold transition-all cursor-pointer block text-center"
            >
              ⬅️ {lang === 'en' ? 'Return to Home Store' : 'মূল ওয়েবসাইটে ফিরে যান'}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div id="admin-panel" className="min-h-screen bg-slate-50 font-sans print:bg-white pb-20">
      
      {/* Admin navigation bar header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-xs print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-3 select-none">
              <span className="text-2xl sm:text-3xl">🧺</span>
              <div>
                <h1 className="text-sm sm:text-base font-black text-gray-950 font-display">
                  {lang === 'en' ? 'System Management Panel' : 'ম্যানেজমেন্ট সিস্টেম (noyon)'}
                </h1>
                <span className="text-[10px] text-green-600 font-bold block -mt-1 font-mono">● Active Database Live</span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => {
                  const homePath = window.location.pathname.replace(/(?:login|admin)\/?$/, '');
                  window.history.pushState({}, '', homePath || './');
                  window.location.hash = '';
                  const event = new PopStateEvent('popstate');
                  window.dispatchEvent(event);
                }}
                className="px-3 py-1.5 bg-orange-50 text-orange-850 border border-orange-150 rounded-lg hover:bg-orange-100 text-xs font-medium cursor-pointer transition-colors"
              >
                🏪 {lang === 'en' ? 'Live Store' : 'স্টোর দেখুন'}
              </button>
              <button
                onClick={handleLogoutClick}
                className="flex items-center space-x-1.5 px-3 py-1.5 bg-red-50 text-red-700 hover:bg-red-100 text-xs font-black rounded-lg cursor-pointer transition-colors"
              >
                <LogOut size={13} />
                <span className="hidden sm:inline">{lang === 'en' ? 'Sign out' : 'লগআউট'}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 print:mt-0">
        
        {/* Tabs Controls print:hidden */}
        <div className="flex border-b border-gray-200 space-x-4 mb-8 print:hidden overflow-x-auto">
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 text-xs sm:text-sm font-bold px-2 relative transition-all cursor-pointer shrink-0 ${activeTab === 'orders' ? 'text-red-650' : 'text-gray-500 hover:text-gray-900'}`}
          >
            📦 {lang === 'en' ? 'Orders List && Deliveries' : 'গ্রাহক অর্ডারের তালিকা (Orders)'}
            {orders.filter(o => o.status === 'পেন্ডিং').length > 0 && (
              <span className="ml-1.5 bg-red-600 text-white rounded-full font-mono text-[9px] px-1.5 py-0.5 font-bold">
                {orders.filter(o => o.status === 'পেন্ডিং').length}
              </span>
            )}
            {activeTab === 'orders' && <motion.div layoutId="adm-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600" />}
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`pb-3 text-xs sm:text-sm font-bold px-2 relative transition-all cursor-pointer shrink-0 ${activeTab === 'products' ? 'text-red-650' : 'text-gray-500 hover:text-gray-900'}`}
          >
            🍎 {lang === 'en' ? 'Inventory Products' : 'ফল আইটেম স্টক ম্যানেজমেন্ট'}
            {activeTab === 'products' && <motion.div layoutId="adm-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600" />}
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`pb-3 text-xs sm:text-sm font-bold px-2 relative transition-all cursor-pointer shrink-0 ${activeTab === 'stats' ? 'text-red-650' : 'text-gray-500 hover:text-gray-900'}`}
          >
            📊 {lang === 'en' ? 'Analytics Summary' : 'ব্যবসায়িক রিপোর্ট ও ডাটা'}
            {activeTab === 'stats' && <motion.div layoutId="adm-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600" />}
          </button>
        </div>

        {/* Global Loading Bar */}
        {loading && (
          <div className="w-full bg-red-100 h-1 rounded-full overflow-hidden mb-6 print:hidden">
            <div className="bg-red-500 h-full animate-pulse w-2/3" />
          </div>
        )}

        {/* Dynamic content rendering according to states */}
        {activeTab === 'stats' && (
          <div className="space-y-8 animate-fadeIn print:hidden">
            {/* Quick stats highlight cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-5 rounded-3xl border border-gray-150/60 shadow-xs flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
                  <TrendingUp size={24} />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold font-mono">Total Sales / আয়</span>
                  <p className="text-xl sm:text-2xl font-black text-gray-900 font-mono">৳{totalRevenue}</p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-gray-150/60 shadow-xs flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                  <Clipboard size={24} />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold font-mono">Total Orders</span>
                  <p className="text-xl sm:text-2xl font-black text-gray-900 font-mono">{orders.length}</p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-gray-150/60 shadow-xs flex items-center space-x-4">
                <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center">
                  <Clock size={24} className="animate-spin" style={{ animationDuration: '6s' }} />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold font-mono">Pending / পেন্ডিং</span>
                  <p className="text-xl sm:text-2xl font-black text-gray-900 font-mono">{pendingCount}</p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-gray-150/60 shadow-xs flex items-center space-x-4">
                <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center">
                  <Layers size={24} />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold font-mono">Fruits In Store</span>
                  <p className="text-xl sm:text-2xl font-black text-gray-900 font-mono">{fruits.length}</p>
                </div>
              </div>
            </div>

            {/* Area distribution card */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-250/60 shadow-xs">
              <h3 className="text-sm font-bold uppercase tracking-wider tracking-widest text-emerald-800 font-display mb-4">
                📈 {lang === 'en' ? 'Area Delivery Analysis' : 'ডেলিভারি ডিস্ট্রিবিউশন সামারি'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-50 p-4 rounded-2xl border border-gray-100">
                  <span className="text-xs font-bold text-gray-500">পাবনা সদর (Sadar)</span>
                  <span className="block text-lg font-black text-gray-800 font-mono">
                    {orders.filter(o => o.details.area === 'Pabna Sadar' || (o.details.area as any) === 'পাবনা সদর').length} Orders
                  </span>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-gray-100">
                  <span className="text-xs font-bold text-gray-500">ঈশ্বরদী (Ishwardi)</span>
                  <span className="block text-lg font-black text-gray-800 font-mono">
                    {orders.filter(o => o.details.area === 'Ishwardi' || (o.details.area as any) === 'ঈশ্বরদী').length} Orders
                  </span>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-gray-100">
                  <span className="text-xs font-bold text-gray-500">ঢাকা ও অন্যান্য জেলা (Courier)</span>
                  <span className="block text-lg font-black text-gray-800 font-mono">
                    {orders.filter(o => o.details.area.includes('District') || o.details.area.includes('Courier') || o.details.area.includes('কুরিয়ার')).length} Orders
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="space-y-6 animate-fadeIn print:hidden">
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div>
                <h3 className="text-base sm:text-lg font-black text-gray-900 font-display">
                  🍎 {lang === 'en' ? 'Manage Fruits Storefront' : 'ফলের স্টক ও মূল্য ক্যাটালগ'}
                </h3>
                <p className="text-xs text-gray-500">{lang === 'en' ? 'Review fruit details, ratings, and price levels.' : 'নতুন ফল যোগ করতে পারেন, কাস্টম ইমেজ সেট করতে পারেন এবং মজুদ সংস্করণ দেখতে পারেন।'}</p>
              </div>

              <button
                onClick={openAddProduct}
                className="flex items-center space-x-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-md transition-all cursor-pointer hover:-translate-y-0.5 active:scale-95"
              >
                <Plus size={16} />
                <span>{lang === 'en' ? 'Add New Fruit' : 'নতুন ফল যোগ করুন'}</span>
              </button>
            </div>

            {/* Fruits Grid list */}
            {fruits.length === 0 ? (
              <div className="text-center py-16 bg-white border border-dashed border-gray-200 rounded-3xl">
                <span>🍀</span>
                <p className="text-xs text-gray-500 mt-2 font-medium">{lang === 'en' ? 'No items in database yet.' : 'ক্যাটালগে কোনো ফল পাওয়া যায়নি।'}</p>
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-gray-700 uppercase font-mono font-black text-[10px] border-b border-gray-100">
                      <tr>
                        <th className="p-4">{lang === 'en' ? 'Fruit Name' : 'ফলের নাম'}</th>
                        <th className="p-4">{lang === 'en' ? 'Category / শ্রেণী' : 'শ্রেণীবিভাগ'}</th>
                        <th className="p-4">{lang === 'en' ? 'Price' : 'মুল্য / ইউনিট'}</th>
                        <th className="p-4">{lang === 'en' ? 'Stock Status' : 'মজুদ (Stock)'}</th>
                        <th className="p-4">{lang === 'en' ? 'Origin' : 'উৎপত্তি'}</th>
                        <th className="p-4 text-center">{lang === 'en' ? 'Actions' : 'অ্যাকশন'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-gray-850">
                      {fruits.map((fruit) => (
                        <tr key={fruit.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center space-x-3">
                              <img 
                                src={fruit.image} 
                                alt={fruit.name} 
                                referrerPolicy="no-referrer"
                                className="w-10 h-10 object-cover rounded-xl border border-gray-100 bg-gray-50"
                              />
                              <div>
                                <span className="font-extrabold text-gray-900 block">{fruit.name}</span>
                                <span className="text-[10px] text-gray-400 font-mono block">{fruit.englishName}</span>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-100">
                              {fruit.category}
                            </span>
                          </td>
                          <td className="p-4 font-mono font-bold text-gray-900">
                            ৳{fruit.price} / {fruit.unit}
                          </td>
                          <td className="p-4 font-mono">
                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${fruit.stock > 10 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                              {fruit.stock} {fruit.unit}
                            </span>
                          </td>
                          <td className="p-4 text-gray-500 font-sans">{fruit.origin}</td>
                          <td className="p-4">
                            <div className="flex items-center justify-center space-x-2">
                              <button
                                onClick={() => openEditProduct(fruit)}
                                className="p-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg cursor-pointer"
                                title="সম্পাদনা"
                              >
                                <Edit3 size={14} />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(fruit.id, fruit.name)}
                                className="p-1.5 bg-red-50 hover:bg-red-100 text-red-650 rounded-lg cursor-pointer"
                                title="মুছে ফেলুন"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab content Orders Management list */}
        {activeTab === 'orders' && (
          <div className="space-y-6 animate-fadeIn print:hidden">
            <div>
              <h3 className="text-base sm:text-lg font-black text-gray-900 font-display">
                📦 {lang === 'en' ? 'Active Orders Flow' : 'গ্রাহকদের সক্রিয় অর্ডার সিস্টেম'}
              </h3>
              <p className="text-xs text-gray-500">{lang === 'en' ? 'Track cash-on-delivery requests, edit statuses, print receipts.' : 'ফোনে কল দিয়ে নিশ্চিত করুন, ইনভয়েস ডাউনলোড/প্রিন্ট করুন এবং হোয়াটসঅ্যাপ অথবা ইমেইলে পাঠিয়ে দিন।'}</p>
            </div>

            {orders.length === 0 ? (
              <div className="text-center py-20 bg-white border border-dashed border-gray-250/70 rounded-3xl">
                <span className="text-4xl block">📦</span>
                <p className="text-xs text-gray-500 font-medium mt-3">{lang === 'en' ? 'No orders recorded yet' : 'কোনো অর্ডার প্লেস করা হয়নি এখনো।'}</p>
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs whitespace-normal sm:whitespace-nowrap">
                    <thead className="bg-slate-50 text-gray-700 uppercase font-mono font-black text-[10px] border-b border-gray-100">
                      <tr>
                        <th className="p-4">{lang === 'en' ? 'Order ID Code' : 'অর্ডার কোড'}</th>
                        <th className="p-4">{lang === 'en' ? 'Customer Details' : 'গ্রাহক তথ্য'}</th>
                        <th className="p-4">{lang === 'en' ? 'Items Purchased' : 'ফল আইটেমসমূহ'}</th>
                        <th className="p-4">{lang === 'en' ? 'Total Payable' : 'সর্বমোট প্রদেয়'}</th>
                        <th className="p-4">{lang === 'en' ? 'Delivery Mode' : 'পেমেন্ট মাধ্যম'}</th>
                        <th className="p-4">{lang === 'en' ? 'Flow Status' : 'অর্ডার স্ট্যাটাস'}</th>
                        <th className="p-4 text-center">{lang === 'en' ? 'Manage/Action' : 'রসিদ ও শেয়ার'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-gray-850">
                      {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="p-4">
                            <span className="font-mono font-extrabold text-red-650 text-xs tracking-wider block">{order.id}</span>
                            <span className="text-[9px] text-gray-400 block font-mono">{order.date}</span>
                          </td>
                          <td className="p-4">
                            <div className="max-w-xs space-y-0.5 whitespace-normal">
                              <span className="font-extrabold text-gray-900 block">{order.details.customerName}</span>
                              <span className="text-[11px] font-mono font-bold text-gray-700 block">{order.details.phone}</span>
                              <p className="text-[10px] text-gray-550 leading-tight">
                                {order.details.address} ({order.details.area})
                              </p>
                              {order.details.notes && (
                                <span className="inline-block text-[9px] bg-amber-50 text-amber-800 font-semibold px-1 rounded-sm mt-0.5 border border-amber-100/40">
                                  📝 {order.details.notes}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="text-[11px] space-y-0.5 max-w-xs whitespace-normal">
                              {order.items.map((item, idx) => (
                                <div key={idx} className="flex justify-between font-medium">
                                  <span>{item.fruit.name} <strong className="text-gray-950 font-mono">x{item.quantity}</strong></span>
                                </div>
                              ))}
                            </div>
                          </td>
                          <td className="p-4 font-mono font-bold text-red-600 text-xs">
                            ৳{order.total}
                          </td>
                          <td className="p-4">
                            <span className="text-[10px] font-black text-gray-650 block">
                              {order.details.paymentMethod}
                            </span>
                            <span className="text-[9px] text-gray-400 font-bold block">{lang === 'en' ? 'Home Delivery' : 'হোম ডেলিভারি'}</span>
                          </td>
                          <td className="p-4">
                            <select
                              value={order.status}
                              onChange={(e) => handleUpdateStatus(order.id, e.target.value as Order['status'])}
                              className={`px-2.5 py-1 text-[10px] font-bold rounded-lg border cursor-pointer focus:outline-hidden ${
                                order.status === 'পেন্ডিং' ? 'bg-red-50 text-red-700 border-red-200' :
                                order.status === 'কনফার্মড' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                order.status === 'ডেলিভারি চলছে' ? 'bg-yellow-50 text-yellow-800 border-yellow-200' :
                                'bg-green-50 text-green-700 border-green-200'
                              }`}
                            >
                              <option value="পেন্ডিং">পেন্ডিং (Pending)</option>
                              <option value="কনফার্মড">কনফার্ম (Confirmed)</option>
                              <option value="ডেলিভারি চলছে">ডেলিভারি চলছে (Shipping)</option>
                              <option value="সম্পূর্ণ">সম্পূর্ণ (Completed)</option>
                            </select>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center justify-center space-x-1 sm:space-x-2">
                              {/* View invoice modal trigger */}
                              <button
                                onClick={() => setSelectedInvoiceOrder(order)}
                                className="flex items-center space-x-1 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-[10px] rounded-lg cursor-pointer transition-colors"
                              >
                                <FileText size={12} />
                                <span>{lang === 'en' ? 'Invoice' : 'রসিদ'}</span>
                              </button>
                              
                              {/* Quick WhatsApp push */}
                              <button
                                onClick={() => handleShareWhatsApp(order)}
                                className="p-1 bg-green-50 hover:bg-green-100 text-green-600 rounded-lg cursor-pointer"
                                title="হোয়াটসঅ্যাপে পাঠান"
                              >
                                <Send size={12} />
                              </button>

                              {/* Quick Email push */}
                              <button
                                onClick={() => handleShareEmail(order)}
                                className="p-1 bg-amber-50 hover:bg-amber-100 text-amber-600 rounded-lg cursor-pointer"
                                title="ইমেইল করুন"
                              >
                                <Mail size={12} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

      </div>

      {/* RENDER INVOICE MODAL POPUP FOR VIEWING, PRINTING, MAILING AND SENDING TO WHATSAPP */}
      <AnimatePresence>
        {selectedInvoiceOrder && (
          <div className="fixed inset-0 z-55 overflow-y-auto font-sans flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedInvoiceOrder(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs print:hidden"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white rounded-3xl shadow-2xl border border-gray-150 max-w-2xl w-full p-6 sm:p-8 flex flex-col max-h-[90vh] overflow-y-auto z-10 print:max-h-none print:shadow-none print:border-none print:p-0"
            >
              {/* Invoice Window Close Controls print:hidden */}
              <div className="flex justify-between items-center pb-4 border-b border-gray-100 mb-6 print:hidden">
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-550 flex items-center space-x-1.5 font-display">
                  <FileText size={16} />
                  <span>{lang === 'en' ? 'Invoice Preview' : 'চালানের রশিদ ও চালানপত্র'}</span>
                </h3>
                <button
                  onClick={() => setSelectedInvoiceOrder(null)}
                  className="p-1 text-gray-400 hover:text-black hover:bg-gray-100 rounded-lg cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Printable Area content template */}
              <div id="invoice-printable" className="space-y-6 font-sans text-gray-900 leading-relaxed print:block">
                
                {/* Invoice Letterhead Header */}
                <div className="flex justify-between items-start border-b border-gray-200 pb-5">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-3xl">🍒</span>
                      <strong className="text-xl sm:text-2xl font-black bg-gradient-to-r from-emerald-800 to-amber-600 bg-clip-text text-transparent font-display">
                        {lang === 'en' ? 'Seasonal Fruit Shop' : 'সিজনাল ফল বিপণি'}
                      </strong>
                    </div>
                    <p className="text-[10px] text-gray-500 font-medium">
                      {lang === 'en' ? '100% Raw Formalin Free Orchard Nutrition' : '১০০% তাজা, রসালো ও রাসায়নিকমুক্ত সরাসরি বাগান পাকা ফলের বিশ্বস্ত আড়ত'}
                    </p>
                    <p className="text-[10px] text-gray-400 font-medium">
                      📍 পাবনা সদর হাব, রাজশাহী বিভাগ, বাংলাদেশ | 📞 হটলাইন: 01786-803899
                    </p>
                  </div>

                  <div className="text-right space-y-1">
                    <h2 className="text-md sm:text-xl font-black text-gray-950 font-display">
                      {lang === 'en' ? 'RETAIL INVOICE' : 'খুচরা বিক্রয় রসিদ'}
                    </h2>
                    <span className="text-[10px] font-black text-red-650 font-mono block tracking-wider uppercase bg-red-50 px-2 py-0.5 rounded-md inline-block">
                      ID: {selectedInvoiceOrder.id}
                    </span>
                    <span className="text-[10px] text-gray-400 block font-mono">Date: {selectedInvoiceOrder.date}</span>
                  </div>
                </div>

                {/* Recipient breakdown panels */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-gray-100">
                  <div className="space-y-1.5 text-xs">
                    <h4 className="text-[10px] uppercase font-mono font-black text-gray-400 tracking-wider">
                      {lang === 'en' ? 'BILL TO / প্রাপক:' : 'গ্রাহকের বিস্তারিত:'}
                    </h4>
                    <span className="text-sm font-black text-deep-blue block">{selectedInvoiceOrder.details.customerName}</span>
                    <span className="block font-mono font-bold text-gray-700">📞 {selectedInvoiceOrder.details.phone}</span>
                    <p className="text-gray-650 leading-relaxed">
                      🏠 {selectedInvoiceOrder.details.address} ({selectedInvoiceOrder.details.area})
                    </p>
                    {selectedInvoiceOrder.details.email && (
                      <span className="text-[10px] text-gray-400 font-mono block">📧 {selectedInvoiceOrder.details.email}</span>
                    )}
                  </div>

                  <div className="space-y-1.5 text-xs text-left sm:text-right">
                    <h4 className="text-[10px] uppercase font-mono font-black text-gray-400 tracking-wider">
                      {lang === 'en' ? 'SHIPPING & PAYMENT:' : 'ডেলিভারি এবং পেমেন্ট:'}
                    </h4>
                    <p className="text-gray-750">
                      📬 {lang === 'en' ? 'Method: Smart Hand-to-Hand Delivery' : 'ডেলিভারি ধরন: হোম ডেলিভারি'}
                    </p>
                    <p className="text-gray-755 font-bold">
                      💳 {lang === 'en' ? 'Payment: ' : 'পেমেন্ট মাধ্যম: '}{selectedInvoiceOrder.details.paymentMethod}
                    </p>
                    <span className={`inline-block py-0.5 px-2.5 rounded-lg text-[10px] font-bold ${
                      selectedInvoiceOrder.status === 'সম্পূর্ণ' ? 'bg-green-100 text-green-800' :
                      selectedInvoiceOrder.status === 'ডেলিভারি চলছে' ? 'bg-yellow-100 text-yellow-800' :
                      selectedInvoiceOrder.status === 'কনফার্মড' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      👑 {lang === 'en' ? 'Status: ' : 'স্ট্যাটাস: '}{selectedInvoiceOrder.status}
                    </span>
                  </div>
                </div>

                {/* Products breakdown table */}
                <div className="space-y-3">
                  <table className="w-full text-left text-xs border border-gray-100 rounded-lg overflow-hidden">
                    <thead className="bg-slate-50 border-b border-gray-100 font-bold">
                      <tr>
                        <th className="p-3 text-gray-550">{lang === 'en' ? 'Fruits Item Name' : 'ক্রয়কৃত ফলের নাম'}</th>
                        <th className="p-3 text-right text-gray-550">{lang === 'en' ? 'Price' : 'দাম'}</th>
                        <th className="p-3 text-center text-gray-550">{lang === 'en' ? 'Quantity' : 'পরিমাণ'}</th>
                        <th className="p-3 text-right text-gray-550">{lang === 'en' ? 'Subtotal' : 'উপমোট'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {selectedInvoiceOrder.items.map((item, idx) => (
                        <tr key={idx} className="font-sans">
                          <td className="p-3">
                            <span className="font-extrabold text-gray-850 block">{item.fruit.name}</span>
                            <span className="text-[10px] text-gray-400 block font-mono">{item.fruit.englishName}</span>
                          </td>
                          <td className="p-3 text-right font-mono text-gray-700">৳{item.fruit.price} / {item.fruit.unit}</td>
                          <td className="p-3 text-center font-mono font-extrabold">{item.quantity} {item.fruit.unit}</td>
                          <td className="p-3 text-right font-mono font-bold text-gray-900">৳{item.fruit.price * item.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pricing Summary Breakdown */}
                <div className="flex justify-end pt-2">
                  <div className="w-full sm:w-[320px] bg-slate-50 p-4 border border-gray-100 rounded-2xl space-y-2 text-xs">
                    <div className="flex justify-between text-gray-500">
                      <span>{lang === 'en' ? 'Subtotal / ফলের মোট মূল্য:' : 'ফলের উপমোট মূল্য:'}</span>
                      <strong className="font-mono text-gray-800">৳{selectedInvoiceOrder.subtotal}</strong>
                    </div>
                    <div className="flex justify-between text-gray-500">
                      <span>{lang === 'en' ? 'Delivery Fee / ডেলিভারি চার্জ:' : 'ডেলিভারি সেবামূল্য:'}</span>
                      <strong className="font-mono text-gray-800">৳{selectedInvoiceOrder.deliveryFee}</strong>
                    </div>
                    <div className="flex justify-between border-t border-dashed border-gray-300 pt-2 text-red-600 font-mono text-sm sm:text-base font-black">
                      <span>{lang === 'en' ? 'Grand Total / সর্বমোট মূল্য:' : 'সর্বমোট পরিশোধযোগ্য:'}</span>
                      <span>৳{selectedInvoiceOrder.total}</span>
                    </div>
                  </div>
                </div>

                {/* Footer terms / signatures */}
                <div className="grid grid-cols-2 pt-10 border-t border-dashed border-gray-200">
                  <div className="text-xs space-y-0.5 text-gray-400">
                    <p className="font-bold text-gray-600">{lang === 'en' ? 'Important Notice:' : 'গুরুত্বপূর্ণ সেবামূল্য নোটিশ:'}</p>
                    <p className="text-[10px] leading-snug">{lang === 'en' ? 'Fresh fruits should be unpacked and verified in presence of the delivery person.' : 'ফল হোম ডেলিভারি পাওয়ার পর দয়া করে কুরিয়ারের সামনেই চেক করে নিন। কোনো ড্যামেজ থাকলে হটলাইনে কল করুন।'}</p>
                  </div>
                  <div className="text-right flex flex-col justify-end items-end space-y-1">
                    <div className="h-12 w-24 border-b border-gray-300 flex items-center justify-center text-gray-300 text-[10px] italic">
                      {lang === 'en' ? 'Signature' : 'হস্তাক্ষর'}
                    </div>
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block">{lang === 'en' ? 'Authorized Representative' : 'সিজনাল ফল কর্তৃপক্ষ'}</span>
                  </div>
                </div>

              </div>

              {/* Action Buttons for PDF/Print, WhatsApp and Mail exports print:hidden */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-100 print:hidden">
                <button
                  onClick={handlePrint}
                  className="flex-1 py-3 bg-slate-900 hover:bg-black text-white font-bold rounded-xl flex items-center justify-center space-x-2 text-xs transition-colors cursor-pointer shadow-md"
                >
                  <Printer size={16} />
                  <span>{lang === 'en' ? '🖨️ Print Invoice' : '🖨️ চালান রশিদ প্রিন্ট করুন'}</span>
                </button>
                <button
                  onClick={() => handleShareWhatsApp(selectedInvoiceOrder)}
                  className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl flex items-center justify-center space-x-2 text-xs transition-colors cursor-pointer shadow-md"
                >
                  <Send size={16} />
                  <span>{lang === 'en' ? 'Send via WhatsApp' : '💬 হোয়াটসঅ্যাপে পাঠান'}</span>
                </button>
                <button
                  onClick={() => handleShareEmail(selectedInvoiceOrder)}
                  className="flex-1 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl flex items-center justify-center space-x-2 text-xs transition-colors cursor-pointer shadow-md"
                >
                  <Mail size={16} />
                  <span>{lang === 'en' ? 'Email Invoice to Customer' : '📧 কাস্টমারকে ইমেইল করুন'}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* RENDER PRODUCT FORM DYNAMIC MODAL (ADD / EDIT FRUIT) */}
      <AnimatePresence>
        {isProductModalOpen && (
          <div className="fixed inset-0 z-55 overflow-y-auto font-sans flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsProductModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white rounded-3xl shadow-2xl border border-gray-150 max-w-lg w-full p-6 sm:p-8 flex flex-col max-h-[90vh] overflow-y-auto z-10"
            >
              <div className="flex justify-between items-center pb-4 border-b border-gray-100 mb-6">
                <h3 className="text-base sm:text-lg font-black text-gray-900 font-display">
                  {editingFruit 
                    ? (lang === 'en' ? `Edit Product: ${editingFruit.name}` : `পণ্য সম্পাদনা: ${editingFruit.name}`) 
                    : (lang === 'en' ? 'Add New Fruit' : 'নতুন তাজা ফল সংযুক্ত করুন')
                  }
                </h3>
                <button
                  onClick={() => setIsProductModalOpen(false)}
                  className="p-1 text-gray-400 hover:text-black hover:bg-gray-100 rounded-lg cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleProductSubmit} className="space-y-4 text-xs sm:text-xs">
                {/* ID Input */}
                <div className="grid grid-cols-1 gap-2">
                  <label className="font-extrabold text-gray-700">{lang === 'en' ? 'Product Unique ID' : 'Unique ID (ইংরেজি, হাইফেন দিয়ে লিখুন, যেমন: mango-langra)'}</label>
                  <input
                    type="text"
                    required
                    disabled={!!editingFruit}
                    value={productForm.id}
                    onChange={(e) => setProductForm(prev => ({ ...prev, id: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:ring-2 focus:ring-red-500 bg-gray-50 font-mono disabled:opacity-60"
                    placeholder="e.g. litchi-local"
                  />
                </div>

                {/* Name Bengali and English inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-extrabold text-gray-700">{lang === 'en' ? 'Bengali Name *' : 'ফলের বাংলা নাম *'}</label>
                    <input
                      type="text"
                      required
                      value={productForm.name}
                      onChange={(e) => setProductForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:ring-2 focus:ring-red-500 bg-gray-50"
                      placeholder="যেমন: ল্যাংড়া আম"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-extrabold text-gray-700">{lang === 'en' ? 'English Name *' : 'ফলের ইংরেজি নাম *'}</label>
                    <input
                      type="text"
                      required
                      value={productForm.englishName}
                      onChange={(e) => setProductForm(prev => ({ ...prev, englishName: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:ring-2 focus:ring-red-500 bg-gray-50"
                      placeholder="e.g. Langra Mango"
                    />
                  </div>
                </div>

                {/* Price, Unit, Category and Stock */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="space-y-1">
                    <label className="font-extrabold text-gray-700">{lang === 'en' ? 'Price (BDT) *' : 'মূল্য (টাকা) *'}</label>
                    <input
                      type="number"
                      required
                      value={productForm.price}
                      onChange={(e) => setProductForm(prev => ({ ...prev, price: Number(e.target.value) }))}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:ring-2 focus:ring-red-500 bg-gray-50 font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-extrabold text-gray-700">{lang === 'en' ? 'Unit *' : 'ইউনিট *'}</label>
                    <select
                      value={productForm.unit}
                      onChange={(e) => setProductForm(prev => ({ ...prev, unit: e.target.value as UnitType }))}
                      className="w-full px-2 py-2.5 rounded-xl border border-gray-200 bg-white"
                    >
                      <option value="কেজি">কেজি (kg)</option>
                      <option value="ডজন">ডজন (dozen)</option>
                      <option value="খাঁচি">খাঁচি (crate)</option>
                      <option value="পিস">পিস (piece)</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="font-extrabold text-gray-700">{lang === 'en' ? 'Stock *' : 'মজুদ সংখ্যা *'}</label>
                    <input
                      type="number"
                      required
                      value={productForm.stock}
                      onChange={(e) => setProductForm(prev => ({ ...prev, stock: Number(e.target.value) }))}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:ring-2 focus:ring-red-500 bg-gray-50 font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-extrabold text-gray-700">{lang === 'en' ? 'Category *' : 'মৌসুমী ধরণ *'}</label>
                    <select
                      value={productForm.category}
                      onChange={(e) => setProductForm(prev => ({ ...prev, category: e.target.value as any }))}
                      className="w-full px-2 py-2.5 rounded-xl border border-gray-200 bg-white"
                    >
                      <option value="গ্রীষ্মকালীন">গ্রীষ্মকালীন (Summer)</option>
                      <option value="শীতকালীন">শীতকালীন (Winter)</option>
                      <option value="বারোমাসি">বারোমাসি (All Season)</option>
                    </select>
                  </div>
                </div>

                {/* Image URL with instruction/placeholder advice */}
                <div className="space-y-1">
                  <label className="font-extrabold text-gray-700">{lang === 'en' ? 'Product Image URL' : 'ফলের ছবির লিংক (Image URL)'}</label>
                  <input
                    type="url"
                    value={productForm.image}
                    onChange={(e) => setProductForm(prev => ({ ...prev, image: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:ring-2 focus:ring-red-500 bg-gray-50 font-mono"
                    placeholder="https://images.unsplash.com/photo-..."
                  />
                  <span className="text-[10px] text-gray-400 block mt-1">💡 Unsplash, Imgur বা যেকোনো ওয়েব ইমেজ লিংক দিন (formatted correctly).</span>
                </div>

                {/* Origin details */}
                <div className="space-y-1">
                  <label className="font-extrabold text-gray-700">{lang === 'en' ? 'Origin Landmark' : 'উৎপত্তিস্থল / এলাকা'}</label>
                  <input
                    type="text"
                    value={productForm.origin}
                    onChange={(e) => setProductForm(prev => ({ ...prev, origin: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:ring-2 focus:ring-red-500 bg-gray-50"
                    placeholder="যেমন: ঈশ্বরদী, পাবনা"
                  />
                </div>

                {/* Fruits Description text */}
                <div className="space-y-1">
                  <label className="font-extrabold text-gray-700">{lang === 'en' ? 'Description' : 'ফলের সংক্ষিপ্ত বর্ণনা (Description)'}</label>
                  <textarea
                    value={productForm.description}
                    onChange={(e) => setProductForm(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:ring-2 focus:ring-red-500 bg-gray-50"
                    rows={2}
                    placeholder="যেমন: ১০০% তাজা ও মিষ্টি আম..."
                  />
                </div>

                {/* Popularity and Organic check buttons */}
                <div className="flex space-x-6 pt-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={productForm.isOrganic !== false}
                      onChange={(e) => setProductForm(prev => ({ ...prev, isOrganic: e.target.checked }))}
                    />
                    <span className="font-bold text-gray-700">{lang === 'en' ? '100% Organic' : 'অনন্য অর্গানিক ফল'}</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!!productForm.isPopular}
                      onChange={(e) => setProductForm(prev => ({ ...prev, isPopular: e.target.checked }))}
                    />
                    <span className="font-bold text-gray-700">{lang === 'en' ? 'Popular / Hot Deal' : 'জনপ্রিয় ফলের তালিকায় রাখুন'}</span>
                  </label>
                </div>

                {/* Submit button controls */}
                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsProductModalOpen(false)}
                    className="flex-1 py-3 bg-gray-150 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-center cursor-pointer"
                  >
                    {lang === 'en' ? 'Cancel' : 'বাতিল'}
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-center cursor-pointer"
                  >
                    🚀 {lang === 'en' ? 'Save Product' : 'পণ্যটি সেভ করুন'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
