'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const { user } = useAuth();
 // const user = null;
  

  return (
    <header className="w-full py-4 px-6 flex justify-end items-center">
      {user ? (
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-800">
            {user.email}
          </span>
        
        </div>
      ) : (
        <Link
          href="/login"
          className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
        >
          Login
        </Link>
      )}
    </header>
  );
}