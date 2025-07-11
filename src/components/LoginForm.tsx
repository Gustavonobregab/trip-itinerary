'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { sendOtpToEmail, verifyOtpCode } from '@/lib/authService';
import { IconMail, IconShieldCheck } from '@tabler/icons-react';


export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState<'email' | 'code'>('email');
  const [message, setMessage] = useState('');
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
   if (user) router.push('/main-trips');
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
      router.push('/main-trips');
    }
  };

  return (
    <div className="min-h-screen bg-[#ffffff] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-black text-[#1E40AF] tracking-tight font-sans">
            Start to travel. 
          </h1>
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
            <button
              type="submit"
              className="btn btn-dark w-full flex items-center justify-center gap-2"
            >
              <IconMail size={18} />
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
            <button
              type="submit"
              className="btn btn-dark w-full flex items-center justify-center gap-1"
            >
              <IconShieldCheck size={18} />
              Verify Code
            </button>
          </form>
        )}

        {message && (
          <p className="text-center text-sm text-green-600 font-medium mt-0.5">{message}</p>
        )}
      </div>
    </div>
  );
}
