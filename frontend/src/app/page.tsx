"use client";
import Image from "next/image";
import {useState,useEffect} from "react";
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";
import OurVision from "@/components/LandingPage/OurVision";
import RecentBlogs from "@/components/LandingPage/RecentBlogs";
import FeaturedConsults from "@/components/LandingPage/FeaturedConsults";
import FeaturedProducts from "@/components/LandingPage/FeaturedProducts";
import axios from "axios";
import { Blog } from "@/components/types/BlogTableColumns";
import { Consultation } from "@/components/types/ConsultationTableColumns";
import {Product} from "@/components/types/ProductTableColumns";


export default function Home() {
  const [recentBlogs, setRecentBlogs] = useState<Blog[]>([]);
  const [featuredConsults, setFeaturedConsults] = useState<Consultation[]>([]);
  const [popularProducts, setPopularProducts] = useState<Product[]>([]);

  const fetchLandingPageData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/content/landingPage"
      );

      console.log(response.data);
      setRecentBlogs(response.data.latestBlogs);
      setFeaturedConsults(response.data.bestConsults);
      setPopularProducts(response.data.topRatedProducts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLandingPageData();
  }, []);
  
  return (
    <main >
      <NavigationBar />
      <OurVision />
      <FeaturedConsults consults={featuredConsults} /> 
      <RecentBlogs blogs={recentBlogs}/>
      <FeaturedProducts products={popularProducts} />
      <Footer />
    </main>
  );
}
