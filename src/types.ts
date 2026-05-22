export type UnitType = 'কেজি' | 'ডজন' | 'খাঁচি' | 'পিস';

export interface Fruit {
  id: string;
  name: string;
  englishName: string;
  description: string;
  price: number;
  unit: UnitType;
  image: string;
  category: 'গ্রীষ্মকালীন' | 'শীতকালীন' | 'বারোমাসি';
  rating: number;
  stock: number;
  benefits: string[];
  origin: string;
  vitamins: string[];
  isOrganic: boolean;
  isPopular?: boolean;
}

export interface CartItem {
  fruit: Fruit;
  quantity: number;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
}

export interface OrderDetails {
  customerName: string;
  phone: string;
  email?: string;
  address: string;
  area: 'পাবনা সদর' | 'ঈশ্বরদী' | 'বেড়া' | 'চাটমোহর' | 'সুজানগর' | 'ঢাকা (কুরিয়ার)' | 'অন্যান্য জেলা (কুরিয়ার)';
  paymentMethod: 'ক্যাশ অন ডেলিভারি' | 'বিকাশ / রকেট / নগদ (অগ্রিম)';
  notes?: string;
}

export interface Order {
  id: string;
  details: OrderDetails;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: 'পেন্ডিং' | 'কনফার্মড' | 'ডেলিভারি চলছে' | 'সম্পূর্ণ';
  date: string;
}
