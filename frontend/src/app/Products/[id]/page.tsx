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
import Link from "next/link";

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
        <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row">
        <div className="flex-shrink-0 mb-4 md:mb-0 md:w-1/2">
          <Image
            src={`/imgs/products/${productData.coverImage}`}
            alt={productData.name}
            width={500}
            height={500}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="md:ml-8 md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{productData.name}</h1>
          <p className="text-gray-700 mb-6">{productData.description}</p>
          <p className="text-2xl font-semibold mb-6">${productData.price}</p>
          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Buy Now
          </button>
          {productData.images && productData.images.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">More Images</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {productData.images.map((image, index) => (
                  <Image
                    key={index}
                    src={`/imgs/products/${image}`}
                    alt={`${productData.name} image ${index + 1}`}
                    width={200}
                    height={200}
                    className="object-cover w-full h-full"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    <Footer />
    </div>
    )
}