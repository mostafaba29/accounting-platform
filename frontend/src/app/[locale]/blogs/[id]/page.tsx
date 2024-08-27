"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {Blog} from '@/components/types/BlogTableColumns';
import BackButton from "@/components/Dashboard/BackButton";
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import MoreLikeThis from "@/components/MoreLikeThis";
import { sanitizeHtml } from "@/components/Security/dompurify";
import HeaderSection from "@/components/shared/HeaderSection";

export default function BlogPage() {
    const pathname = usePathname();
    let id = pathname?.split("/").pop();
    const [blogData, setBlogData] = useState<Blog | null>(null);
    const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        if (id) {
          axios.get(`http://localhost:8000/api/v1/blogs/${id}`)
            .then(response => {
              const data = response.data.data.data;
              setBlogData(data);
            })
            .catch(error => console.error("Error fetching blog data", error));
          
          axios.get(`http://localhost:8000/api/v1/blogs/related/${id}`)
            .then(response => {
              const data = response.data.data.data;
              setRelatedBlogs(data);
            })
            .catch(error => console.error("Error fetching related blogs", error));
        }
      }, [id]);
    
    if(!id || !blogData ) {
        return (
            <div>
                <NavigationBar />
                <BackButton text={'Go Back'} link={'/blogs'}/>
                <div className="container mx-auto py-8">
                    <h1>can't find this blog</h1>
                </div>
                <Footer />
            </div>
        )
    }
    return (
        <div>
        <NavigationBar />
        <div className="flex flex-col items-center">
          <HeaderSection pageTitle={blogData.title_EN} pageImage="contactUs.jpg" breadCrumbArr={['Blogs']} breadCrumbLinkArr={['/blogs']}/>
          <div className="lg:w-[1500px] md:w-[1000px] w-[600px] p-4 m-2 bg-slate-100/85 shadow-lg min-h-screen">
              <div className="text-gray-700 mb-6" dangerouslySetInnerHTML={{ __html: sanitizeHtml(blogData.body_EN) }}/>
          </div>
        </div>
        <Footer />
      </div>
    )
}