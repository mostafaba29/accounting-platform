"use client";
import { Mail, Facebook, Phone, MessageCircle } from 'lucide-react';
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/Footer';

export default function ContactUs() {
  return (
    <>
      <NavigationBar />
      <div className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Contact Us</h1>
          <p className="text-lg leading-relaxed text-gray-700 text-center mb-8">
            We are here to assist you with all your accounting needs. Please choose one of the following contact methods to reach out to us.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
              <Mail className="text-slate-500" size={48} />
              <h2 className="text-xl font-semibold mt-4">Email</h2>
              <p className="text-gray-600 mt-2">info@yourcompany.com</p>
            </div>
            <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
              <button onClick={() => window.open('https://www.facebook.com/yourcompany', '_blank')}>
                <Facebook className="text-blue-600" size={48} />
                <h2 className="text-xl font-semibold mt-4">Facebook</h2>
              </button>
              <p className="text-gray-600 mt-2">Follow us on Facebook</p>
            </div>
            <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
              <button onClick={() => window.open('https://wa.me/yourcompanynumber', '_blank')}>
                <MessageCircle className="text-green-500" size={48} />
                <h2 className="text-xl font-semibold mt-4">WhatsApp</h2>
              </button>
              <p className="text-gray-600 mt-2">Chat with us on WhatsApp</p>
            </div>
            <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
              <Phone className="text-slate-500" size={48} />
              <h2 className="text-xl font-semibold mt-4">Phone</h2>
              <p className="text-gray-600 mt-2">+123-456-7890</p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
