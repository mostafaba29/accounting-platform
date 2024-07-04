import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import Image from "next/image";
import {Button} from "./ui/button";
import { Badge } from "@/components/ui/badge"
import Link from "next/link";
import { Consultation } from "./types/ConsultationTableColumns"

interface consultCardProps {
    consult: Consultation;
}

export default function ConsultCard( {consult}: consultCardProps) {

    return (
        <div className="w-80 h-[450px]  flex flex-col items-center  rounded-xl  border border-sky-800 ">
            <div className="w-full text-center text-black m-1 h-[100px]  flex items-center justify-center">
                <h2 className=" text-sky-900 text-xl font-semibold break-words w-full">{consult.title_EN}</h2>
            </div>
            <div className="w-full flex flex-col items-center justify-center h-[225px]">
                <Image src={`/imgs/${consult.coverImage}`} alt={consult.title_EN} width={200} height={200}/>
            </div>
            <div className="w-full flex flex-col items-center justify-center h-[75px]">
                <p className="w-full text-center text-black break-words line-clamp-3">{consult.description_EN}</p>
            </div>
            <div className='w-full flex flex-col items-center h-[50px]'>
                <Link href={`/consults/${consult._id}`}><Button className="bg-sky-700 hover:bg-sky-600" >View Details</Button></Link>
            </div>
        </div>
    );
}   