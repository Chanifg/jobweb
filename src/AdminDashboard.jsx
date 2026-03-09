import React, { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';
import {
    createOrder,
    getAllOrders,
    updateOrderStatus,
    STATUS_LABELS,
    STATUS_MESSAGES,
} from './services/orderService';

function formatRupiah(num) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
}

function formatDate(timestamp) {
    if (!timestamp) return '-';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

const STEP_OPTIONS = Object.entries(STATUS_LABELS).map(([k, v]) => ({ value: k, label: v }));

const defaultForm = {
    tracking_number: '',
    customer_name: '',
    weight: '',
    total_price: '',
    status_step: '1',
};

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [form, setForm] = useState(defaultForm);
    const [formLoading, setFormLoading] = useState(false);
    const [formSuccess, setFormSuccess] = useState('');
    const [formError, setFormError] = useState('');
    const [ordersLoading, setOrdersLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState(null);
    const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'new'

    async function fetchOrders() {
        setOrdersLoading(true);
        try {
            const data = await getAllOrders();
            setOrders(data);
        } catch (e) {
            console.error(e);
        } finally {
            setOrdersLoading(false);
        }
    }

    useEffect(() => { fetchOrders(); }, []);

    async function handleLogout() {
        await signOut(auth);
        navigate('/login');
    }

    async function handleCreateOrder(e) {
        e.preventDefault();
        setFormError('');
        setFormSuccess('');
        setFormLoading(true);
        try {
            await createOrder(form);
            setFormSuccess(`Order "${form.tracking_number.toUpperCase()}" berhasil dibuat!`);
            setForm(defaultForm);
            fetchOrders();
            setTimeout(() => { setActiveTab('orders'); setFormSuccess(''); }, 1500);
        } catch (err) {
            setFormError('Gagal membuat order. Cek console untuk detail.');
            console.error(err);
        } finally {
            setFormLoading(false);
        }
    }

    async function handleUpdateStatus(docId, newStep) {
        setUpdatingId(docId);
        try {
            await updateOrderStatus(docId, newStep);
            setOrders((prev) => prev.map((o) => o.id === docId ? { ...o, status_step: Number(newStep) } : o));
        } catch (e) {
            alert('Gagal update status.');
            console.error(e);
        } finally {
            setUpdatingId(null);
        }
    }

    return (
        <div className="min-h-screen bg-background-light font-sans">
            {/* Top Bar */}
            <header className="bg-white border-b border-gray-100 shadow-sm px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-brand-yellow rounded-xl flex items-center justify-center">
                        <span className="material-symbols-outlined text-brand-text text-xl">local_laundry_service</span>
                    </div>
                    <div>
                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Admin Panel</p>
                        <p className="text-base font-extrabold text-brand-text leading-none">Washy Sushy</p>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-red-500 transition-colors px-4 py-2 rounded-xl hover:bg-red-50"
                >
                    <span className="material-symbols-outlined text-base">logout</span>
                    Keluar
                </button>
            </header>

            <main className="max-w-6xl mx-auto px-4 py-8">
                {/* Tabs */}
                <div className="flex gap-2 mb-8 bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100 w-fit">
                    <button
                        onClick={() => setActiveTab('orders')}
                        className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'orders' ? 'bg-brand-yellow text-brand-text shadow-sm' : 'text-gray-500 hover:text-brand-text'}`}
                    >
                        <span className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-base">list_alt</span>
                            Semua Order ({orders.length})
                        </span>
                    </button>
                    <button
                        onClick={() => setActiveTab('new')}
                        className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'new' ? 'bg-brand-yellow text-brand-text shadow-sm' : 'text-gray-500 hover:text-brand-text'}`}
                    >
                        <span className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-base">add_circle</span>
                            Input Order Baru
                        </span>
                    </button>
                </div>

                {/* Tab: Input Order Baru */}
                {activeTab === 'new' && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-2xl">
                        <h2 className="text-xl font-extrabold text-brand-text mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-brand-yellow">add_circle</span>
                            Input Order Baru
                        </h2>
                        <form onSubmit={handleCreateOrder} className="space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-semibold text-brand-text mb-1.5">Nomor Lacak *</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="WS-2026-001"
                                        value={form.tracking_number}
                                        onChange={(e) => setForm({ ...form, tracking_number: e.target.value.toUpperCase() })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow text-brand-text placeholder-gray-400 transition font-mono"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-brand-text mb-1.5">Nama Pelanggan *</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Nama lengkap pelanggan"
                                        value={form.customer_name}
                                        onChange={(e) => setForm({ ...form, customer_name: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow text-brand-text placeholder-gray-400 transition"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-brand-text mb-1.5">Berat (kg) *</label>
                                    <input
                                        type="number"
                                        required
                                        min="1"
                                        step="0.5"
                                        placeholder="2.5"
                                        value={form.weight}
                                        onChange={(e) => setForm({ ...form, weight: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow text-brand-text placeholder-gray-400 transition"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-brand-text mb-1.5">Total Harga (Rp) *</label>
                                    <input
                                        type="number"
                                        required
                                        min="0"
                                        placeholder="20000"
                                        value={form.total_price}
                                        onChange={(e) => setForm({ ...form, total_price: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow text-brand-text placeholder-gray-400 transition"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-brand-text mb-1.5">Status Awal</label>
                                <select
                                    value={form.status_step}
                                    onChange={(e) => setForm({ ...form, status_step: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow text-brand-text transition bg-white"
                                >
                                    {STEP_OPTIONS.map((s) => (
                                        <option key={s.value} value={s.value}>{s.value}. {s.label}</option>
                                    ))}
                                </select>
                            </div>

                            {formError && (
                                <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
                                    <span className="material-symbols-outlined text-base">error</span>
                                    {formError}
                                </div>
                            )}
                            {formSuccess && (
                                <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-xl">
                                    <span className="material-symbols-outlined text-base">check_circle</span>
                                    {formSuccess}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={formLoading}
                                className="w-full bg-brand-yellow hover:bg-yellow-400 text-brand-text font-extrabold py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {formLoading ? (
                                    <><span className="material-symbols-outlined animate-spin">refresh</span> Menyimpan...</>
                                ) : (
                                    <><span className="material-symbols-outlined">save</span> Simpan Order</>
                                )}
                            </button>
                        </form>
                    </div>
                )}

                {/* Tab: Semua Order */}
                {activeTab === 'orders' && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
                            <h2 className="text-xl font-extrabold text-brand-text flex items-center gap-2">
                                <span className="material-symbols-outlined text-brand-yellow">list_alt</span>
                                Daftar Pesanan
                            </h2>
                            <button onClick={fetchOrders} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-text transition font-semibold px-3 py-1.5 rounded-lg hover:bg-gray-50">
                                <span className="material-symbols-outlined text-base">refresh</span>
                                Refresh
                            </button>
                        </div>

                        {ordersLoading ? (
                            <div className="flex items-center justify-center py-20 text-gray-400">
                                <span className="material-symbols-outlined animate-spin text-4xl text-brand-yellow">refresh</span>
                            </div>
                        ) : orders.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                                <span className="material-symbols-outlined text-5xl mb-3">inbox</span>
                                <p className="font-semibold">Belum ada pesanan</p>
                                <p className="text-sm">Buat order pertama via tab "Input Order Baru"</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-gray-50 border-b border-gray-100">
                                            <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">No. Lacak</th>
                                            <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Pelanggan</th>
                                            <th className="text-left px-4 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Berat</th>
                                            <th className="text-left px-4 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Harga</th>
                                            <th className="text-left px-4 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Tgl Masuk</th>
                                            <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Update Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {orders.map((order) => (
                                            <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <span className="font-mono font-bold text-primary">{order.tracking_number}</span>
                                                </td>
                                                <td className="px-6 py-4 font-semibold text-brand-text">{order.customer_name}</td>
                                                <td className="px-4 py-4 text-brand-darkgrey">{order.weight} kg</td>
                                                <td className="px-4 py-4 text-brand-darkgrey">{formatRupiah(order.total_price)}</td>
                                                <td className="px-4 py-4 text-brand-darkgrey text-xs">{formatDate(order.created_at)}</td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <select
                                                            defaultValue={order.status_step}
                                                            onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                                                            disabled={updatingId === order.id}
                                                            className="border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-semibold text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-yellow bg-white transition disabled:opacity-50"
                                                        >
                                                            {STEP_OPTIONS.map((s) => (
                                                                <option key={s.value} value={s.value}>{s.value}. {s.label}</option>
                                                            ))}
                                                        </select>
                                                        {updatingId === order.id && (
                                                            <span className="material-symbols-outlined animate-spin text-brand-yellow text-base">refresh</span>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}
