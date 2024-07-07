import Image from "next/image"
import { Blog } from "../types/BlogTableColumns"
import { Button  } from "@/components/ui/button"
import Link from "next/link";
interface RecentBlogsProps {
    blogs:Blog[]
}


export default function RecentBlogs ({blogs}:RecentBlogsProps){
    return (
    <div className="m-3 p-4 shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-white">Recent Blogs</h2>
        <div className="grid grid-cols-1 gap-4">
            {blogs.map((blog, index) => (
                <div key={index} className=" bg-gradient-to-br from-slate-50/50 to-sky-100/50 p-4 rounded-lg ">
                    <div className="flex flex-row justify-between ">
                        <div className="flex flex-col justify-between">
                            <h3 className="text-lg font-semibold mb-2 text-sky-900">{blog.title_EN}</h3>
                            <p className="text-gray-700 line-clamp-3 break-words">{blog.description_EN}</p>
                            <p className="text-gray-700">Category : {blog.category}</p>
                            <Link href={`/blogs/${blog._id}`}>
                                <Button className="bg-sky-800 hover:bg-sky-700 text-white px-4 py-2 rounded-lg mt-4">
                                    Read More
                                </Button>
                            </Link>
                        </div>
                        <Image
                            src={`/imgs/${blog.coverImage}`}
                            alt="cover image"
                            width={150}
                            height={200}
                            className="object-cover w-[150px] h-[200px] rounded-lg bg-black"
                        />
                    </div>   
                </div>
            ))}
        </div>
    </div>
    )
}