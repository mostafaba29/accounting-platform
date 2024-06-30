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
        <Card className="w-80 h-[400px] max-h-[400px] flex flex-col items-center justify-between  rounded-xl  border border-sky-800 ">
            <CardHeader>
                <CardTitle className=" w-full text-center text-black">{product.name}</CardTitle>
            </CardHeader>
            <CardContent className='w-full flex flex-col items-center '>
                <Image src={`/imgs/products/${product.coverImage}`} alt={product.name} width={200} height={200}/> 
                <Badge className="m-1" >Price: ${product.price}</Badge>
                <Link href={`/products/${product._id}`}><Button >View Details</Button></Link>
            </CardContent>
        </Card>
        );
};