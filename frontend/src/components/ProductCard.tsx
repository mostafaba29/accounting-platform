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
import { Product } from "./types/ProductTableColumns"

interface ProductCardProps {
    product: Product;
}
export default function ProductCard({product}: ProductCardProps) {
    return(
        <div className="w-[350px] h-[450px] flex flex-col items-center justify-between rounded-xl  bg-gradient-to-br from-sky-50/75 to-slate-100 ">
            <div>
                <div className="w-full h-[75px] text-center text-black text-xl font-semibold py-1 px-2">{product.title_EN}</div>
            </div>
            <div className='w-full flex flex-col items-center px-1'>
                <Image src={`/imgs/${product.coverImage}`} alt={product.title_EN} width={200} height={200} className="w-[200px] h-[200px] object-cover"/> 
                <p className="text-black line-clamp-5">{product.description_EN}</p>
            </div>
            <div className='p-1'>
            <Link href={`/products/${product._id}`}><Button className="text-zinc-800  bg-transparent hover:bg-sky-200">View Details</Button></Link>
            </div>
        </div>
        );
};