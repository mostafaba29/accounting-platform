'use client';
import { Product } from '@/components/ProductTableColumns';
import {useState,useEffect} from 'react';
import axios from 'axios';
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/Footer';
export default function ProductsPage(){
    const [products,setProducts] = useState<Product[]>([]);
    const [currentPage,setCurrentPage] = useState(1);
    const [productsPerPage] = useState(16);

    useEffect(()=>{
        fetchProducts();
    },[]);

    const fetchProducts = async ()=>{
        try{
            const response = await axios.get('');
            setProducts(response.data);
        }catch(error){
            console.log(error);
        }
    }
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    return (
        <>
        <NavigationBar />
        <div className="container mx-auto py-8">
            <div className="grid grid-cols-4 gap-4">
                {/* {currentProducts.map((product) => (
                    <div key={product.name} className="p-4 border rounded">
                       
                        <h2 className="text-lg font-bold">{product.name}</h2>
                        <p>{product.description}</p>
                    </div>
                ))} */}
            </div>
            {/* Pagination */}
            <div className="mt-4 flex justify-center">
                {/* Add pagination component or buttons */}
            </div>
        </div>
        <Footer />
        </>
    );
}