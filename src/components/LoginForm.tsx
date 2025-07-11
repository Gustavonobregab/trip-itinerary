'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { sendOtpToEmail, verifyOtpCode } from '@/lib/authService';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState<'email' | 'code'>('email');
  const [message, setMessage] = useState('');
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
 //   if (user) router.push('/trips');
  }, [user]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = await sendOtpToEmail(email);
    if (error) {
      setMessage('Failed to send code.');
    } else {
      setMessage('Check your email for the 6-digit code.');
      setStep('code');
    }
  };

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = await verifyOtpCode(email, code);
    if (error) {
      setMessage('Invalid code.');
    } else {
      router.push('/trips');
    }
  };

  return (
    <div className="min-h-screen bg-[#1E40AF] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-black text-[#1E40AF] tracking-tight font-sans">
            in<span className="font-extrabold">TRIP</span>nerary ✈️
          </h1>
          <p className="text-gray-500 mt-2 text-sm">Plan your trips with ease</p>
        </div>

        {step === 'email' && (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary w-full text-white font-medium">
              Send Code
            </button>
          </form>
        )}

        {step === 'code' && (
          <form onSubmit={handleCodeSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Enter 6-digit code"
              className="form-control"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary w-full text-white font-medium">
              Verify Code
            </button>
          </form>
        )}

        {message && (
          <p className="text-center text-sm text-green-600 font-medium">{message}</p>
        )}
      </div>
    </div>
  );
}
