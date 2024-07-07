import Image from "next/image"
import {Button} from "@/components/ui/button"
import {Consultation} from "../types/ConsultationTableColumns"
import { motion } from 'framer-motion';
import Slider from "react-slick";
import Link from 'next/link';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
interface FeaturedConsultsProps {
    consults:Consultation[];
}
export default function FeaturedConsults ({consults}:FeaturedConsultsProps) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
    };
    return (
        <div className="container my-4 px-4 py-4  shadow-lg"> 
            <h2 className="text-3xl font-bold mb-4 w-full text-center text-white">Featured Consults</h2>
            <Slider {...settings}>
                {consults.map(consult => (
                    <div key={consult._id} className="p-4">
                        <motion.div
                            className="w-full h-72 perspective-1000 cursor-pointer"
                            whileHover={{ rotateY: 180 }}
                            transition={{ duration: 0.6 }}
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            <div className="relative w-full h-full transition-transform duration-500 transform-style-preserve-3d">
                                {/* Front Side */}
                                <div className="absolute w-full h-full bg-white p-2 rounded-lg shadow-lg flex flex-col items-center justify-between text-center backface-hidden border">
                                    <h2 className="text-xl font-bold mb-2">{consult.title_EN}</h2>
                                    <Image src={`/imgs/${consult.coverImage}`} alt={consult.title_EN} width={125} height={125} className="object-cover" />
                                    <p className="text-gray-700">{consult.category}</p>
                                    
                                </div>
                                {/* Back Side */}
                                <div className="absolute w-full h-full bg-sky-50 p-2 rounded-lg shadow-lg flex flex-col items-center justify-center transform rotateY-180 backface-hidden border">
                                    <p className="text-gray-700 break-words line-clamp-6 mb-1">{consult.description_EN}</p>
                                    <Link href={`/consults/${consult._id}`}>
                                        <Button className="text-blue-800 font-bold py-2 px-4 rounded bg-blue-300 hover:bg-blue-400">
                                            View Details
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                ))}
            </Slider>
        </div>
    )
}