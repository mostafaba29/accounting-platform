import Image from "next/image"
import { Blog } from "../types/BlogTableColumns"
import { Button  } from "@/components/ui/button"
import Link from "next/link";
interface RecentBlogsProps {
    blogs:Blog[]
}


export default function RecentBlogs ({blogs}:RecentBlogsProps){
    return (
        <div className="m-1 p-3">
    <h2 className="text-2xl font-semibold mb-4 text-sky-900">Recent Blogs</h2>
    <div className="grid grid-cols-2 gap-4">
        {blogs.map((blog, index) => (
            <div key={index} className="border border-sky-900 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">{blog.name}</h3>
                <div className="flex flex-row justify-between ">
                    <div>
                        <p className="text-gray-700">Blog Content</p>
                        <p className="text-gray-700">Category : {blog.category}</p>
                        <p className="text-gray-700">Author : {blog.author} </p>
                    </div>
                    <Image
                        src={`/imgs/blogs/${blog.imageCover}`}
                        alt="cover image"
                        width={125}
                        height={125}
                        className="object-cover w-[125px] h-[125px] rounded-lg"
                    />
                </div>
                <Link href={`/blogs/${blog._id}`}>
                    <Button className="bg-sky-800 hover:bg-sky-700 text-white px-4 py-2 rounded-lg mt-4">
                        Read More
                    </Button>
                </Link>
            </div>
        ))}
    </div>
</div>
    )
}