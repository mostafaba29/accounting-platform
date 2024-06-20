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
import { Service } from "./types/ServicesTableColumns"

interface ServiceCardProps {
    service: Service;
}

export default function ServiceCard( {service}: ServiceCardProps) {

    return (
        <Card className="w-80 flex flex-col items-center justify-between ">
            <CardHeader className="w-full flex flex-col items-center text-center">
                <CardTitle>{service.name}</CardTitle>
                <Image src={`/imgs/services/${service.imageCover}`} alt={service.name} width={200} height={200}/> 
            </CardHeader>
            <CardContent>
                <CardDescription>{service.description}</CardDescription>
            </CardContent>
            <CardFooter className="w-full flex flex-row justify-between items-end bg-slate-200 ">
                <Link href={`/services/${service._id}`}><Button >View Details</Button></Link>
            </CardFooter>
        </Card>
    );
}   