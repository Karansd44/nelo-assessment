import React, { useState } from 'react';
import { Layout, LogIn } from 'lucide-react';

export const Login = ({ onLogin }) => {
    const [f, setF] = useState({ email: '', password: '' });
    const [err, setErr] = useState('');

    const sub = (e) => {
        e.preventDefault();
        if (!f.email || !f.password) return setErr('Fill all fields');
        if (f.password.length < 6) return setErr('Password > 6 chars');
        onLogin(f.email);
    };

    const cls = "w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all";

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-8">
                <div className="text-center space-y-2">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 text-blue-600 mb-2"><Layout size={24} /></div>
                    <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
                    <p className="text-gray-500">Sign in to manage your tasks</p>
                </div>
                <form onSubmit={sub} className="space-y-6">
                    <div className="space-y-4">
                        <div><label className="block text-sm font-medium text-gray-700 mb-1">Email</label><input type="email" value={f.email} onChange={e => setF({ ...f, email: e.target.value })} className={cls} placeholder="you@example.com" autoFocus /></div>
                        <div><label className="block text-sm font-medium text-gray-700 mb-1">Password</label><input type="password" value={f.password} onChange={e => setF({ ...f, password: e.target.value })} className={cls} placeholder="••••••••" /></div>
                    </div>
                    {err && <p className="text-sm text-red-500 text-center bg-red-50 py-2 rounded-lg">{err}</p>}
                    <button type="submit" className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all shadow-lg shadow-blue-500/30"><LogIn size={20} />Sign In</button>
                </form>
            </div>
        </div>
    );
};
