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
import Link from "next/link";
import {Review} from "@/components/types/Review"; 
import { sanitizeHtml } from "@/components/Security/dompurify";
import HeaderSection from "@/components/HeaderSection";


export default function ConsultPage({params}: {params: {id: string}}) {
    let id = params.id;
    const [consultData, setConsultData] = useState<Consultation | null>(null );
    const [reviews, setReviews] = useState<Review[]>([]);

    
    useEffect(() => {

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
        <div className="flex flex-col items-center ">
        <HeaderSection pageTitle={consultData.title_EN} pageImage="contactUs.jpg" breadCrumbArr={['Consults']} breadCrumbLinkArr={['/consults']}/>
        <div className="lg:w-[1500px] md:w-[1000px] w-[600px] flex flex-col items-start justify-around my-3 bg-gradient-to-br from-slate-50/50 to-sky-50/50 p-3 shadow-lg">
          <div className="flex flex-row items-start ">
              <Image src={`/imgs/${consultData.coverImage}`} alt={consultData.title_EN} width={300} height={400} className="w-[300px] h-[400px] object-cover p-2"/>
              <div className="m-2 p-3">
              <h1 className="text-3xl font-bold mb-4 text-zinc-900">What is {consultData.title_EN} ?</h1>
              <p className="text-gray-200 font-medium text-lg break-words ">{consultData.description_EN}</p>
              </div>
              
          </div>
          <div className="w-full p-2 m-1 flex flex-row justify-between items-end">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-zinc-900 ">What will you get ?</h3>
              <div 
                className="text-gray-200 text-lg font-medium mb-6 w-[700px] break-words" 
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(consultData.body_EN) }}
              /> 
              <h3 className="text-xl font-bold mb-4 text-zinc-900 ">Available Consults</h3>
              <div className="grid grid-cols-2 gap-1 w-[500px]">
                <Link href={`/consults/${consultData._id}/whatsContact`}>
                  <Button className="bg-slate-800 text-white w-[175px] py-2 px-4 rounded font-semibold hover:bg-slate-700">
                      15 min consult
                  </Button>
                </Link>
                <Link href={`/consults/${consultData._id}/whatsContact`}>
                  <Button className="bg-slate-800 text-white w-[175px] py-2 px-4 rounded font-semibold hover:bg-slate-700">
                      1 Hr Consult
                  </Button>
                </Link>
                <Link href={`/consults/${consultData._id}/whatsContact`}>
                  <Button className="bg-slate-800 text-white w-[175px] py-2 px-4 rounded font-semibold hover:bg-slate-700">
                      Personal visit to us 
                  </Button>
                </Link>
                <Link href={`/consults/${consultData._id}/whatsContact`}>
                  <Button className="bg-slate-800 text-white w-[175px] py-2 px-4 rounded font-semibold hover:bg-slate-700">
                      Personal visit to you 
                  </Button>
                </Link>
              </div> 
            </div>
            <div >
              {(consultData.images.map((image, index) => (
                <Image key={index} src={`/imgs/${image}`} alt={consultData.title_EN} width={300} height={200} className="w-[300px] h-[200px] object-cover p-2"/>
              ))
              )}
            </div>
          </div>
        </div>  
        </div>
      <Footer />
    </div>
    )
}