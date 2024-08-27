"use client";
import { Home,Mail, Facebook,  MessageCircle,Twitter } from 'lucide-react';
import Link from "next/link";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
import { useTranslations } from "next-intl";
import {usePathname} from "next/navigation";
  
interface HeaderSectionProps {
    pageTitle:{
        en:string;
        ar:string;
    };
    pageImage:string;
    breadCrumbArr:{
        en:string[];
        ar:string[];
    }
    breadCrumbLinkArr:string[];
}
export default function HeaderSection({pageTitle,pageImage,breadCrumbArr,breadCrumbLinkArr}:HeaderSectionProps){
    // const t = useTranslations('headerSection');
    const pathname = usePathname();
    const isRTL = pathname.startsWith('/ar');
    const lang = isRTL ? 'ar' : 'en';
    const bgImageStyle = {
        backgroundImage : `url(/imgs/headersection/${pageImage})`,
        backgroundSize: 'cover',
    }
    return (
        <div className={`w-full h-[75px] md:h-[125px] lg:h-[250px] shadow-md m-2 text-center flex flex-col justify-between ${isRTL ? 'rtl' : 'ltr'}`} style={bgImageStyle}>
            <div className="w-full h-[50px] flex flex-row items-center">
                <Link href={`/${lang}`}><Home size={48} className="text-white p-3 hover:text-sky-300" /></Link>
                <p className="text-white font-bold text-md">|</p>
                <div className={`ml-1 flex flex-row ${isRTL ? 'mr-1' : 'ml-1'}`}>
                <Breadcrumb>
                    <BreadcrumbList>
                    {breadCrumbArr[lang].map((item, index) => (
                        <BreadcrumbItem key={item}>
                        <BreadcrumbLink href={`/${lang}${breadCrumbLinkArr[index]}`} className="text-white font-medium hover:text-sky-300">{item}</BreadcrumbLink>
                        <p className="text-white font-bold text-md">|</p>
                        </BreadcrumbItem>
                    ))}
                    <BreadcrumbPage className="text-white font-medium hover:text-gray-300">{pageTitle[lang]}</BreadcrumbPage>
                    </BreadcrumbList>
                </Breadcrumb>
                </div>
            </div>
            <h1 className="font-bold text-6xl p-4 text-unitedSecondary/85">{pageTitle[lang]}</h1>
            <div className={`flex flex-row mb-3 w-full ${isRTL ? 'justify-start pl-2' : 'justify-end pr-2'}`}>
                <Link href="">
                <Mail size={28} className="text-white mx-4 p-1 rounded-full hover:text-black hover:bg-white " />
                </Link>
                <Link href="">
                <Facebook size={28} className="text-white mx-4 p-1 rounded-full hover:text-black hover:bg-white " />
                </Link>
                <Link href="">
                <MessageCircle size={28} className="text-white mx-4 p-1 rounded-full hover:text-black hover:bg-white " />
                </Link>
                <Link href="">
                <Twitter size={28} className="text-white mx-4 p-1 rounded-full hover:text-black hover:bg-white " />
                </Link>
            </div>
        </div>
    );
}