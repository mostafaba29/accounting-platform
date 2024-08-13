"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Mail, Facebook, Phone, MessageCircle } from 'lucide-react';
import HeaderSection from '@/components/HeaderSection';
import NavigationBar from '@/components/NavigationBar';
import InquiryForm from '@/components/InquiryForm';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useQueryClient,useQuery,useMutation } from '@tanstack/react-query';
import { fetchContactUsInfo } from '@/lib/api/generalRequests';

export default function ContactUs() {
  // const [data, setData] = useState(null); 
  // const [loading, setLoading] = useState(true); 

  const{data:contactInfo,isLoading,isError,isFetched}=useQuery({
    queryKey: ['contactUsInfo'],
    queryFn:fetchContactUsInfo,
    staleTime: 1000*60*60,
    gcTime: 1000*60*60*24
  })

  // const fetchContactUs = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:8000/api/v1/contact');
  //     setData(response.data.data.data[0]);
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoading(false); 
  //   }
  // };

  // useEffect(() => {
  //   fetchContactUs();
  // }, []);

  if (isLoading) {
    return <div>
      <NavigationBar />
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl font-semibold text-white">Loading...</div>
      </div>
      <Footer />
    </div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  return (
    <>
      <NavigationBar />
      <main className="flex flex-col items-center">
        <HeaderSection pageTitle={'Contact Us'} pageImage={'contactUs.jpg'} breadCrumbArr={[]} breadCrumbLinkArr={[]} />
        <div className="my-4 px-4 py-8 lg:w-[1500px] md:w-[1000px] w-[600px] shadow-lg bg-gray-200/85">
          <div className="mb-12 w-full">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 bg-white py-2 rounded-xl shadow-md">Reach us on our social media platforms</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
                  <Link href={`mailto:${contactInfo.email}`}>
                    <Mail className="text-slate-500 hover:text-slate-700" size={48} />
                  </Link>
                <h2 className="text-xl font-semibold mt-4">Email</h2>
                <p className="text-gray-600 mt-2">{contactInfo.email}</p>
              </div>
              <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
                  <Link href={contactInfo.facebook}>
                    <Facebook className="text-blue-600 hover:text-blue-800" size={48} />
                  </Link>
                <h2 className="text-xl font-semibold mt-4">Facebook</h2>
                <p className="text-gray-600 mt-2">Message us on Facebook</p>
              </div>
              <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
                  <Link href={contactInfo.whatsapp}>
                    <MessageCircle className="text-green-500 hover:text-green-700" size={48} />
                  </Link>
                <h2 className="text-xl font-semibold mt-4">WhatsApp</h2>
                <p className="text-gray-600 mt-2">Chat with us on WhatsApp</p>
              </div>
              <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
                  <Link href={`tel:${contactInfo.phone}`}>
                    <Phone className="text-slate-500 hover:text-slate-700" size={48} />
                  </Link>
                <h2 className="text-xl font-semibold mt-4">Phone</h2>
                <p className="text-gray-600 mt-2">Call us on +20{contactInfo.phone}</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8  ">
            <div className="flex flex-col bg-white shadow-md rounded-xl items-center p-4">
              <p className="text-lg font-medium leading-relaxed text-gray-700 text-center mb-8">Send us your inquiry and we will get back to you within 24 hours</p>
              <InquiryForm />
            </div>
            <div className="bg-white p-4 rounded-xl shadow-md flex flex-col items-start text-start justify-center">
              <h1 className="text-2xl font-bold mb-6 text-center text-gray-700 py-2 ">Info</h1>
              <p className="text-lg leading-relaxed font-medium text-gray-700 text-center mb-8">Opening hours</p>
              <p className="text-lg leading-relaxed font-medium text-gray-700 text-center mb-8">Monday - Friday: 9am - 5pm</p>
              <p className="text-lg leading-relaxed font-medium text-gray-700 text-center mb-8">123 Main St, Anytown USA</p>
              <p className="text-lg leading-relaxed font-medium text-gray-700 text-center mb-8">Postal code: 12345</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
