import React from 'react';

function TrackingResult() {
    return (
        <div className="bg-background-light font-display text-slate-900 min-h-screen">
            <main className="max-w-4xl mx-auto w-full px-4 py-8 space-y-8">
                {/* Section 1: Order Summary Card */}
                <section className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-sun-yellow/10 rounded-full -mr-16 -mt-16"></div>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
                        <div className="space-y-2">
                            <p className="text-professional-grey text-sm font-medium uppercase tracking-wider">Detail Pesanan</p>
                            <h1 className="text-3xl font-extrabold text-slate-900">Aisya Amara</h1>
                            <p className="text-lg text-slate-600 font-medium">No. Lacak: <span className="text-primary">WS-2026-001</span></p>
                        </div>
                        <div className="bg-sun-yellow/20 border-2 border-sun-yellow px-6 py-3 rounded-xl flex items-center gap-3">
                            <span className="material-symbols-outlined text-slate-900 animate-pulse">bubbles</span>
                            <p className="text-slate-900 font-bold text-lg">Sedang DiCuci</p>
                        </div>
                    </div>
                </section>

                {/* Section 2: Visual Stepper */}
                <section className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
                    <h3 className="text-slate-900 text-lg font-bold mb-8">Status Pengerjaan</h3>
                    <div className="relative flex flex-wrap md:flex-nowrap justify-between gap-4">
                        {/* Progress Line (Desktop) */}
                        <div className="hidden md:block absolute top-6 left-0 w-full h-0.5 bg-slate-200 -z-0"></div>

                        {/* Steps */}
                        <div className="flex flex-col items-center gap-3 relative z-10 w-1/3 md:w-auto">
                            <div className="w-12 h-12 rounded-full bg-sun-yellow flex items-center justify-center text-slate-900 shadow-md ring-4 ring-white">
                                <span className="material-symbols-outlined">dry_cleaning</span>
                            </div>
                            <p className="text-xs font-bold text-slate-900 text-center">DiCuci</p>
                        </div>
                        <div className="flex flex-col items-center gap-3 relative z-10 w-1/3 md:w-auto">
                            <div className="w-12 h-12 rounded-full bg-soft-grey flex items-center justify-center text-slate-400 ring-4 ring-white">
                                <span className="material-symbols-outlined">iron</span>
                            </div>
                            <p className="text-xs font-medium text-slate-400 text-center">DiSetrika</p>
                        </div>
                        <div className="flex flex-col items-center gap-3 relative z-10 w-1/3 md:w-auto">
                            <div className="size-12 rounded-full bg-soft-grey flex items-center justify-center text-slate-400 ring-4 ring-white">
                                <span className="material-symbols-outlined">inventory_2</span>
                            </div>
                            <p className="text-xs font-medium text-slate-400 text-center">DiPacking</p>
                        </div>
                        <div className="flex flex-col items-center gap-3 relative z-10 w-1/3 md:w-auto">
                            <div className="size-12 rounded-full bg-soft-grey flex items-center justify-center text-slate-400 ring-4 ring-white">
                                <span className="material-symbols-outlined">check_circle</span>
                            </div>
                            <p className="text-xs font-medium text-slate-400 text-center">Selesai</p>
                        </div>
                        <div className="flex flex-col items-center gap-3 relative z-10 w-1/3 md:w-auto">
                            <div className="size-12 rounded-full bg-soft-grey flex items-center justify-center text-slate-400 ring-4 ring-white">
                                <span className="material-symbols-outlined">local_shipping</span>
                            </div>
                            <p className="text-xs font-medium text-slate-400 text-center">DiAntar</p>
                        </div>
                        <div className="flex flex-col items-center gap-3 relative z-10 w-1/3 md:w-auto">
                            <div className="size-12 rounded-full bg-soft-grey flex items-center justify-center text-slate-400 ring-4 ring-white">
                                <span className="material-symbols-outlined">handshake</span>
                            </div>
                            <p className="text-xs font-medium text-slate-400 text-center">DiTerima</p>
                        </div>
                    </div>
                </section>

                {/* Section 3: Timeline */}
                <section className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
                    <h3 className="text-slate-900 text-lg font-bold mb-6">Riwayat Perjalanan Baju Kamu</h3>
                    <div className="space-y-8">
                        {/* Timeline Item Active */}
                        <div className="flex gap-6 relative">
                            <div className="flex flex-col items-center">
                                <div className="w-4 h-4 rounded-full bg-sun-yellow ring-4 ring-sun-yellow/30 z-10"></div>
                                <div className="w-0.5 h-full bg-slate-200 -mb-8 mt-2"></div>
                            </div>
                            <div className="pb-8">
                                <p className="text-primary font-bold text-sm mb-1">01/03/2026 - 10:00</p>
                                <p className="text-slate-800 font-semibold text-base">Sedang proses: Baju kamu lagi mandi nih, biar makin kinclong! tsayy ✨</p>
                            </div>
                        </div>
                        {/* Timeline Item */}
                        <div className="flex gap-6 relative">
                            <div className="flex flex-col items-center">
                                <div className="w-4 h-4 rounded-full bg-slate-300 z-10"></div>
                                <div className="w-0.5 h-full bg-slate-200 -mb-8 mt-2"></div>
                            </div>
                            <div className="pb-8">
                                <p className="text-slate-500 font-bold text-sm mb-1">01/03/2026 - 08:30</p>
                                <p className="text-slate-600 font-medium text-base">Pesanan diterima oleh Washy Sushy Central Hub.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 4: Support Card */}
                <section className="bg-slate-100 p-8 rounded-xl text-center space-y-4 border border-slate-200">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                        <span className="material-symbols-outlined text-primary text-3xl">help_outline</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Butuh bantuan?</h3>
                    <p className="text-slate-600 max-w-md mx-auto">
                        Lupa nomor invoice? Jangan panik tsayy, cek chat WhatsApp kami atau klik tombol di bawah untuk tanya-tanya.
                    </p>
                    <div className="pt-2">
                        <button className="w-full md:w-auto inline-flex min-w-[240px] cursor-pointer items-center justify-center gap-3 rounded-xl h-14 px-8 bg-sun-yellow hover:bg-yellow-400 text-slate-900 text-lg font-bold transition-all shadow-md group">
                            <span className="material-symbols-outlined group-hover:scale-110 transition-transform">chat</span>
                            <span>Chat Admin WhatsApp</span>
                        </button>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="mt-12 py-10 border-t border-slate-200 bg-white px-6 md:px-20">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary font-bold">local_laundry_service</span>
                        <span className="text-slate-900 font-bold">Washy Sushy Laundry Service</span>
                    </div>
                    <p className="text-slate-500 text-sm">© 2026 Washy Sushy. All clothes deserve to be sushy-clean.</p>
                </div>
            </footer>
        </div>
    );
}

export default TrackingResult;
