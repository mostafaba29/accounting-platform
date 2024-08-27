'use client';
import { Product } from '@/components/types/ProductTableColumns';
import {useState,useEffect} from 'react';
import axios from 'axios';
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/shared/Footer';
import ProductCard from '@/components/ProductCard';
import HeaderSection from '@/components/shared/HeaderSection';
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
        <div className='flex flex-col items-center'>
            <HeaderSection pageTitle={{en:'Products',ar:'المنتجات'}} pageImage='contactUs.jpg' breadCrumbArr={{en:[],ar:[]}} breadCrumbLinkArr={[]}/>
            <div className="lg:w-[1500px] md:w-[1000px] w-[600px] p-4 m-2 shadow-lg bg-gray-200/75 ">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center">
                 {currentProducts.map((product,id) => (
                    <ProductCard key={id} product={product} />
                ))} 
            </div>
            </div>
        </div>
        <Footer /> 
        </div>
    );
}