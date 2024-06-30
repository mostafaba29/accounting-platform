import { motion } from 'framer-motion';
import Slider from "react-slick";
import Link from 'next/link';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Product } from '../types/ProductTableColumns';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface FeaturedProductsProps {
    products: Product[];
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
    };

    return (
        <div className="container mx-auto px-4 py-8  ">
            <h2 className="text-3xl font-bold mb-4 w-full text-center">Featured Products</h2>
            <Slider {...settings}>
                {products.map(product => (
                    <div key={product._id} className="p-4">
                        <motion.div
                            className="w-full h-72 perspective-1000 cursor-pointer"
                            whileHover={{ rotateY: 180 }}
                            transition={{ duration: 0.6 }}
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            <div className="relative w-full h-full transition-transform duration-500 transform-style-preserve-3d">
                                {/* Front Side */}
                                <div className="absolute w-full h-full bg-white rounded-lg shadow-lg flex flex-col items-center justify-between text-center backface-hidden">
                                    <h2 className="text-xl font-bold mb-2">{product.name}</h2>
                                    <p className="text-gray-700">{product.category}</p>
                                    <Image src={`/imgs/products/${product.coverImage}`} alt={product.name} width={125} height={125} className="object-cover" />
                                    <p className="text-gray-900 font-semibold">${product.price}</p>
                                </div>
                                {/* Back Side */}
                                <div className="absolute w-full h-full bg-sky-50 rounded-lg shadow-lg flex items-center justify-center transform rotateY-180 backface-hidden">
                                    <Link href={`/products/${product._id}`}>
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
    );
}
