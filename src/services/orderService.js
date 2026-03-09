import {
    collection,
    addDoc,
    query,
    where,
    getDocs,
    doc,
    updateDoc,
    serverTimestamp,
    orderBy,
    getDoc,
} from 'firebase/firestore';
import { db } from '../firebase';

const ORDERS_COLLECTION = 'orders';

/**
 * Status step mapping
 * 1 = DiCuci, 2 = DiSetrika, 3 = DiPacking,
 * 4 = Selesai, 5 = DiAntar, 6 = DiTerima
 */
export const STATUS_LABELS = {
    1: 'DiCuci',
    2: 'DiSetrika',
    3: 'DiPacking',
    4: 'Selesai',
    5: 'DiAntar',
    6: 'DiTerima',
};

export const STATUS_MESSAGES = {
    1: 'Baju kamu lagi mandi nih, biar makin kinclong! tsayy ✨',
    2: 'Lagi disetrika biar rapi maksimal!',
    3: 'Sedang dikemas dengan rapi dan wangi.',
    4: 'Cucian sudah selesai dan siap diambil!',
    5: 'Sedang dalam perjalanan menuju alamatmu.',
    6: 'Cucian sudah diterima. Terima kasih! 🎉',
};

/**
 * Buat order baru di Firestore
 * @param {Object} data - { tracking_number, customer_name, weight, total_price, status_step }
 * @returns {Promise<string>} - document ID
 */
export async function createOrder(data) {
    const orderRef = await addDoc(collection(db, ORDERS_COLLECTION), {
        tracking_number: data.tracking_number,
        customer_name: data.customer_name,
        weight: Number(data.weight),
        total_price: Number(data.total_price),
        status_step: Number(data.status_step) || 1,
        created_at: serverTimestamp(),
    });

    // Buat timeline entry pertama
    await addDoc(collection(db, ORDERS_COLLECTION, orderRef.id, 'timeline'), {
        message: `Pesanan diterima oleh Washy Sushy Central Hub.`,
        timestamp: serverTimestamp(),
    });

    return orderRef.id;
}

/**
 * Ambil order berdasarkan tracking_number
 * @param {string} trackingNumber
 * @returns {Promise<Object|null>} - order data dengan id dan timeline, atau null
 */
export async function getOrderByTrackingNumber(trackingNumber) {
    const q = query(
        collection(db, ORDERS_COLLECTION),
        where('tracking_number', '==', trackingNumber.toUpperCase().trim())
    );

    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;

    const docSnap = snapshot.docs[0];
    const data = { id: docSnap.id, ...docSnap.data() };

    // Ambil timeline subcollection, urutkan dari terbaru
    const timelineRef = collection(db, ORDERS_COLLECTION, docSnap.id, 'timeline');
    const timelineQuery = query(timelineRef, orderBy('timestamp', 'desc'));
    const timelineSnap = await getDocs(timelineQuery);

    data.timeline = timelineSnap.docs.map((t) => ({
        id: t.id,
        ...t.data(),
        timestamp: t.data().timestamp?.toDate() || new Date(),
    }));

    return data;
}

/**
 * Update status_step order dan tambah log ke timeline
 * @param {string} docId - Firestore document ID
 * @param {number} newStep - Status step baru (1-6)
 */
export async function updateOrderStatus(docId, newStep) {
    const orderRef = doc(db, ORDERS_COLLECTION, docId);
    await updateDoc(orderRef, {
        status_step: Number(newStep),
    });

    // Tambah entri timeline
    await addDoc(collection(db, ORDERS_COLLECTION, docId, 'timeline'), {
        message: `Status diperbarui: ${STATUS_MESSAGES[newStep]}`,
        timestamp: serverTimestamp(),
    });
}

/**
 * Ambil semua order (untuk Admin Dashboard)
 * @returns {Promise<Array>}
 */
export async function getAllOrders() {
    const q = query(collection(db, ORDERS_COLLECTION), orderBy('created_at', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}
