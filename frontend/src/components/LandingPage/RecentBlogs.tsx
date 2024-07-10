import Image from "next/image"
import { Blog } from "../types/BlogTableColumns"
import { Button  } from "@/components/ui/button"
import Link from "next/link";
interface RecentBlogsProps {
    blogs:Blog[]
}


export default function RecentBlogs ({blogs}:RecentBlogsProps){
    const mainBlog = blogs[0];
    const otherBlogs = blogs.slice(1);
    return (
    <div className="m-3 p-4 shadow-lg bg-gradient-to-br from-sky-50/25 to-slate-100/25  rounded-lg ">
        <h2 className="text-3xl font-semibold mb-4 text-gray-200 w-full text-center ">Recent Blogs</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="p-2 mx-1 ">
            <div className="flex flex-col items-start bg-gray-200/85 shadow-md w-[600px] pb-4">
                <Image src={`/imgs/${mainBlog.coverImage}`} alt="cover image" width={700} height={500} className="object-cover w-[700px] h-[500px]  bg-black" />
                <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 text-sky-900">{mainBlog.title_EN}</h3>
                <p className="text-gray-700 line-clamp-3 break-words">{mainBlog.description_EN}</p>
                </div>
                <Link href={`/blogs/${mainBlog._id}`}>
                    <Button className="bg-sky-800 hover:bg-sky-700 text-white px-4 py-2 rounded-lg ml-4">
                        Read More
                    </Button>
                </Link>
            </div>
        </div>
        <div className="flex flex-col gap-3">
            {otherBlogs.map((blog, index) => (
                <div key={index} className=" bg-gray-200/85 shadow-md p-4 rounded-lg ">
                    <div className="flex flex-row justify-between ">
                        <Image
                            src={`/imgs/${blog.coverImage}`}
                            alt="cover image"
                            width={250}
                            height={175}
                            className="object-cover w-[250px] h-[195px] rounded-lg bg-black"
                        />
                        <div className="flex flex-col justify-between ml-2">
                            <h3 className="text-lg font-semibold mb-2 text-sky-900">{blog.title_EN}</h3>
                            <p className="text-gray-700 line-clamp-3 break-words">{blog.description_EN}</p>
                            <Link href={`/blogs/${blog._id}`}>
                                <Button className="bg-sky-800 hover:bg-sky-700 text-white px-4 py-2 rounded-lg mt-4">
                                    Read More
                                </Button>
                            </Link>
                        </div>
                    </div>   
                </div>
            ))}
        </div>
        </div>
    </div>
    )
}