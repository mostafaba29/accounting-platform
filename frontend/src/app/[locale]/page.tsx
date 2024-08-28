"use client";
import NavigtionWrapper from "@/components/shared/NavigationWrapper";
import Footer from "@/components/shared/Footer";
import Introduction from "@/components/shared/LandingPage/Introduction";
import RecentBlogs from "@/components/shared/LandingPage/RecentBlogs";
import FeaturedConsults from "@/components/shared/LandingPage/FeaturedConsults";
import FeaturedProducts from "@/components/shared/LandingPage/FeaturedProducts";
import OurFeatures from "@/components/shared/LandingPage/OurFeatures";
import ClientsSection from "@/components/shared/LandingPage/ClientsSection";
import axios from "axios";
import { Blog } from "@/components/types/BlogTableColumns";
import { Consultation } from "@/components/types/ConsultationTableColumns";
import {Product} from "@/components/types/ProductTableColumns";
import { useQueryClient,useQuery } from "@tanstack/react-query";
import { fetchLandingPageData,fetchLandingPageContent } from "@/lib/api/generalRequests";
import { usePathname } from "next/navigation";



export default function Home() {
  const pathname = usePathname();
  const isRtl = pathname.startsWith('/ar');

  const {data:data,isLoading,isError,isFetched} = useQuery({
    queryKey:['landingPage'],
    queryFn:fetchLandingPageData,
    staleTime: 1000*60*60,
    gcTime: 1000*60*60*24,
  })
  
  return (
    <>
      <NavigtionWrapper />
      <main >
      {isFetched && (
        <>
          {isRtl ? 
          <>
            <Introduction locale='ar' text={data.intro_AR} />
            <OurFeatures locale='ar' />
            <FeaturedConsults consults={data.consults} locale='ar' />
            <FeaturedProducts products={data.bestSellingProducts}  locale='ar'/>
          </> : 
          <>
            <Introduction locale='en' text={data.intro_EN} />
            <OurFeatures locale='en' />
            <FeaturedConsults consults={data.consults} locale='en' />
            <FeaturedProducts products={data.bestSellingProducts}  locale='en' />
          </>}   
          {/* <RecentBlogs blogs={data.recentBlogs}/> */}
        </>
      )}
      </main>
      <Footer />
    </>
  );
}
