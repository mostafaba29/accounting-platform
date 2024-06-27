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
        <Card className="w-80 h-[400px] flex flex-col items-center justify-between rounded-lg ">
            <CardHeader >
                <CardTitle>{service.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <Image src={`/imgs/services/${service.coverImage}`} alt={service.title} width={200} height={200} className="object-fit w-[200px] h-[200px]"/> 
            </CardContent>
            <CardFooter>
                <Link href={`/services/${service._id}`}><Button >View Details</Button></Link>
            </CardFooter>
        </Card>
    );
}   