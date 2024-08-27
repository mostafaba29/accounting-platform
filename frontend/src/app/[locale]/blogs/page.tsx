"use client";
import { useState, useEffect } from "react";
import { Blog } from "@/components/types/BlogTableColumns";
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/shared/Footer";
import BlogCard from "@/components/BlogCard";
import axios from "axios";
import HeaderSection from "@/components/shared/HeaderSection";

export default function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const fetchBlogs = async () => {
    const response = await axios.get("http://localhost:8000/api/v1/blogs");
    if (
      response.data.status === "success" &&
      response.data.data &&
      Array.isArray(response.data.data.data)
    ) {
      setBlogs(response.data.data.data);
    } else {
      console.error("Invalid response format:", response.data);
      setBlogs([]);
    }
  };
  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="w-full">
      <NavigationBar />
      <div className='flex flex-col items-center'>
          <HeaderSection pageTitle={{en:'Blogs',ar:'المدونة'}} pageImage='contactUs.jpg' breadCrumbArr={{en:[],ar:[]}} breadCrumbLinkArr={[]}/>
            <div className="lg:w-[1500px] md:w-[1000px] w-[600px] p-4 m-2 shadow-lg bg-gray-200">
              <div className="flex flex-col items-center gap-5">
              {blogs.map((blog, id) => (
                <BlogCard key={id} blog={blog} />
              ))}
              </div>
            </div>
      </div>
      <Footer />
    </div>
  );
}
