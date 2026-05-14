import { useState } from 'react';
import type * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff } from 'lucide-react';

const ADMIN_PASSWORD = 'Xjy20050407'; // 管理员密码

export function AdminLogin() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('admin_authenticated', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('密码错误');
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center">
      <div className="bg-white p-8 md:p-12 rounded-lg shadow-sm max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-stone-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-7 h-7 text-white" />
          </div>
          <h1 className="font-serif italic text-3xl text-stone-900 mb-2">Admin Login</h1>
          <p className="text-[14px] text-stone-500">Enter password to access CMS</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="relative mb-4">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 border border-stone-200 rounded-md text-[14px] focus:outline-none focus:border-stone-900 pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {error && (
            <p className="text-red-500 text-[13px] mb-4">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-stone-900 text-white py-3 text-[13px] font-medium tracking-wide hover:bg-stone-800 transition-colors rounded-md"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <a href="/" className="text-[13px] text-stone-400 hover:text-stone-600 transition-colors">
            ← Back to Website
          </a>
        </div>
      </div>
    </div>
  );
}
