'use client';
import { Product } from '@/components/types/ProductTableColumns';
import {useState,useEffect} from 'react';
import axios from 'axios';
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
export default function ProductsPage(){
    const [products,setProducts] = useState<Product[]>([]);
    const [currentPage,setCurrentPage] = useState(1);
    const [productsPerPage] = useState(16);

    useEffect(()=>{
        fetchProducts();
    },[]);

    const fetchProducts = async ()=>{
        try{
            const response = await axios.get('http://localhost:8000/api/v1/products');
            if (response.data.status === "success" && response.data.data && Array.isArray(response.data.data.data)) {
                setProducts(response.data.data.data);
            } else {
                console.error('Invalid response format:', response.data);
                setProducts([]);
            }
        }catch(error){
            console.log(error);
        }
    }
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = Array.isArray(products) ? products.slice(indexOfFirstProduct, indexOfLastProduct) : [];

    return (
        <div className='w-full'>
        <NavigationBar />
         <div className="container mx-auto py-8">
            <div className="grid grid-cols-4 gap-4">
                 {currentProducts.map((product,id) => (
                    <ProductCard key={id} product={product} />
                ))} 
            </div>
            {/* <div className="mt-4 flex justify-center">
            </div> */}
        </div>
        <Footer /> 
        </div>
    );
}