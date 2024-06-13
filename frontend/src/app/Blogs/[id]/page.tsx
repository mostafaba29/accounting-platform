"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {Blog} from '@/components/types/BlogTableColumns';
import BackButton from "@/components/BackButton";
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import MoreLikeThis from "@/components/MoreLikeThis";

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
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row">
            <div className="flex-shrink-0 mb-4 md:mb-0 md:w-1/2">
              <Image
                src={`/public/imgs/blogs/${blogData.imageCover}`}
                alt={blogData.name}
                width={500}
                height={500}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="md:ml-8 md:w-1/2">
              <h1 className="text-3xl font-bold mb-4">{blogData.name}</h1>
              <p className="text-gray-700 mb-2">By {blogData.author}</p>
              <div className="text-gray-700 mb-6" dangerouslySetInnerHTML={{ __html: blogData.description }}></div>
              {blogData.images && blogData.images.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-2xl font-semibold mb-4">More Images</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {blogData.images.map((image, index) => (
                      <Image
                        key={index}
                        src={`/public/imgs/blogs/${image}`}
                        alt={`${blogData.name} image ${index + 1}`}
                        width={200}
                        height={200}
                        className="object-cover w-full h-full"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="mt-16">
            <MoreLikeThis title={'More Like This'} type={'blog'} id={id} limit={4} />
          </div>
        </div>
        <Footer />
      </div>
    )
}