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
                        <div className="w-full h-72 cursor-pointer">
                            <div className="relative w-full h-full bg-white rounded-lg shadow-lg flex flex-col items-center justify-between text-center p-4">
                                <h2 className="text-xl font-bold mb-2">{product.title_EN}</h2>
                                <p className="text-gray-700">{product.category}</p>
                                <Image src={`/imgs/${product.coverImage}`} alt={product.title_EN} width={125} height={125} className="object-cover" />
                                <p className="text-gray-900 font-semibold">{product.description_EN}</p>
                                <Link href={`/products/${product._id}`}>
                                    <Button className="text-blue-800 font-bold rounded bg-blue-300 hover:bg-blue-400">
                                        View Details
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}
