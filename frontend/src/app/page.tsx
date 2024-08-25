"use client";
import Image from "next/image";
import {useState,useEffect} from "react";
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";
import Introduction from "@/components/LandingPage/Introduction";
import RecentBlogs from "@/components/LandingPage/RecentBlogs";
import FeaturedConsults from "@/components/LandingPage/FeaturedConsults";
import FeaturedProducts from "@/components/LandingPage/FeaturedProducts";
import OurServices from "@/components/LandingPage/OurServices";
import ClientsSection from "@/components/LandingPage/ClientsSection";
import axios from "axios";
import { Blog } from "@/components/types/BlogTableColumns";
import { Consultation } from "@/components/types/ConsultationTableColumns";
import {Product} from "@/components/types/ProductTableColumns";
import { useQueryClient,useQuery } from "@tanstack/react-query";
import { fetchLandingPageData } from "@/lib/api/generalRequests";



export default function Home() {
  const {data:data,isLoading,isError,isFetched} = useQuery({
    queryKey:['landingPage'],
    queryFn:fetchLandingPageData,
    staleTime: 1000*60*60,
    gcTime: 1000*60*60*24,
  })
  
  return (
    <>
      <NavigationBar />
      <main >
      <Introduction />
      <OurServices />
      {isFetched && (
        <>
          <FeaturedConsults consults={data.consults} /> 
          <RecentBlogs blogs={data.recentBlogs}/>
          <ClientsSection clients={data.clients} /> 
          <FeaturedProducts products={data.bestSellingProducts} />
        </>
      )}
      </main>
      <Footer />
    </>
  );
}
