"use client";
import { useState, useEffect } from "react";
import { Blog } from "@/components/types/BlogTableColumns";
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import axios from "axios";

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
      <div className="container mx-auto py-8">
        <div className="flex flex-col ">
          {blogs.map((blog, id) => (
            <BlogCard key={id} blog={blog} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
