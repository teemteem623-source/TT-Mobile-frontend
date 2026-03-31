import React from 'react';
import RegisterFrom from '@/components/shop/auth/registerForm';

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="w-full max-w-md">
        <RegisterFrom />
      </div>
    </div>
  );
}