"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Service } from "@/components/types/ServicesTableColumns";
import BackButton from "@/components/BackButton";
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";
import Image from "next/image";
import ImageGallery from "@/components/ImageGallery";
import Link from "next/link";
import ReviewSection from "@/components/ReviewSection";
import {Review} from "@/components/types/Review"; 


export default function ServicePage() {
    const pathname = usePathname();
    let id = pathname?.split("/").pop();
    const [serviceData, setServiceData] = useState<Service | null>(null );
    const [reviews, setReviews] = useState<Review[]>([]);

    
    useEffect(() => {
      const fetchReviews = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/api/v1/reviews/${id}`);
          setReviews(response.data.data.data);
        } catch (error) {
          console.error("Error fetching reviews:", error);
        }
    }
    const fetchServiceData = async () => {
      if(id) {
        try {
          const response = await axios.get(`http://localhost:8000/api/v1/services/${id}`);
          setServiceData(response.data.data.data);
        } catch (error) {
          console.error("Error fetching product data:", error);
        }
      }
    }
        fetchServiceData();
        fetchReviews();
      }, [ id ]);
    
    if(!id || !serviceData) {
        return (
            <div>
                <NavigationBar />
                <BackButton text={'Go Back'} link={'/services'}/>
                <div className="container mx-auto py-8">
                    <h1>can't find this Service</h1>
                </div>
                <Footer />
            </div>
        )
    }
    return (
      <div>
        <NavigationBar />
        <BackButton text={'Go Back'} link={'/services'}/>
        <div className="flex flex-row items-start justify-around my-3">
          <ImageGallery coverImage={serviceData.imageCover} images={serviceData.images} type="services"/>
          <div className="flex flex-col items-start">
              <h1 className="text-3xl font-bold mb-4">{serviceData.name}</h1>
              <p className="text-sky-800 mb-6">{serviceData.description}</p>
              <Link href={`/services/${serviceData._id}/whatsContact`}>
              <Button className="bg-sky-600 text-white py-2 px-4 rounded font-semibold hover:bg-sky-500">
                Contact us via whatsapp
              </Button>
              </Link>
          </div>
        </div>  
        <ReviewSection reviews={reviews} id={serviceData._id}/>
      <Footer />
    </div>
    )
}