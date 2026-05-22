import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  getDocs, 
  doc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  serverTimestamp
} from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { Fruit, Order } from '../types';
import { FRUITS_DATA } from '../data';

// Your web app's Firebase configuration coordinates shared by you
const firebaseConfig = {
  apiKey: "AIzaSyD-l-Puzm7OHPAV5yGN08xvP2-MHM-ZARw",
  authDomain: "seasonal-fruits-pabna.firebaseapp.com",
  projectId: "seasonal-fruits-pabna",
  storageBucket: "seasonal-fruits-pabna.firebasestorage.app",
  messagingSenderId: "521954069341",
  appId: "1:521954069341:web:420e53967f6e1808eb36b4",
  measurementId: "G-2NMMRQE1K5"
};

// Safely initialize Firebase client with try-catch to prevent blank screens
let app: any = null;
let db: any = null;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  
  // Safely check if Google Analytics is supported in this environment (e.g. offline, iframe, or gh-pages)
  if (typeof window !== 'undefined') {
    isSupported().then((supported) => {
      if (supported) {
        getAnalytics(app);
      }
    }).catch((analyticsError) => {
      console.warn('Analytics initialization failed safely:', analyticsError);
    });
  }
} catch (error) {
  console.warn('Firebase was unable to initialize in this browser environment:', error);
}

export { db };

// Collection keys
const FRUITS_COLLECTION = 'fruits';
const ORDERS_COLLECTION = 'orders';

/**
 * Ensures fruits exist in Firestore. Seeds database with default data if empty.
 */
export async function seedFruitsCollectionIfEmpty(): Promise<Fruit[]> {
  try {
    if (!db) {
      throw new Error('Database is not initialized.');
    }
    const colRef = collection(db, FRUITS_COLLECTION);
    const snapshot = await getDocs(colRef);
    
    if (snapshot.empty) {
      console.log('Firestore fruits collection is empty. Seeding defaults...');
      const promises = FRUITS_DATA.map(async (fruit) => {
        const docRef = doc(db, FRUITS_COLLECTION, fruit.id);
        await setDoc(docRef, {
          ...fruit,
          createdAt: serverTimestamp()
        });
      });
      await Promise.all(promises);
      return FRUITS_DATA;
    } else {
      const liveFruits: Fruit[] = [];
      snapshot.forEach((d) => {
        liveFruits.push(d.data() as Fruit);
      });
      return liveFruits;
    }
  } catch (error) {
    console.warn('Failed to seed or fetch from Firestore fruits collection. Falling back to static data.', error);
    return FRUITS_DATA;
  }
}

/**
 * Fetch all fruits from Firestore
 */
export async function fetchAllFruits(): Promise<Fruit[]> {
  try {
    if (!db) {
      throw new Error('Database is not initialized.');
    }
    const colRef = collection(db, FRUITS_COLLECTION);
    const snapshot = await getDocs(colRef);
    if (snapshot.empty) {
      return await seedFruitsCollectionIfEmpty();
    }
    const fruits: Fruit[] = [];
    snapshot.forEach((d) => {
      const data = d.data();
      fruits.push({
        id: d.id,
        name: data.name || '',
        englishName: data.englishName || '',
        description: data.description || '',
        price: Number(data.price) || 0,
        unit: data.unit || 'কেজি',
        image: data.image || '',
        category: data.category || 'সব ফল',
        rating: Number(data.rating) || 5,
        stock: Number(data.stock) || 0,
        benefits: Array.isArray(data.benefits) ? data.benefits : [],
        origin: data.origin || '',
        vitamins: Array.isArray(data.vitamins) ? data.vitamins : [],
        isOrganic: data.isOrganic !== false,
        isPopular: !!data.isPopular
      } as Fruit);
    });
    return fruits;
  } catch (error) {
    console.error('Error fetching fruits from Firestore:', error);
    return FRUITS_DATA; // Fallback
  }
}

/**
 * Add or Save a Fruit
 */
export async function saveFruit(fruit: Fruit): Promise<void> {
  try {
    if (!db) {
      throw new Error('Database is not initialized.');
    }
    const docRef = doc(db, FRUITS_COLLECTION, fruit.id);
    await setDoc(docRef, {
      ...fruit,
      updatedAt: serverTimestamp()
    }, { merge: true });
  } catch (error) {
    console.error('Error saving fruit to Firestore:', error);
    throw error;
  }
}

/**
 * Delete a Fruit
 */
export async function deleteFruitDoc(id: string): Promise<void> {
  try {
    if (!db) {
      throw new Error('Database is not initialized.');
    }
    const docRef = doc(db, FRUITS_COLLECTION, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting fruit from Firestore:', error);
    throw error;
  }
}

/**
 * Fetch all orders from Firestore
 */
export async function fetchAllOrders(): Promise<Order[]> {
  try {
    if (!db) {
      throw new Error('Database is not initialized.');
    }
    const colRef = collection(db, ORDERS_COLLECTION);
    const snapshot = await getDocs(colRef);
    const orders: Order[] = [];
    snapshot.forEach((d) => {
      const data = d.data();
      orders.push({
        id: d.id,
        ...data
      } as Order);
    });
    // Sort by date or id descending
    return orders.sort((a, b) => b.id.localeCompare(a.id));
  } catch (error) {
    console.error('Error fetching orders from Firestore:', error);
    return [];
  }
}

/**
 * Save / Create an Order
 */
export async function saveOrder(order: Order): Promise<void> {
  try {
    if (!db) {
      throw new Error('Database is not initialized.');
    }
    const docRef = doc(db, ORDERS_COLLECTION, order.id);
    await setDoc(docRef, {
      ...order,
      createdAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error saving order to Firestore:', error);
    throw error;
  }
}

/**
 * Update Order status
 */
export async function updateOrderStatus(orderId: string, status: Order['status']): Promise<void> {
  try {
    if (!db) {
      throw new Error('Database is not initialized.');
    }
    const docRef = doc(db, ORDERS_COLLECTION, orderId);
    await updateDoc(docRef, { status });
  } catch (error) {
    console.error('Error updating order status in Firestore:', error);
    throw error;
  }
}
