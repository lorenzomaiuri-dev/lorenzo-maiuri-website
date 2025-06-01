import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found | Lorenzo Maiuri',
  description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4 py-12">
      <h1 className="text-6xl md:text-8xl font-bold text-blue-500 mb-4 animate-pulse">404</h1>
      <h2 className="text-2xl md:text-4xl font-semibold text-gray-100 mb-6 text-center">Page Not Found</h2>
      <p className="text-lg md:text-xl text-gray-300 mb-8 text-center max-w-md">
        Oops! It looks like you've stumbled upon a page that doesn't exist.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black"
      >
        Go Back Home
      </Link>
    </div>
  );
}