import Image from "next/image"
import {Button} from "@/components/ui/button"
import {Consultation} from "../types/ConsultationTableColumns"
import { motion } from 'framer-motion';
import Link from 'next/link';
interface FeaturedConsultsProps {
    consults:Consultation[];
}
export default function FeaturedConsults ({consults}:FeaturedConsultsProps) {

    return (
        <div className=" px-4 py-4 bg-blue-500/85 w-full "> 
            <h2 className="text-3xl font-bold mb-4 w-full text-center text-white">Available Consults</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                                <div className="absolute w-full h-full bg-white  rounded-lg shadow-lg flex flex-col items-center justify-end text-center backface-hidden bg-cover bg-center "
                                        style={{backgroundImage:`url(/imgs/${consult.coverImage})`}}>
                                    <h2 className="text-lg font-semibold  bg-gray-800 text-white w-full rounded-b-lg">{consult.title_EN}</h2>
                                    {/* <Image src={`/imgs/${consult.coverImage}`} alt={consult.title_EN} width={125} height={125} className="object-cover" /> */}
                                </div>
                                {/* Back Side */}
                                <div className="absolute w-full h-full bg-gray-800 p-2 rounded-lg shadow-lg flex flex-col items-center justify-center transform rotateY-180 backface-hidden border">
                                    <p className="text-white break-words line-clamp-6 mb-3">{consult.description_EN}</p>
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
                </div>
        </div>
    )
}