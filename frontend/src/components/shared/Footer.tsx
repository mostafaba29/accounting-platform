"use client";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { Globe, Users, Briefcase, FileText, Phone, Mail, Facebook, Twitter, Instagram, PhoneCall, } from 'lucide-react'; // Icons from lucide-react
// import { fetchContactInfo } from "../api/contactInfo"; // Assumed API call

export default function Footer() {
  // const { data: contactInfo } = useQuery('contactInfo', fetchContactInfo);
  const pathname = usePathname();
  const isRTL = pathname.startsWith('/ar');
  const contactInfo = {
    email: 'jLsZa@example.com',
    mobile: '0123456789',
    whatsapp: '0123456789',
    facebook: 'https://www.facebook.com/',
    twitter: 'https://twitter.com/',
    instagram: 'https://www.instagram.com/',
  }
  const content = {
    en: {
      about: "About Us",
      support: "Support",
      terms: "Terms and Conditions",
      privacy: "Privacy Policy",
      contact: "Contact Us",
      follow: "Follow Us",
      team: "Team",
      clients: "Clients",
      contactLinks: [
        { icon: PhoneCall, text: 'WhatsApp', link: contactInfo?.whatsapp },
        { icon: Phone, text: 'Mobile', link: contactInfo?.mobile },
        { icon: Mail, text: 'Mail', link: contactInfo?.email }
      ],
      socialLinks: [
        { icon: Facebook, link: contactInfo?.facebook },
        { icon: Twitter, link: contactInfo?.twitter },
        { icon: Instagram, link: contactInfo?.instagram }
      ]
    },
    ar: {
      about: "من نحن",
      support: "الدعم",
      terms: "الشروط والأحكام",
      privacy: "سياسة الخصوصية",
      contact: "اتصل بنا",
      follow: "تابعنا",
      team: "الفريق",
      clients: "العملاء",
      contactLinks: [
        { icon: PhoneCall, text: 'واتساب', link: contactInfo?.whatsapp },
        { icon: Phone, text: 'موبايل', link: contactInfo?.mobile },
        { icon: Mail, text: 'بريد', link: contactInfo?.email }
      ],
      socialLinks: [
        { icon: Facebook, link: contactInfo?.facebook },
        { icon: Twitter, link: contactInfo?.twitter },
        { icon: Instagram, link: contactInfo?.instagram }
      ]
    }
  };

  const localeContent = isRTL ? content.ar : content.en;

  return (
    <footer className="bg-transparent text-unitedPrimary py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h2 className="font-semibold mb-4 flex items-center">
              <Globe className="mr-2" />
              {localeContent.about}
            </h2>
            <ul>
              <li><Link href="/team" className="block mb-2 hover:text-unitedSecondary/75">{localeContent.team}</Link></li>
              <li><Link href="/clients" className="block mb-2 hover:text-unitedSecondary/75">{localeContent.clients}</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold mb-4 flex items-center">
              <FileText className="mr-2" />
              {localeContent.support}
            </h2>
            <ul>
              <li><Link href="#" className="block mb-2 hover:text-unitedSecondary/75">{localeContent.terms}</Link></li>
              <li><Link href="#" className="block mb-2 hover:text-unitedSecondary/75">{localeContent.privacy}</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold mb-4">{localeContent.follow}</h2>
            <ul className="flex space-x-4">
              {localeContent.socialLinks.map(({ icon: Icon, link }, index) => (
                <li key={index}>
                  <Link href={link} className="hover:text-unitedSecondary/75">
                    <Icon size={24} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-semibold mb-4">{localeContent.contact}</h2>
            <ul>
              {localeContent.contactLinks.map(({ icon: Icon, text, link }, index) => (
                <li key={index}>
                  <Link href={link} className="mb-2 hover:text-unitedSecondary/75 flex items-center">
                    <Icon className="mr-2" size={16} />
                    {text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <hr className="my-8 border-sky-700" />
        <div className="text-center">
          <p>&copy; 2024 United for F&A consultants. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
