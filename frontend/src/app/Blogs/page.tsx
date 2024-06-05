"use client";
import {useState,useEffect} from 'react';
import {Blog} from '@/components/BlogTableColumns';
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';
import axios from 'axios';

export default function Blogs ()  {
    const [blogs, setBlogs] = useState<Blog[]>([]);

    const fetchBlogs = async () => {
        const response = await axios.get('http://localhost:8000/api/v1/blog');
        if (response.data.status === "success" && response.data.data && Array.isArray(response.data.data.data)) {
            setBlogs(response.data.data.data);
        } else {
            console.error('Invalid response format:', response.data);
            setBlogs([]);
        }
    }
    useEffect(() => {
        
        fetchBlogs();
    }, []);

    return (
        <div className='w-full'>
        <NavigationBar />
         <div className="container mx-auto py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog,id) => (
                    <BlogCard key={id} blog={blog} />
                ))}
            </div>
            </div> 
        <Footer />
        </div>
    );
}