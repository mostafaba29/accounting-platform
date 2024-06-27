import {
  Card,CardContent,CardFooter,CardHeader,CardTitle,CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Blog }from "@/components/types/BlogTableColumns"
import Link from "next/link";
  interface BlogCardProps {
    blog: Blog;
  }
  export default function BlogCard ({blog}: BlogCardProps) {
    return (
        <Card className="w-full max-w-[1200px] h-[300px] flex flex-col justify-between my-1">
        <CardHeader>
          <Link href={`/blogs/${blog._id}`}>
          <CardTitle className="hover:text-sky-700">{blog.name}</CardTitle>
          </Link>
 
        </CardHeader>
        <CardContent>
          <CardDescription className="text-sky-800 font-bold">by: {blog.author}</CardDescription>
        </CardContent>
        <CardFooter>
          <Link href={`/blogs/${blog._id}`}>
          <Button variant="ghost" className="font-bold hover:bg-sky-300"> View this blog</Button>
          </Link>
        </CardFooter> 
      </Card>
    );
  }