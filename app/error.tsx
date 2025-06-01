'use client';

import { useEffect } from 'react';
import Link from 'next/link';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Client-side error caught:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4 py-12">
      <h1 className="text-6xl md:text-8xl font-bold text-red-500 mb-4">500</h1>
      <h2 className="text-2xl md:text-4xl font-semibold text-gray-100 mb-6 text-center">Something Went Wrong!</h2>
      <p className="text-lg md:text-xl text-gray-300 mb-8 text-center max-w-md">
        We apologize for the inconvenience. An unexpected error occurred.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black"
        >
          Try Again or use the contact form to send a message
        </button>
        <Link
          href="/"
          className="px-6 py-3 border border-gray-600 text-white font-semibold rounded-lg shadow-lg hover:bg-gray-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-black text-center"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}