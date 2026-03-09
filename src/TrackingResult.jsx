import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOrderByTrackingNumber, STATUS_LABELS, STATUS_MESSAGES } from './services/orderService';

const STEPS = [
    { step: 1, icon: 'dry_cleaning', label: 'DiCuci' },
    { step: 2, icon: 'iron', label: 'DiSetrika' },
    { step: 3, icon: 'inventory_2', label: 'DiPacking' },
    { step: 4, icon: 'check_circle', label: 'Selesai' },
    { step: 5, icon: 'local_shipping', label: 'DiAntar' },
    { step: 6, icon: 'handshake', label: 'DiTerima' },
];

function formatDate(ts) {
    if (!ts) return '-';
    const d = ts instanceof Date ? ts : ts.toDate?.() || new Date(ts);
    return d.toLocaleString('id-ID', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
    });
}

function formatRupiah(num) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
}

export default function TrackingResult() {
    const { trackingNumber } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        if (!trackingNumber) {
            navigate('/');
            return;
        }
        setLoading(true);
        setNotFound(false);
        setOrder(null);

        getOrderByTrackingNumber(trackingNumber)
            .then((data) => {
                if (!data) {
                    setNotFound(true);
                } else {
                    setOrder(data);
                }
            })
            .catch((err) => {
                console.error(err);
                setNotFound(true);
            })
            .finally(() => setLoading(false));
    }, [trackingNumber, navigate]);

    // ── Loading State ──────────────────────────────────────────────
    if (loading) {
        return (
            <div className="min-h-screen bg-background-light flex flex-col items-center justify-center gap-4">
                <div className="w-16 h-16 bg-brand-yellow rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="material-symbols-outlined text-brand-text text-3xl animate-spin">refresh</span>
                </div>
                <p className="font-bold text-brand-text">Mencari pesananmu...</p>
                <p className="text-sm text-gray-400 font-mono">{trackingNumber}</p>
            </div>
        );
    }

    // ── Not Found State ────────────────────────────────────────────
    if (notFound) {
        return (
            <div className="min-h-screen bg-background-light flex flex-col items-center justify-center gap-6 px-4">
                <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center">
                    <span className="material-symbols-outlined text-red-400 text-4xl">search_off</span>
                </div>
                <div className="text-center">
                    <h1 className="text-2xl font-extrabold text-brand-text mb-2">Order Tidak Ditemukan</h1>
                    <p className="text-gray-500 mb-1">Nomor lacak <span className="font-mono font-bold text-primary">{trackingNumber}</span> tidak ada di sistem kami.</p>
                    <p className="text-sm text-gray-400">Pastikan nomor lacak benar, atau hubungi admin.</p>
                </div>
                <div className="flex gap-3 flex-wrap justify-center">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 bg-brand-yellow hover:bg-yellow-400 text-brand-text font-bold px-6 py-3 rounded-xl transition-all shadow-md active:scale-95"
                    >
                        <span className="material-symbols-outlined text-base">arrow_back</span>
                        Coba Lagi
                    </button>
                    <a
                        href="https://wa.me/yournumber"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 border-2 border-brand-text text-brand-text font-bold px-6 py-3 rounded-xl transition-all hover:bg-gray-50 active:scale-95"
                    >
                        <span className="material-symbols-outlined text-base">chat</span>
                        Chat Admin
                    </a>
                </div>
            </div>
        );
    }

    const currentStep = order?.status_step || 1;

    // ── Main Result ────────────────────────────────────────────────
    return (
        <div className="bg-background-light font-sans text-slate-900 min-h-screen">
            <main className="max-w-4xl mx-auto w-full px-4 py-8 space-y-6">

                {/* Card: Order Summary */}
                <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-brand-yellow/10 rounded-full -mr-20 -mt-20 pointer-events-none" />
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
                        <div className="space-y-1.5">
                            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Detail Pesanan</p>
                            <h1 className="text-3xl font-extrabold text-slate-900">{order.customer_name}</h1>
                            <p className="text-base text-slate-500 font-medium">
                                No. Lacak: <span className="font-mono font-bold text-primary">{order.tracking_number}</span>
                            </p>
                            <div className="flex gap-4 pt-1">
                                <span className="text-sm text-gray-500">Berat: <strong className="text-brand-text">{order.weight} kg</strong></span>
                                <span className="text-sm text-gray-500">Total: <strong className="text-brand-text">{formatRupiah(order.total_price)}</strong></span>
                            </div>
                        </div>
                        <div className="bg-brand-yellow/20 border-2 border-brand-yellow px-5 py-3 rounded-xl flex items-center gap-3 shrink-0">
                            <span className="material-symbols-outlined text-slate-900 animate-pulse">
                                {STEPS.find(s => s.step === currentStep)?.icon || 'dry_cleaning'}
                            </span>
                            <p className="text-slate-900 font-bold text-lg">{STATUS_LABELS[currentStep]}</p>
                        </div>
                    </div>
                </section>

                {/* Card: Visual Stepper */}
                <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="text-slate-900 text-lg font-bold mb-8">Status Pengerjaan</h3>
                    <div className="relative flex flex-wrap md:flex-nowrap justify-between gap-4">
                        {/* Progress line (desktop) */}
                        <div className="hidden md:block absolute top-6 left-0 w-full h-0.5 bg-slate-100 z-0" />
                        <div
                            className="hidden md:block absolute top-6 left-0 h-0.5 bg-brand-yellow z-0 transition-all duration-700"
                            style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
                        />
                        {STEPS.map(({ step, icon, label }) => {
                            const isDone = step < currentStep;
                            const isCurrent = step === currentStep;
                            return (
                                <div key={step} className="flex flex-col items-center gap-3 relative z-10 w-1/3 md:w-auto">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ring-4 ring-white shadow-md transition-all duration-300
                                        ${isCurrent ? 'bg-brand-yellow text-brand-text scale-110' : isDone ? 'bg-green-400 text-white' : 'bg-slate-100 text-slate-400'}`}>
                                        {isDone
                                            ? <span className="material-symbols-outlined text-base">check</span>
                                            : <span className="material-symbols-outlined text-base">{icon}</span>
                                        }
                                    </div>
                                    <p className={`text-xs font-bold text-center transition-colors ${isCurrent ? 'text-brand-text' : isDone ? 'text-green-600' : 'text-slate-400'}`}>
                                        {label}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                    {/* Status Message */}
                    <div className="mt-8 bg-yellow-50 border border-brand-yellow/30 rounded-xl px-5 py-4">
                        <p className="text-sm font-semibold text-slate-700">
                            <span className="font-bold text-primary">Status saat ini: </span>
                            {STATUS_MESSAGES[currentStep]}
                        </p>
                    </div>
                </section>

                {/* Card: Timeline */}
                <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="text-slate-900 text-lg font-bold mb-6">Riwayat Perjalanan Baju Kamu</h3>
                    {order.timeline && order.timeline.length > 0 ? (
                        <div className="space-y-0">
                            {order.timeline.map((item, idx) => (
                                <div key={item.id} className="flex gap-5 relative">
                                    <div className="flex flex-col items-center">
                                        <div className={`w-4 h-4 rounded-full z-10 ring-4 ring-white mt-1 ${idx === 0 ? 'bg-brand-yellow ring-brand-yellow/30' : 'bg-slate-300'}`} />
                                        {idx < order.timeline.length - 1 && (
                                            <div className="w-0.5 flex-1 bg-slate-100 mt-2" />
                                        )}
                                    </div>
                                    <div className={`pb-8 ${idx === order.timeline.length - 1 ? 'pb-0' : ''}`}>
                                        <p className={`text-sm font-bold mb-0.5 ${idx === 0 ? 'text-primary' : 'text-slate-400'}`}>
                                            {formatDate(item.timestamp)}
                                        </p>
                                        <p className={`font-medium text-base ${idx === 0 ? 'text-slate-800' : 'text-slate-500'}`}>
                                            {item.message}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-slate-400 text-sm">Belum ada riwayat aktivitas.</p>
                    )}
                </section>

                {/* Card: Support */}
                <section className="bg-slate-50 p-8 rounded-2xl text-center space-y-4 border border-slate-100">
                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                        <span className="material-symbols-outlined text-primary text-2xl">help_outline</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Butuh bantuan?</h3>
                    <p className="text-slate-500 max-w-md mx-auto text-sm">
                        Lupa nomor invoice? Jangan panik tsayy, cek chat WhatsApp kami atau klik tombol di bawah.
                    </p>
                    <a
                        href="https://wa.me/yournumber"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex min-w-[240px] items-center justify-center gap-3 rounded-xl h-14 px-8 bg-brand-yellow hover:bg-yellow-400 text-brand-text text-base font-bold transition-all shadow-md group active:scale-95"
                    >
                        <span className="material-symbols-outlined group-hover:scale-110 transition-transform">chat</span>
                        Chat Admin WhatsApp
                    </a>
                </section>
            </main>

            <footer className="mt-8 py-8 border-t border-slate-100 bg-white px-6">
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">local_laundry_service</span>
                        <span className="text-slate-900 font-bold">Washy Sushy</span>
                    </div>
                    <p className="text-slate-400 text-sm">© 2026 Washy Sushy. All clothes deserve to be sushy-clean.</p>
                </div>
            </footer>
        </div>
    );
}
