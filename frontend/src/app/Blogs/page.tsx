"use client";
import {useState,useEffect} from 'react';
import {Blog} from '@/components/BlogTableColumns';
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';

export default function Blogs ()  {
    const [blogs, setBlogs] = useState<Blog[]>([]);

  
    useEffect(() => {
        // Generate dummy blog data
        const dummyBlogs: Blog[] = [
            {
                name: "random blog",
                author: "Author 1",
                description: "dfsglsfhjghaldohfgadofhpuhgh",
                images: ["https://via.placeholder.com/150"],
                slug: "blog-1",
                imageCover: "https://via.placeholder.com/150",
                createdAt: new Date("2023-03-01"),
            },
            {
                name: "Blog 2",
                author: "Author 2",
                description: "Description 2",
                images: ["https://via.placeholder.com/150"],
                slug: "blog-2",
                imageCover: "https://via.placeholder.com/150",
                createdAt: new Date("2023-03-02"),
            },
            // Add more dummy blog objects as needed
        ];

        // Set the dummy blogs as the initial state
        setBlogs(dummyBlogs);
    }, []);

    const fetchBlogs = async () => {
       
    };
    return (
        <div className='w-full'>
        <NavigationBar />
         <div className="container mx-auto py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog) => (
                    <div key={blog.name} className="p-4 border rounded cursor-pointer transition duration-300 ease-in-out transform hover:scale-105">
           
                        <h2 className="text-xl font-bold">{blog.author}</h2>
                        <p className="text-gray-600">{blog.description}</p>
                    </div>
                ))}
            </div>
            </div> 
        <Footer />
        </div>
    );
}