import {
  Card,CardContent,CardFooter,CardHeader,CardTitle,CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Blog }from "@/components/types/BlogTableColumns";
import Image from "next/image";
import Link from "next/link";
  interface BlogCardProps {
    blog: Blog;
  }
  export default function BlogCard ({blog}: BlogCardProps) {
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(blog.createdAt));
    return (
        <div className="w-full max-w-[1200px] h-[300px] flex flex-row  my-1 bg-gradient-to-br from-sky-50/75 to-slate-100 rounded-lg shadow-md">
          <Image src={`/imgs/${blog.coverImage}`} alt={blog.title_EN} width={300} height={300} className="object-cover w-[300px] h-[300px]" />
          <div className="flex flex-col items-start justify-between">
            <div className="px-2 text-white bg-slate-700 rounded-br-lg w-[110px]">{formattedDate}</div>
            <div className="px-2 ">
              <h2 className="text-black text-2xl font-bold">{blog.title_EN}</h2>
              <p className="text-black text-base my-2">{blog.description_EN}</p>
            </div>
            <div className="p-2 flex flex-row items-end justify-end w-full">
              <Link href={`/blogs/${blog._id}`}><Button className="bg-sky-700 hover:bg-sky-600">Read More</Button></Link>
            </div>
          </div>
        </div>
    );
  }