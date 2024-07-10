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

interface Client {
  name: string;
  images: string[];
}

export default function Home() {
  const [recentBlogs, setRecentBlogs] = useState<Blog[]>([]);
  const [featuredConsults, setFeaturedConsults] = useState<Consultation[]>([]);
  const [popularProducts, setPopularProducts] = useState<Product[]>([]);
  const [clients, setClients] = useState<Client[]>([]);

  const fetchLandingPageData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/content/landingPage"
      );
      setRecentBlogs(response.data.latestBlogs);
      setFeaturedConsults(response.data.consults);
      setPopularProducts(response.data.bestSellingProducts);
      setClients(response.data.clients);
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
      <Introduction />
      <OurServices />
      <FeaturedConsults consults={featuredConsults} /> 
      <RecentBlogs blogs={recentBlogs}/>
      <ClientsSection clients={clients} /> 
      <FeaturedProducts products={popularProducts} />
      <Footer />
    </main>
  );
}
