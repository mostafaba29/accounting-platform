"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Mail, Facebook, Phone, MessageCircle } from 'lucide-react';
import HeaderSection from '@/components/HeaderSection';
import NavigationBar from '@/components/NavigationBar';
import InquiryForm from '@/components/InquiryForm';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function ContactUs() {
  const [data, setData] = useState(null); // Initialize as null
  const [loading, setLoading] = useState(true); // Loading state

  const fetchContactUs = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/contact');
      setData(response.data.data.data[0]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchContactUs();
  }, []);

  if (loading) {
    return <div>
      <NavigationBar />
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl font-semibold text-white">Loading...</div>
      </div>
      <Footer />
    </div>;
  }

  if (!data) {
    return <div>Error loading data</div>;
  }

  return (
    <>
      <NavigationBar />
      <div className="flex flex-col items-center">
        <HeaderSection pageTitle={'Contact Us'} pageImage={'contactUs.jpg'} breadCrumbArr={[]} breadCrumbLinkArr={[]} />
        <div className="my-4 px-4 py-8 lg:w-[1500px] md:w-[1000px] w-[600px] shadow-lg bg-gray-200/85">
          <div className="mb-12 w-full">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 bg-slate-100 py-2 rounded-xl shadow-md">Reach us on our social media platforms</h1>
            <div className="bg-slate-100 py-2 rounded-xl shadow-md flex flex-col items-center text-center">
              <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 bg-slate-100 py-2 rounded-xl shadow-md">Adress</h1>
              <p className="text-lg leading-relaxed text-gray-700 text-center mb-8">123 Main St, Anytown USA</p>
              <p className="text-lg leading-relaxed text-gray-700 text-center mb-8">Postal code: 12345</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
                {data.email && (
                  <Link href={`mailto:${data.email}`}>
                    <Mail className="text-slate-500 hover:text-slate-700" size={48} />
                  </Link>
                )}
                <h2 className="text-xl font-semibold mt-4">Email</h2>
                <p className="text-gray-600 mt-2">{data.email}</p>
              </div>
              <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
                {data.facebook && (
                  <Link href={data.facebook}>
                    <Facebook className="text-blue-600 hover:text-blue-800" size={48} />
                  </Link>
                )}
                <h2 className="text-xl font-semibold mt-4">Facebook</h2>
                <p className="text-gray-600 mt-2">Message us on Facebook</p>
              </div>
              <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
                {data.whatsapp && (
                  <Link href={data.whatsapp}>
                    <MessageCircle className="text-green-500 hover:text-green-700" size={48} />
                  </Link>
                )}
                <h2 className="text-xl font-semibold mt-4">WhatsApp</h2>
                <p className="text-gray-600 mt-2">Chat with us on WhatsApp</p>
              </div>
              <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
                {data.phone && (
                  <Link href={`tel:${data.phone}`}>
                    <Phone className="text-slate-500 hover:text-slate-700" size={48} />
                  </Link>
                )}
                <h2 className="text-xl font-semibold mt-4">Phone</h2>
                <p className="text-gray-600 mt-2">Call us on +20{data.phone}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg leading-relaxed text-gray-700 text-center mb-8">Send us your inquiry and we will get back to you within 24 hours</p>
            <InquiryForm />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
