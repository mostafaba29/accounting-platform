"use client";
import {useState,useEffect} from 'react';
import axios from 'axios';
import { DataTable } from '@/components/Dashboard/DataTable';
import {Blog,columns as BlogCoulmns} from '@/components/types/BlogTableColumns';
import { Button } from '@/components/ui/button';
import {Plus} from "lucide-react";
import { useRouter } from 'next/navigation';
import BackButton from "@/components/Dashboard/BackButton";

export default function AdminBlogsView (){
    const [Blogs,setBlogs]= useState<Blog[]>([]);
    const router = useRouter();
    const fetchBlogs = async ()=>{
        try {
            const response = await axios.get('http://localhost:8000/api/v1/blogs');
            setBlogs(response.data.data.data);
        }catch(error){
            console.log('error fetching blogs',error);
        }
    }
    const handleAddClick = ()=>{
        router.push('/admin/dashboard/blogs/add')
    }

    useEffect(()=>{
        fetchBlogs();
    },[]);

    return (
        <div>
            <div className='flex flex-row justify-between items-center'>
                <BackButton text={'Go Back'} link={'/admin/dashboard'}/>
                <Button className='m-1 mr-[95px]' onClick={handleAddClick}><Plus/> Add Blog</Button>
            </div>
            <DataTable columns={BlogCoulmns} data={Blogs} />
        </div>
    );
}