import React, { useState } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import TrackingResult from './TrackingResult';
import ServicesAndFAQ from './ServicesAndFAQ';
import AdminDashboard from './AdminDashboard';
import LoginPage from './LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';

function NavigationBar() {
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);
    const isHome = location.pathname === '/';
    const isTracking = location.pathname.startsWith('/tracking');
    const isLayanan = location.pathname === '/layanan';

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 h-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
                    {/* Brand Logo */}
                    <Link to="/" className="flex items-center gap-2" data-purpose="brand-logo">
                        <img src="/logo.png" alt="Washy Sushy Logo" className="w-10 h-10 rounded-full object-cover" />
                        <span className="text-xl font-extrabold tracking-tight text-brand-text">Washy Sushy</span>
                    </Link>
                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8" data-purpose="nav-links">
                        <Link
                            className={`text-sm font-semibold transition-colors ${isHome ? 'text-primary font-bold border-b-2 border-primary' : 'text-brand-darkgrey hover:text-brand-yellow'}`}
                            to="/"
                        >
                            Home
                        </Link>
                        <Link
                            className={`text-sm font-semibold transition-colors ${isTracking ? 'text-primary font-bold border-b-2 border-primary' : 'text-brand-darkgrey hover:text-brand-yellow'}`}
                            to="/tracking"
                        >
                            Cek Cucian
                        </Link>
                        <Link
                            className={`text-sm font-semibold transition-colors ${isLayanan ? 'text-primary font-bold border-b-2 border-primary' : 'text-brand-darkgrey hover:text-brand-yellow'}`}
                            to="/layanan"
                        >
                            Layanan &amp; Harga
                        </Link>
                        {/* WhatsApp Button */}
                        <a className="flex items-center gap-2 bg-brand-yellow hover:bg-yellow-400 text-brand-text px-5 py-2.5 rounded-custom font-bold text-sm transition-all shadow-sm active:scale-95" data-purpose="whatsapp-cta" href="https://wa.me/yournumber" target="_blank" rel="noreferrer">
                            <span className="material-symbols-outlined text-lg">chat</span>
                            WhatsApp
                        </a>
                    </div>
                    {/* Mobile Toggle */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setMobileOpen(!mobileOpen)}>
                            <span className="material-symbols-outlined text-brand-text text-3xl">{mobileOpen ? 'close' : 'menu'}</span>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="fixed inset-0 top-20 z-40 bg-white/95 backdrop-blur-md md:hidden">
                    <div className="flex flex-col items-center gap-6 pt-10">
                        <Link
                            className={`text-lg font-semibold transition-colors ${isHome ? 'text-primary font-bold' : 'text-brand-darkgrey'}`}
                            to="/"
                            onClick={() => setMobileOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            className={`text-lg font-semibold transition-colors ${isTracking ? 'text-primary font-bold' : 'text-brand-darkgrey'}`}
                            to="/tracking"
                            onClick={() => setMobileOpen(false)}
                        >
                            Cek Cucian
                        </Link>
                        <Link
                            className={`text-lg font-semibold transition-colors ${isLayanan ? 'text-primary font-bold' : 'text-brand-darkgrey'}`}
                            to="/layanan"
                            onClick={() => setMobileOpen(false)}
                        >
                            Layanan &amp; Harga
                        </Link>
                        <a className="flex items-center gap-2 bg-brand-yellow hover:bg-yellow-400 text-brand-text px-6 py-3 rounded-custom font-bold text-base transition-all shadow-sm" href="https://wa.me/yournumber" target="_blank" rel="noreferrer">
                            <span className="material-symbols-outlined text-lg">chat</span>
                            WhatsApp
                        </a>
                    </div>
                </div>
            )}
        </>
    );
}

function HeroSection() {
    const [trackingInput, setTrackingInput] = useState('');
    const [inputError, setInputError] = useState('');
    const navigate = useNavigate();

    function handleTrack(e) {
        e.preventDefault();
        const trimmed = trackingInput.trim().toUpperCase();
        if (!trimmed) {
            setInputError('Masukkan nomor lacak dulu ya!');
            return;
        }
        setInputError('');
        navigate(`/tracking/${trimmed}`);
    }

    return (
        <main className="relative pt-32 pb-16 md:pt-48 md:pb-24 overflow-hidden hero-gradient min-h-screen">
            <div className="absolute inset-0 pointer-events-none bubble-bg"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <div className="text-center lg:text-left order-2 lg:order-1" data-purpose="hero-content">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-brand-text leading-tight mb-6">
                            Cuci Baju Gak Pake Ribet, <br className="hidden md:block" />
                            <span className="text-brand-yellow drop-shadow-sm">Pantau dari HP Aja!</span>
                        </h1>
                        <p className="text-lg text-brand-darkgrey mb-10 max-w-xl mx-auto lg:mx-0">
                            Laundry bersih, wangi, dan cepat. Masukkan nomor lacakmu di bawah untuk cek status real-time pesananmu.
                        </p>
                        {/* Tracking Bar */}
                        <div className="relative max-w-2xl mx-auto lg:mx-0 mb-12" data-purpose="tracking-action" id="cek-cucian">
                            <form onSubmit={handleTrack}>
                                <div className="flex flex-col sm:flex-row gap-3 p-2 bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100">
                                    <input
                                        className="flex-grow px-6 py-4 bg-transparent border-none focus:ring-0 text-brand-text placeholder-gray-400 font-medium w-full outline-none uppercase"
                                        placeholder="Masukkan Nomor Lacak (contoh: WS-2026-001)"
                                        type="text"
                                        value={trackingInput}
                                        onChange={(e) => {
                                            setTrackingInput(e.target.value);
                                            if (inputError) setInputError('');
                                        }}
                                    />
                                    <button
                                        type="submit"
                                        className="bg-brand-yellow hover:bg-yellow-400 text-brand-text font-extrabold px-8 py-4 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center gap-2 whitespace-nowrap"
                                    >
                                        <span>Cek Status Sekarang</span>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
                                    </button>
                                </div>
                            </form>
                            {inputError && (
                                <p className="mt-2 text-sm text-red-500 font-medium flex items-center gap-1">
                                    <span className="material-symbols-outlined text-base">error</span>
                                    {inputError}
                                </p>
                            )}
                            <p className="mt-4 text-xs text-gray-400 text-center lg:text-left">
                                *Hanya tersedia untuk pelanggan aktif di wilayah operasional Washy Sushy.
                            </p>
                        </div>
                        {/* Quick Info */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-gray-100" data-purpose="quick-info">
                            <div className="flex items-center gap-3 justify-center lg:justify-start">
                                <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center text-brand-yellow">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                </div>
                                <div className="text-left">
                                    <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400">Jadwal</p>
                                    <p className="text-sm font-bold text-brand-text">08.00 - 17.00</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 justify-center lg:justify-start">
                                <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center text-brand-yellow">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M7 12h10"></path><path d="M5 8h14"></path><path d="M19 8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2"></path></svg>
                                </div>
                                <div className="text-left">
                                    <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400">Minimal</p>
                                    <p className="text-sm font-bold text-brand-text">1kg</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 justify-center lg:justify-start">
                                <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center text-brand-yellow">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect height="13" width="15" x="1" y="3"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
                                </div>
                                <div className="text-left">
                                    <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400">Layanan</p>
                                    <p className="text-sm font-bold text-brand-text">Siap Antar Alamat</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Hero Image */}
                    <div className="order-1 lg:order-2 flex justify-center" data-purpose="hero-image-container">
                        <div className="relative w-full max-w-md lg:max-w-none">
                            <div className="absolute -top-6 -right-6 w-32 h-32 bg-brand-yellow rounded-full blur-3xl opacity-20"></div>
                            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-400 rounded-full blur-3xl opacity-10"></div>
                            <div className="relative bg-white p-4 rounded-3xl shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 hover:scale-105">
                                <img
                                    alt="A happy young person holding a stack of neatly folded laundry."
                                    className="rounded-2xl w-full h-auto object-cover"
                                    loading="eager"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgeFXxyAiQA9kGvtql26BjF6SK0GFJOlQdsAaTZgbyt9VBkBi-PicKsBQiqLzbKAbTWz5S120SLkiA8h4ewbvSBsbbR6Yzj5Q6dq9To5Nu4KNynCdpTYA4kPhN6HoLFWT2wTcq5IvAkM5rbnCVNrkSFyqlJmh3si_n4OGiwDnKR-7nzkhEyBbZEbONScblJDct1YJGiZDUIxojFGEVwknloUgGzj1es1V9RE2Gfg_xcLaAUwu8vAX6tPAwwwBlFnIhJsV7jT4y6HA"
                                />
                                <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-2xl shadow-lg flex items-center gap-3 -rotate-2 border border-gray-50 animate-bounce">
                                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></path></svg>
                                    </div>
                                    <div className="leading-tight">
                                        <p className="text-xs font-bold text-brand-text">Cucian Selesai!</p>
                                        <p className="text-[10px] text-gray-500">Siap antar sampai ke tujuan</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

function AdditionalSection() {
    return (
        <section className="py-20 bg-white" id="layanan">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <h2 className="text-2xl font-bold text-gray-300">Layanan Laundry Terpercaya untuk Kebutuhan Harianmu</h2>
            </div>
        </section>
    )
}

function HomePage() {
    return (
        <>
            <HeroSection />
            <AdditionalSection />
        </>
    );
}

// Halaman placeholder untuk /tracking tanpa param
function TrackingInputPage() {
    const [trackingInput, setTrackingInput] = useState('');
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        const trimmed = trackingInput.trim().toUpperCase();
        if (trimmed) navigate(`/tracking/${trimmed}`);
    }

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 bg-background-light">
            <div className="w-full max-w-xl text-center">
                <div className="w-16 h-16 bg-brand-yellow rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <span className="material-symbols-outlined text-brand-text text-3xl">search</span>
                </div>
                <h1 className="text-3xl font-extrabold text-brand-text mb-3">Cek Status Cucian</h1>
                <p className="text-brand-darkgrey mb-8">Masukkan nomor lacak yang dikirim ke WhatsApp kamu.</p>
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 p-2 bg-white rounded-2xl shadow-xl border border-gray-100">
                    <input
                        type="text"
                        value={trackingInput}
                        onChange={(e) => setTrackingInput(e.target.value)}
                        placeholder="Contoh: WS-2026-001"
                        className="flex-grow px-6 py-4 bg-transparent border-none focus:ring-0 text-brand-text placeholder-gray-400 font-medium outline-none uppercase"
                    />
                    <button type="submit" className="bg-brand-yellow hover:bg-yellow-400 text-brand-text font-extrabold px-8 py-4 rounded-xl transition-all shadow-md active:scale-95 whitespace-nowrap">
                        Cek Sekarang
                    </button>
                </form>
            </div>
        </div>
    );
}

function App() {
    return (
        <AuthProvider>
            <NavigationBar />
            <div className="pt-20">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/tracking" element={<TrackingInputPage />} />
                    <Route path="/tracking/:trackingNumber" element={<TrackingResult />} />
                    <Route path="/layanan" element={<ServicesAndFAQ />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route
                        path="/admin-dashboard"
                        element={
                            <ProtectedRoute>
                                <AdminDashboard />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </div>
        </AuthProvider>
    );
}

export default App;
