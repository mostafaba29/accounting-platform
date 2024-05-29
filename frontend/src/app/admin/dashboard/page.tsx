'use client';
import Sidebar from '@/components/sidebar';
import {useEffect,useState} from 'react';
import {columns as ProductColumns} from "@/components/ProductTableCoulmns";
import {DataTable} from "@/components/DataTable";
import {Product} from "@/components/ProductTableCoulmns";
import axios from 'axios';
export default function Dashboard() {
    const [data,setData]=useState<Product[]>([]);
    const fetchProducts = async ()=>{
        try {
            const response = await axios.get('http://localhost:8000/api/v1/products');
            setData(response.data.data.data);
            console.log(response.data.data.data);
        } catch (error) {
            console.log('error during data fetch:',error);
        }
    }
    useEffect(()=>{
        fetchProducts();
    },[])
    return (
        <div className="flex flex-row items-center p-24 rounded border">
            <Sidebar />
            <DataTable columns={ProductColumns} data={data} />
        </div>
    );
}