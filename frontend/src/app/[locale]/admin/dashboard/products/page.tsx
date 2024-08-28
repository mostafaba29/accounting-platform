// import PostsTable from "@/components/posts/PostsTable";
// import PostsPagination from "@/components/posts/PostsPagination";
"use client";
import {useState,useEffect} from 'react';
import axios from 'axios';
import { DataTable } from '@/components/Dashboard/DataTable';
import {Product,columns as ProductCoulmns} from '@/components/types/ProductTableColumns';
import BackButton from "@/components/Dashboard/BackButton";
import {Button} from "@/components/ui/button";
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminProductsView () {
    const [products, setProducts] = useState<Product[]>([]);
    const router = useRouter();
    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/v1/products');
            setProducts(response.data.data.data);
        }catch(error){
            console.error('Error fetching Products:', error);
        }
    }

    const handleAddClick = ()=>{
        router.push('/admin/dashboard/products/add');
    }

    useEffect(() => {
        fetchProducts();
    }  , []);

    return (
        <div>
            <div className='flex flex-row justify-between items-center'>
                <BackButton text={'Go Back'} link={'/admin/dashboard'}/>
                <Button className='m-1 mr-[95px]' onClick={handleAddClick}><Plus/> Add Product</Button>
            </div>
            <DataTable columns={ProductCoulmns} data={products} />
        </div>
    );
}