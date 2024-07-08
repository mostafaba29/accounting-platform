import Image from "next/image";
import Link from "next/link";
import { Product } from "./types/ProductTableColumns";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <Link href={`/products/${product._id}`}>
            <div className="w-[350px] h-[350px] flex flex-col items-center justify-between rounded-xl bg-gradient-to-br from-sky-50/75 to-slate-100 cursor-pointer relative group overflow-hidden shadow-lg">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(/imgs/${product.coverImage})` }}></div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-75 transition-opacity duration-300 flex items-center justify-center z-20">
                    <p className="text-white text-sm break-words p-2 h-full flex items-center justify-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        {product.description_EN}
                    </p>
                </div>
                <div className="relative z-10 w-full h-full flex flex-col justify-end">
                    <div className="bg-blue-500 bg-opacity-95 w-[90%] h-[90px] mx-auto p-2 rounded-t-lg text-start">
                        <h2 className="text-large font-semibold text-white">{product.title_EN}</h2>
                        <p className="text-blue-900">{product.category}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
}
