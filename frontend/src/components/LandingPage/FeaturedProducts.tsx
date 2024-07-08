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
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-4 w-full text-center">Featured Products</h2>
            <Slider {...settings}>
                {products.map(product => (
                    <div key={product._id} className="p-4">
                        <div className="flex items-center justify-center h-[90px] bg-white bg-opacity-75 px-2 py-1 rounded-lg mb-3 text-center">
                            <h2 className="text-lg font-bold">{product.title_EN}</h2>
                        </div>
                        <Link href={`/products/${product._id}`} className="z-10">
                        <div className="w-full h-[350px] cursor-pointer relative group">   
                        <div className="absolute inset-0 bg-cover bg-center rounded-lg shadow-lg flex flex-col items-center justify-between text-center p-4 transition-transform duration-300 group-hover:scale-105"
                            style={{ backgroundImage: `url(/imgs/${product.coverImage})` }}
                            >
                            <div className="absolute inset-0 flex items-end justify-center bg-black bg-opacity-0 group-hover:bg-opacity-75 transition-opacity duration-300">
                                <p className="text-white text-sm break-words p-2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">{product.description_EN}</p>
                            </div>
                            </div> 
                        </div>
                        </Link>
                    </div>
                ))}
            </Slider>
        </div>
    );
}
