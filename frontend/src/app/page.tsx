"use client";
import Image from "next/image";
import {useState,useEffect} from "react";
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";
import OurVision from "@/components/LandingPage/OurVision";
import RecentBlogs from "@/components/LandingPage/RecentBlogs";
import FeaturedServices from "@/components/LandingPage/FeaturedServices";
import FeaturedProducts from "@/components/LandingPage/FeaturedProducts";
import axios from "axios";
import { Blog } from "@/components/types/BlogTableColumns";
import { Service } from "@/components/types/ServicesTableColumns";
import {Product} from "@/components/types/ProductTableColumns";


export default function Home() {
  const [recentBlogs, setRecentBlogs] = useState<Blog[]>([]);
  const [featuredServices, setFeaturedServices] = useState<Service[]>([]);
  const [popularProducts, setPopularProducts] = useState<Product[]>([]);

  const fetchLandingPageData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/content/landingPage"
      );

      console.log(response.data);
      setRecentBlogs(response.data.latestBlogs);
      setFeaturedServices(response.data.featuredServices);
      setPopularProducts(response.data.bestSellingProducts);
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
      {/* <RecentBlogs blogs={recentBlogs}/> */}
      <FeaturedServices services={featuredServices} />  
      <FeaturedProducts products={popularProducts} />
      <Footer />
    </main>
  );
}
