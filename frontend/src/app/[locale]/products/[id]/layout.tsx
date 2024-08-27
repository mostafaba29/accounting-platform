"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {Product} from '@/components/types/ProductTableColumns';
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/shared/Footer";
import Image from "next/image";
import ImageGallery from "@/components/ImageGallery";
import Link from "next/link";
import ReviewSection from "@/components/ReviewSection";
import {Review} from "@/components/types/Review"; 
import {sanitizeHtml} from "@/components/Security/dompurify";
import HeaderSection from "@/components/shared/HeaderSection";
import { version } from "os";
export default function ProductLayout({ children ,params }: { children: React.ReactNode,params: {id: string} }) {
    const id = params.id;
    const [productData, setProductData] = useState<Product | null>(null );
    const [reviews, setReviews] = useState<Review[]>([]);
    const handlePurchaseClick = async (type:string) => {
        try{
            const response = await axios.post(`http://localhost:8000/api/v1/cart`,{
                productId: id,
                version: type,
            },
            {
                withCredentials: true,
            }
            );
            console.log(response);
        }catch(error){
            console.error(error);
        }
    }
    useEffect(() => {
        const fetchReviews = async () => {
          try {
            const response = await axios.get(`http://localhost:8000/api/v1/products/${id}/reviews`);
            setReviews(response.data.data.data);
          } catch (error) {
            console.error("Error fetching reviews:", error);
          }
        };
      const fetchProductData = async () => {
        if(id) {
          try {
            const response = await axios.get(`http://localhost:8000/api/v1/products/${id}`);
            console.log(response);
            setProductData(response.data.data.data);
          } catch (error) {
            console.error("Error fetching product data:", error);
          }
        }
      }
          fetchProductData();
          fetchReviews();
        }, [ id ]);

    if(!id || !productData) {
        return (
            <div>
                <NavigationBar />
                <div className="container mx-auto py-8">
                    <h1>can't find this product</h1>
                </div>
                <Footer />
            </div>
        )
    }
    return (
        <html lang="en">
            <body className="bg-slate-100">
            <div>
            <NavigationBar />
            <div className='w-full flex flex-col items-center'>
                <HeaderSection pageTitle={productData.title_EN} pageImage={'contactUs.jpg'} breadCrumbArr={['Products']} breadCrumbLinkArr={['/products']} />
                <div className='flex flex-col items-center lg:w-[1500px] md:w-[1000px] w-[600px] bg-slate-100/85 shadow-lg'>
                <div>
                    <div className="lg:w-[1500px] md:w-[1000px] w-[600px] flex flex-row items-start justify-between my-3 py-2 px-4">
                        <div className="flex flex-col items-start w-[700px] h-[615px] justify-between">
                            <div>
                                <h1 className="text-2xl font-bold mb-6">Product Info</h1>
                                <div className="text-black mb-6" dangerouslySetInnerHTML={{ __html: sanitizeHtml(productData.body_EN) }} />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold mb-6">Available Versions</h1>
                            <div className="grid gird-cols-1 lg:grid-cols-3 gap-5 ">
                                <div>
                                    <Button onClick={()=>handlePurchaseClick('basic_version')}
                                    className="bg-sky-600 text-medium text-white py-2 px-4 rounded font-semibold  w-[225px] hover:bg-sky-500 ">
                                    Buy Basic Version for  $ {productData.basic_version.price}
                                    </Button>
                                </div>
                                <div>
                                    <Link href={`/products/${productData._id}/checkout`}>
                                    <Button className="bg-sky-600 text-medium text-white py-2 px-4 rounded font-semibold w-[225px] hover:bg-sky-500 ">
                                    Buy Open Version for  $ {productData.open_version.price}
                                    </Button>
                                    </Link>
                                </div>
                                <div>
                                    <Link href={`/products/${productData._id}/checkout`}>
                                    <Button className="bg-sky-600 text-medium text-white py-2 px-4 rounded font-semibold w-[225px]  hover:bg-sky-500 ">
                                    Buy editable Version for  $ {productData.editable_version.price}
                                    </Button>
                                    </Link>
                                </div>
                            </div>
                            </div>
                        </div> 
                        <div className="w-[650px]">
                            <ImageGallery coverImage={productData.coverImage} images={productData.images} /> 
                            
                        </div>
                    </div>
                </div>  
                </div>
                <ReviewSection reviews={reviews} id={productData._id}/> 
            </div >
            <div>
                {children}
            </div>
            </div>
            <Footer /> 
            </body>
        </html>
    );
}