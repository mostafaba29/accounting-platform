import Image from "next/image";
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
  
interface HeaderSectionProps {
    pageTitle:string;
    pageImage:string;
    breadCrumbArr:string[];
    breadCrumbLinkArr:string[];
}
export default function HeaderSection({pageTitle,pageImage,breadCrumbArr,breadCrumbLinkArr}:HeaderSectionProps){
    const bgImageStyle = {
        backgroundImage : `url(/imgs/headersection/${pageImage})`,
        backgroundSize: 'cover',
    }
    return (
        <div className="lg:w-[1500px] md:w-[1000px] w-[600px] h-[125px] shadow-md flex flex-col items-start m-2 " style={bgImageStyle}>
            <div className="w-full h-[50px] flex flex-row items-center">
                <Link href="/"><Home size={48} className="text-white p-3 hover:text-sky-300"/></Link>
                <p className="text-white font-bold text-md ">|</p>
                <div className=" ml-1 flex flex-row">
                    <Breadcrumb>
                        <BreadcrumbList>
                            {breadCrumbArr.map((item,index) => (
                                <BreadcrumbItem key={item}>
                                    <BreadcrumbLink  href={breadCrumbLinkArr[index]} className="text-white font-medium hover:text-sky-300">{item}</BreadcrumbLink>
                                    <p className="text-white font-bold text-md ">|</p>
                                </BreadcrumbItem>
                            ))}
                            <BreadcrumbPage className="text-white font-medium hover:text-gray-300">{pageTitle}</BreadcrumbPage>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </div>
            <div className=" w-full flex flex-row items-center justify-between ">
                <h1 className="text-white font-bold text-3xl p-4">{pageTitle}</h1>
                <div className="flex flex-row mr-4 mt-9">
                <Link href="">
                <Mail size={28} className="text-white ml-4 p-1 rounded-full hover:text-black hover:bg-white "/>
                </Link>
                <Link href="">
                <Facebook size={28} className="text-white ml-4 p-1 rounded-full hover:text-black hover:bg-white "/>
                </Link>
                <Link href="">
                <MessageCircle size={28} className="text-white ml-4 p-1 rounded-full hover:text-black hover:bg-white "/>
                </Link>
                <Link href="">
                <Twitter size={28} className="text-white ml-4 p-1 rounded-full hover:text-black hover:bg-white "/>
                </Link>
            </div>
            </div>
            
        </div>
    );
}