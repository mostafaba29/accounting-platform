import Link from 'next/link';
import NavigationBar from '@/components/en/NavigationBar';
import Footer from '@/components/shared/Footer';
import { Home } from 'lucide-react';

export default function Custom404() {
  return (
    <>
      <NavigationBar />
      <main className="flex-grow flex items-center justify-center  h-[53vh]">
        <div className="text-center p-8  rounded-lg">
          <h1 className="text-9xl font-bold text-unitedPrimary mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-600 mb-4">Page Not Found</h2>
          <p className="text-gray-500 mb-8">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
          <Link href="/" className="bg-unitedPrimary hover:bg-sky-600 text-white font-bold py-2 px-4 rounded transition duration-300">
            <Home className="inline-block" /> Home page
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}