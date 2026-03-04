import React from 'react';

function ServicesAndFAQ() {
    return (
        <div className="bg-background-light font-display text-slate-900 transition-colors duration-300 min-h-screen">
            <main className="bubble-bg-services">
                {/* Section 1: Services */}
                <section className="py-16 px-4 max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-sun-yellow/20 text-yellow-700 text-xs font-bold uppercase tracking-widest mb-4">
                            Minimal 1kg yaa
                        </span>
                        <h1 className="text-3xl md:text-4xl font-extrabold mb-4">Layanan & Harga Kami</h1>
                        <p className="text-slate-500 max-w-2xl mx-auto">
                            Pilih paket yang paling pas buat kebutuhan kamu. Dari yang santai sampai yang express, Washy Sushy siap bantu!
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Card 1 */}
                        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-100 group">
                            <div className="w-12 h-12 bg-sun-yellow/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-sun-yellow/20 transition-colors">
                                <span className="material-symbols-outlined text-sun-yellow">dry_cleaning</span>
                            </div>
                            <h3 className="font-bold text-lg mb-1">Cuci Kering Biasa</h3>
                            <p className="text-sun-yellow font-semibold">Rp7.000/kg</p>
                        </div>
                        {/* Card 2 */}
                        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-100 group">
                            <div className="w-12 h-12 bg-sun-yellow/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-sun-yellow/20 transition-colors">
                                <span className="material-symbols-outlined text-sun-yellow">iron</span>
                            </div>
                            <h3 className="font-bold text-lg mb-1">Cuci Setrika Biasa</h3>
                            <p className="text-sun-yellow font-semibold">Rp8.500/kg</p>
                        </div>
                        {/* Card 3 */}
                        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-100 group border-l-4 border-l-sun-yellow">
                            <div className="w-12 h-12 bg-sun-yellow/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-sun-yellow/20 transition-colors">
                                <span className="material-symbols-outlined text-sun-yellow">bolt</span>
                            </div>
                            <h3 className="font-bold text-lg mb-1">Cuci Kering Express</h3>
                            <p className="text-sun-yellow font-semibold">Rp12.000/kg</p>
                        </div>
                        {/* Card 4 */}
                        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-100 group border-l-4 border-l-sun-yellow">
                            <div className="w-12 h-12 bg-sun-yellow/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-sun-yellow/20 transition-colors">
                                <span className="material-symbols-outlined text-sun-yellow">speed</span>
                            </div>
                            <h3 className="font-bold text-lg mb-1">Cuci Setrika Express</h3>
                            <p className="text-sun-yellow font-semibold">Rp15.000/kg</p>
                        </div>
                        {/* Card 5 */}
                        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-100 group">
                            <div className="w-12 h-12 bg-sun-yellow/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-sun-yellow/20 transition-colors">
                                <span className="material-symbols-outlined text-sun-yellow">bed</span>
                            </div>
                            <h3 className="font-bold text-lg mb-1">Cuci Bed Cover</h3>
                            <p className="text-sun-yellow font-semibold">Rp15.000 - Rp40.000</p>
                        </div>
                        {/* Card 6 */}
                        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-100 group">
                            <div className="w-12 h-12 bg-sun-yellow/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-sun-yellow/20 transition-colors">
                                <span className="material-symbols-outlined text-sun-yellow">layers</span>
                            </div>
                            <h3 className="font-bold text-lg mb-1">Cuci Sprei</h3>
                            <p className="text-sun-yellow font-semibold">Rp10.000 - Rp35.000</p>
                        </div>
                        {/* Card 7 */}
                        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-100 group">
                            <div className="w-12 h-12 bg-sun-yellow/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-sun-yellow/20 transition-colors">
                                <span className="material-symbols-outlined text-sun-yellow">check_circle</span>
                            </div>
                            <h3 className="font-bold text-lg mb-1">Cuci Kering Khusus</h3>
                            <p className="text-sun-yellow font-semibold">Rp9.000/kg</p>
                        </div>
                        {/* Card 8 */}
                        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-100 group">
                            <div className="w-12 h-12 bg-sun-yellow/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-sun-yellow/20 transition-colors">
                                <span className="material-symbols-outlined text-sun-yellow">stars</span>
                            </div>
                            <h3 className="font-bold text-lg mb-1">Cuci Setrika Khusus</h3>
                            <p className="text-sun-yellow font-semibold">Rp11.000/kg</p>
                        </div>
                    </div>
                </section>

                {/* Section 2: FAQ */}
                <section className="py-16 bg-slate-100 px-4">
                    <div className="max-w-3xl mx-auto">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-bold mb-2">FAQ - Tanya Jawab Santai</h2>
                            <p className="text-slate-500">Punya pertanyaan? Cek dulu di sini ya, siapa tau terjawab!</p>
                        </div>
                        <div className="space-y-4">
                            {/* Q1 */}
                            <div className="bg-white rounded-xl p-4 shadow-sm faq-item group">
                                <div className="flex items-start gap-4">
                                    <span className="material-symbols-outlined text-sun-yellow mt-1">help</span>
                                    <div>
                                        <h4 className="font-bold text-slate-800 mb-2 faq-question group-hover:text-amber-600 transition-colors">Berapa lama prosesnya?</h4>
                                        <p className="text-slate-600 text-sm leading-relaxed">2-3 hari tsayy. Kalo butuh cepet ambil yang Express aja ya!</p>
                                    </div>
                                </div>
                            </div>
                            {/* Q2 */}
                            <div className="bg-white rounded-xl p-4 shadow-sm faq-item group">
                                <div className="flex items-start gap-4">
                                    <span className="material-symbols-outlined text-sun-yellow mt-1">local_shipping</span>
                                    <div>
                                        <h4 className="font-bold text-slate-800 mb-2 faq-question group-hover:text-amber-600 transition-colors">Ada antar-jemput?</h4>
                                        <p className="text-slate-600 text-sm leading-relaxed">Jemput belum ada, tapi antar kami siap ga perlu repot ambil ke sini lagi.</p>
                                    </div>
                                </div>
                            </div>
                            {/* Q3 */}
                            <div className="bg-white rounded-xl p-4 shadow-sm faq-item group">
                                <div className="flex items-start gap-4">
                                    <span className="material-symbols-outlined text-sun-yellow mt-1">security</span>
                                    <div>
                                        <h4 className="font-bold text-slate-800 mb-2 faq-question group-hover:text-amber-600 transition-colors">Pakaian rusak/hilang?</h4>
                                        <p className="text-slate-600 text-sm leading-relaxed">Tenang, ada kompensasi kok! S&amp;K berlaku ya, tapi kita pastiin seaman mungkin.</p>
                                    </div>
                                </div>
                            </div>
                            {/* Q4 */}
                            <div className="bg-white rounded-xl p-4 shadow-sm faq-item group">
                                <div className="flex items-start gap-4">
                                    <span className="material-symbols-outlined text-sun-yellow mt-1">search</span>
                                    <div>
                                        <h4 className="font-bold text-slate-800 mb-2 faq-question group-hover:text-amber-600 transition-colors">Lupa nomor lacak?</h4>
                                        <p className="text-slate-600 text-sm leading-relaxed">Cek WhatsApp kamu, otomatis dikirim kok pas bajunya mulai dicuci.</p>
                                    </div>
                                </div>
                            </div>
                            {/* Q5 */}
                            <div className="bg-white rounded-xl p-4 shadow-sm faq-item group">
                                <div className="flex items-start gap-4">
                                    <span className="material-symbols-outlined text-sun-yellow mt-1">payments</span>
                                    <div>
                                        <h4 className="font-bold text-slate-800 mb-2 faq-question group-hover:text-amber-600 transition-colors">Bayarnya gimana?</h4>
                                        <p className="text-slate-600 text-sm leading-relaxed">Bisa cash pas ambil, atau transfer QRIS juga ready kok biar praktis.</p>
                                    </div>
                                </div>
                            </div>
                            {/* Q6 */}
                            <div className="bg-white rounded-xl p-4 shadow-sm faq-item group">
                                <div className="flex items-start gap-4">
                                    <span className="material-symbols-outlined text-sun-yellow mt-1">eco</span>
                                    <div>
                                        <h4 className="font-bold text-slate-800 mb-2 faq-question group-hover:text-amber-600 transition-colors">Pake deterjen apa?</h4>
                                        <p className="text-slate-600 text-sm leading-relaxed">Deterjen khusus laundry yang wangi dan ramah di serat kain baju kamu.</p>
                                    </div>
                                </div>
                            </div>
                            {/* Q7 */}
                            <div className="bg-white rounded-xl p-4 shadow-sm faq-item group">
                                <div className="flex items-start gap-4">
                                    <span className="material-symbols-outlined text-sun-yellow mt-1">schedule</span>
                                    <div>
                                        <h4 className="font-bold text-slate-800 mb-2 faq-question group-hover:text-amber-600 transition-colors">Kalo tutup jam berapa?</h4>
                                        <p className="text-slate-600 text-sm leading-relaxed">Kita standby sampe jam 5 sore setiap hari. Jangan telat jemput ya!</p>
                                    </div>
                                </div>
                            </div>
                            {/* Q8 */}
                            <div className="bg-white rounded-xl p-4 shadow-sm faq-item group">
                                <div className="flex items-start gap-4">
                                    <span className="material-symbols-outlined text-sun-yellow mt-1">inventory_2</span>
                                    <div>
                                        <h4 className="font-bold text-slate-800 mb-2 faq-question group-hover:text-amber-600 transition-colors">Bisa cuci sepatu?</h4>
                                        <p className="text-slate-600 text-sm leading-relaxed">Wah, untuk sekarang kita fokus ke pakaian dulu ya kak.</p>
                                    </div>
                                </div>
                            </div>
                            {/* Q9 */}
                            <div className="bg-white rounded-xl p-4 shadow-sm faq-item group">
                                <div className="flex items-start gap-4">
                                    <span className="material-symbols-outlined text-sun-yellow mt-1">favorite</span>
                                    <div>
                                        <h4 className="font-bold text-slate-800 mb-2 faq-question group-hover:text-amber-600 transition-colors">Bisa titip wangi khusus?</h4>
                                        <p className="text-slate-600 text-sm leading-relaxed">Boleh banget! Kabarin admin aja mau wangi apa, kalo ada stock kita pakein.</p>
                                    </div>
                                </div>
                            </div>
                            {/* Q10 */}
                            <div className="bg-white rounded-xl p-4 shadow-sm faq-item group">
                                <div className="flex items-start gap-4">
                                    <span className="material-symbols-outlined text-sun-yellow mt-1">call</span>
                                    <div>
                                        <h4 className="font-bold text-slate-800 mb-2 faq-question group-hover:text-amber-600 transition-colors">Masih bingung nih?</h4>
                                        <p className="text-slate-600 text-sm leading-relaxed">Chat admin aja langsung, fast response kok pas jam kerja!</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 3: Operational Info & Footer */}
                <section className="py-20 px-4 text-center">
                    <div className="max-w-4xl mx-auto bg-white rounded-3xl p-10 shadow-xl border border-slate-100">
                        <div className="mb-6">
                            <span className="material-symbols-outlined text-sun-yellow text-5xl mb-4">access_time_filled</span>
                            <h2 className="text-2xl md:text-3xl font-bold mb-2">Jam Operasional</h2>
                            <p className="text-xl text-slate-600">Setiap Hari (08.00 - 17.00)</p>
                        </div>
                        <hr className="my-8 border-slate-100" />
                        <div className="space-y-6">
                            <p className="text-slate-500">Punya cucian menumpuk atau pertanyaan mendesak?</p>
                            <button className="bg-sun-yellow hover:bg-yellow-400 text-slate-900 px-10 py-4 rounded-full text-lg font-bold flex items-center justify-center gap-3 transition-all shadow-lg mx-auto transform hover:scale-105">
                                <span className="material-symbols-outlined">support_agent</span>
                                Tanya Admin (Fast Response)
                            </button>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="bg-slate-50 py-12 px-4 border-t border-slate-200">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-sun-yellow text-2xl">soap</span>
                        <span className="text-lg font-bold tracking-tight">Washy Sushy</span>
                    </div>
                    <p className="text-sm text-slate-500">© 2026 Washy Sushy Laundry. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a className="text-slate-400 hover:text-sun-yellow transition-colors" href="#">
                            <span className="material-symbols-outlined">share</span>
                        </a>
                        <a className="text-slate-400 hover:text-sun-yellow transition-colors" href="#">
                            <span className="material-symbols-outlined">pin_drop</span>
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default ServicesAndFAQ;
