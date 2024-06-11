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
        <Card className="w-80 flex flex-col items-center ">
            <CardHeader className="w-full flex flex-col items-center text-center">
                <CardTitle>{product.name}</CardTitle>
                <Image src={`/imgs/products/${product.coverImage}`} alt={product.name} width={200} height={200}/> 
            </CardHeader>
            <CardContent>
                <CardDescription>{product.description}</CardDescription>
            </CardContent>
            <CardFooter className="w-full flex flex-row justify-between items-end bg-slate-200 ">
                <Link href={`/products/${product._id}`}><Button >View Details</Button></Link>
                <Badge>Price: ${product.price}</Badge>
            </CardFooter>
        </Card>
        );
};