import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/admin-dashboard');
        } catch (err) {
            setError('Email atau password salah. Coba lagi ya.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-background-light flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                {/* Header Card */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-yellow rounded-2xl shadow-lg mb-4">
                        <span className="material-symbols-outlined text-brand-text text-3xl">admin_panel_settings</span>
                    </div>
                    <h1 className="text-2xl font-extrabold text-brand-text">Admin Login</h1>
                    <p className="text-sm text-gray-500 mt-1">Washy Sushy Dashboard</p>
                </div>

                {/* Login Card */}
                <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-brand-text mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="admin@washysushy.com"
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-transparent text-brand-text placeholder-gray-400 transition"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-brand-text mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="••••••••"
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-transparent text-brand-text placeholder-gray-400 transition"
                            />
                        </div>

                        {error && (
                            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
                                <span className="material-symbols-outlined text-base">error</span>
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-brand-yellow hover:bg-yellow-400 text-brand-text font-extrabold py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <span className="material-symbols-outlined animate-spin text-lg">refresh</span>
                                    Masuk...
                                </>
                            ) : (
                                <>
                                    <span className="material-symbols-outlined text-lg">login</span>
                                    Masuk
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <p className="text-center text-xs text-gray-400 mt-6">
                    Hanya untuk admin Washy Sushy
                </p>
            </div>
        </div>
    );
}
