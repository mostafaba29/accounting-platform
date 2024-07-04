"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Consultation } from "@/components/types/ConsultationTableColumns";
import BackButton from "@/components/BackButton";
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";
import Image from "next/image";
import ImageGallery from "@/components/ImageGallery";
import Link from "next/link";
import ReviewSection from "@/components/ReviewSection";
import {Review} from "@/components/types/Review"; 
import { sanitizeHtml } from "@/components/Security/dompurify";


export default function ConsultPage({params}: {params: {id: string}}) {
    let id = params.id;
    const [consultData, setConsultData] = useState<Consultation | null>(null );
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
    const fetchConsultData = async () => {
      if(id) {
        try {
          const response = await axios.get(`http://localhost:8000/api/v1/consults/${id}`);
          setConsultData(response.data.data.data);
        } catch (error) {
          console.error("Error fetching product data:", error);
        }
      }
    }
        fetchConsultData();
        fetchReviews();
      }, [ id ]);
    
    if(!id || !consultData) {
        return (
            <div>
                <NavigationBar />
                <BackButton text={'Go Back'} link={'/consults'}/>
                <div className="container mx-auto py-8">
                    <h1>can't find this Consult</h1>
                </div>
                <Footer />
            </div>
        )
    }
    return (
      <div>
        <NavigationBar />
        <BackButton text={'Go Back'} link={'/consults'}/>
        <div className="flex flex-row items-start justify-around my-3">
          <div className="flex flex-col items-start w-[700px]">
              <h1 className="text-3xl font-bold mb-4">{consultData.title_EN}</h1>
              <div 
                className="text-sky-800 mb-6 w-[700px] break-words" 
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(consultData.body_EN) }}
              />
              <div className="grid grid-cols-2 gap-4">
                <Link href={`/consults/${consultData._id}/whatsContact`}>
                  <Button className="bg-sky-600 w-[200px] text-white py-2 px-4 rounded font-semibold hover:bg-sky-500">
                      15 min consult
                  </Button>
                </Link>
                <Link href={`/consults/${consultData._id}/whatsContact`}>
                  <Button className="bg-sky-600 w-[200px] text-white py-2 px-4 rounded font-semibold hover:bg-sky-500">
                      1 hour consult
                  </Button>
                </Link>
                <Link href={`/consults/${consultData._id}/whatsContact`}>
                  <Button className="bg-sky-600 w-[200px] text-white py-2 px-4 rounded font-semibold hover:bg-sky-500">
                      Personal visit to us 
                  </Button>
                </Link>
                <Link href={`/consults/${consultData._id}/whatsContact`}>
                  <Button className="bg-sky-600 w-[200px] text-white py-2 px-4 rounded font-semibold hover:bg-sky-500">
                      Personal visit ot you 
                  </Button>
                </Link>
              </div> 
          </div>
          <ImageGallery coverImage={consultData.coverImage} images={consultData.images} />
        </div>  
        <ReviewSection reviews={reviews} id={consultData._id}/>
      <Footer />
    </div>
    )
}