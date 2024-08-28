"use client";
import { Mail, Facebook, Phone, MessageCircle } from 'lucide-react';
import HeaderSection from '@/components/shared/HeaderSection';
import NavigationWrapper from '@/components/shared/NavigationWrapper';
import InquiryForm from '@/components/InquiryForm';
import Footer from '@/components/shared/Footer';
import Link from 'next/link';
import { useQuery} from '@tanstack/react-query';
import { fetchContactUsInfo } from '@/lib/api/generalRequests';
import {useTranslations} from 'next-intl';
import LoadingSpinner from '@/components/shared/LoadingSpinner';

export default function ContactUs() {
  const t = useTranslations('contact-us');
  const{data:contactInfo,isLoading,isError,isFetched}=useQuery({
    queryKey: ['contactUsInfo'],
    queryFn:fetchContactUsInfo,
    staleTime: 1000*60*60,
    gcTime: 1000*60*60*24
  })


  if (isLoading) {
    <LoadingSpinner messageAr='جاري تحميل المعلومات' messageEn='Loading data' />
  }

  // if (isError) {
  //   return <div>Error loading data</div>;
  // }

  return (
    <>
      <NavigationWrapper />
        <HeaderSection pageTitle={{en:'Contact us', ar:'اتصل بنا'}} pageImage={'contactUs.jpg'} breadCrumbArr={{en:[],ar:[]}} breadCrumbLinkArr={[]} />
        <div className="my-4 px-4 py-8 lg:w-[1500px] md:w-[1000px] w-[600px] shadow-lg bg-gray-200/85">
          <div className="mb-12 w-full">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 ">{t('title')}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
                  <Link href={`mailto:${contactInfo.email}`}>
                    <Mail className="text-slate-500 hover:text-slate-700" size={48} />
                  </Link>
                <h2 className="text-xl font-semibold mt-4">{t('Email')}</h2>
                <p className="text-gray-600 mt-2">{contactInfo.email}</p>
              </div>
              <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
                  <Link href={contactInfo.facebook}>
                    <Facebook className="text-blue-600 hover:text-blue-800" size={48} />
                  </Link>
                <h2 className="text-xl font-semibold mt-4">{t('Facebook')}</h2>
                <p className="text-gray-600 mt-2">{t('FacebookMessage')}</p>
              </div>
              <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
                  <Link href={contactInfo.whatsapp}>
                    <MessageCircle className="text-green-500 hover:text-green-700" size={48} />
                  </Link>
                <h2 className="text-xl font-semibold mt-4">{t('Whatsapp')}</h2>
                <p className="text-gray-600 mt-2">{t('WhatsappMessage')}</p>
              </div>
              <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
                  <Link href={`tel:${contactInfo.phone}`}>
                    <Phone className="text-slate-500 hover:text-slate-700" size={48} />
                  </Link>
                <h2 className="text-xl font-semibold mt-4">{t('Phone')}</h2>
                <p className="text-gray-600 mt-2">Call us on +20{contactInfo.phone}</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8  ">
            <div className="flex flex-col bg-white shadow-md rounded-xl items-center p-4">
              <p className="text-lg font-medium leading-relaxed text-gray-700 text-center mb-8">{t('InquiryTitle')}</p>
              <InquiryForm />
            </div>
            <div className="bg-white p-4 rounded-xl shadow-md flex flex-col items-start text-start justify-center">
              <h1 className="text-2xl font-bold mb-6 text-center text-gray-700 py-2 ">{t('CompanyInfo')}</h1>
              <p className="text-lg leading-relaxed font-medium text-gray-700 text-center mb-8">Opening hours</p>
              <p className="text-lg leading-relaxed font-medium text-gray-700 text-center mb-8">Monday - Friday: 9am - 5pm</p>
              <p className="text-lg leading-relaxed font-medium text-gray-700 text-center mb-8">123 Main St, Anytown USA</p>
              <p className="text-lg leading-relaxed font-medium text-gray-700 text-center mb-8">Postal code: 12345</p>
            </div>
          </div>
        </div>
    </>
  );
}
