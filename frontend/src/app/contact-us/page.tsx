
import { Mail, Facebook, Phone, MessageCircle } from 'lucide-react';
import HeaderSection from '@/components/HeaderSection';
import NavigationBar from '@/components/NavigationBar';
import InquiryForm from '@/components/InquiryForm';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function ContactUs() {
  return (
    <>
      <NavigationBar />
      <div className="flex flex-col items-center">
      <HeaderSection pageTitle={'Contact Us'} pageImage={'contactUs.jpg'} breadCrumbArr={[]} />
      <div className="container mx-auto px-4 py-8 lg:w-[1500px] md:w-[1000px] w-[600px]">
        <section className="mb-12 ">
          <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Reach us on our social media platforms</h1>
          {/* <p className="text-lg leading-relaxed text-gray-700 text-center mb-8">
            We are here to assist you with all your accounting needs. Please choose one of the following contact methods to reach out to us.
          </p> */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
              <Link href="mailto:info@yourcompany.com">
              <Mail className="text-slate-500 hover:text-slate-700" size={48} />
              </Link>
              <h2 className="text-xl font-semibold mt-4">Email</h2>
              <p className="text-gray-600 mt-2">info@yourcompany.com</p>
            </div>
            <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
                <Link href="https://www.facebook.com/yourcompany">
                <Facebook className="text-blue-600 hover:text-blue-800" size={48} />
                </Link>
                <h2 className="text-xl font-semibold mt-4">Facebook</h2>
                <p className="text-gray-600 mt-2">Messege us on Facebook</p>
            </div>
            <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
                <Link href="https://wa.me/+1234567890">
                <MessageCircle className="text-green-500 hover:text-green-700" size={48} />
                </Link>
                <h2 className="text-xl font-semibold mt-4">WhatsApp</h2>
                <p className="text-gray-600 mt-2">Chat with us on WhatsApp</p>
            </div>
            <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
              <Link href="tel:+1234567890">
              <Phone className="text-slate-500 hover:text-slate-700" size={48} />
              </Link>
              <h2 className="text-xl font-semibold mt-4">Phone</h2>
              <p className="text-gray-600 mt-2">Call us on +123-456-7890</p>
            </div>
          </div>
        </section>
        <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
          <p className="text-lg leading-relaxed text-gray-700 text-center mb-8">Sends us your inquiry and we will get back to you within 24 hours</p>
          <InquiryForm />
        </div>
      </div>
      </div>
      <Footer />
    </>
  );
}
