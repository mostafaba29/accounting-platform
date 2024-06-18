"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {Product} from '@/components/types/ProductTableColumns';
import BackButton from "@/components/BackButton";
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";
import Image from "next/image";
import ImageGallery from "@/components/ImageGallery";
import Link from "next/link";
import ReviewSection from "@/components/ReviewSection";

const reviews = [
  { text: "Great product! Really enjoyed using it.", score: 5 },
  { text: "Pretty good, but could be improved.", score: 4 },
  { text: "Not what I expected.", score: 2 },
  { text: "Excellent quality!", score: 5 },
  { text: "Worth the money.", score: 4 },
  { score: 3 },
  { text: "Amazing! Highly recommend.", score: 5 },
  { text: "Okay product, not the best.", score: 3 },
  { text: "Would buy again.", score: 4 },
  { score: 2 },
  { text: "Not satisfied.", score: 1 },
];
export default function ProductPage() {
    const pathname = usePathname();
    let id = pathname?.split("/").pop();
    const [productData, setProductData] = useState<Product | null>(null );

    useEffect(() => {
        if (id) {
          axios.get(`http://localhost:8000/api/v1/products/${id}`)
            .then(response => {
              const data = response.data.data.data;
              setProductData(data);
              console.log(data);
            })
            .catch(error => console.error("Error fetching product data", error));
        }
      }, [id]);
    
    if(!id || !productData) {
        return (
            <div>
                <NavigationBar />
                <BackButton text={'Go Back'} link={'/products'}/>
                <div className="container mx-auto py-8">
                    <h1>can't find this product</h1>
                </div>
                <Footer />
            </div>
        )
    }
    return (
      <div>
        <NavigationBar />
        <BackButton text={'Go Back'} link={'/products'}/>
        <div className="flex flex-row items-start justify-around my-3">
          <ImageGallery coverImage={productData.coverImage} images={productData.images} type="products"/>
          <div className="flex flex-col items-start">
              <h1 className="text-3xl font-bold mb-4">{productData.name}</h1>
              <p className="text-sky-800 mb-6">{productData.description}</p>
              <p className="text-2xl font-semibold mb-6">$ {productData.price}</p>
              <Link href={`/products/${productData._id}/checkout`}>
              <Button className="bg-sky-600 text-white py-2 px-4 rounded font-semibold hover:bg-sky-500">
                Buy Now
              </Button>
              </Link>
          </div>
        </div>  
        <ReviewSection reviews={reviews} />
      <Footer />
    </div>
    )
}