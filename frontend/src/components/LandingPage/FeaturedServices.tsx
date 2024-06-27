import Image from "next/image"
import {Button} from "@/components/ui/button"
import { Service } from "../types/ServicesTableColumns"
import { sanitizeHtml } from "../Security/dompurify"

interface FeaturedServicesProps {
    services:Service[]
}
export default function FeaturedServices ({services}:FeaturedServicesProps) {
    return (
        <div className="flex flex-row gap-5 m-1 p-4">
            {services.map((service, index) => (
            <div key={index} className="border border-sky-900 p-4 rounded-lg bg-[#fff] w-[300px] flex flex-col items-center justify-between h-[350px] ">
                <h2 className="my-4">{service.title}</h2>
                <p className="text-gray-700">{service.category}</p>
                <Image src={service.coverImage} alt={service.title} width={125} height={125} className="object-cover" />
            <div>
                <div>
                <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(service.body) }} />
                </div>
                <Button className="bg-sky-800 hover:bg-sky-700 ">
                    Read More
                </Button>
            </div>
            </div>
      ))}
    </div>
    )
}