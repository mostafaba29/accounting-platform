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
                <div className="border border-sky-900 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">{blogs[0].name}</h3>
                    <div className="flex flex-row justify-between ">
                        <div>
                            <p className="text-gray-700">Blog Content</p>
                            <p className="text-gray-700">Category : {blogs[0].category}</p>
                            <p className="text-gray-700">Author : {blogs[0].author} </p>
                        </div>
                        <Image src={`/imgs/blogs/${blogs[0].imageCover}`} alt="cover image" width={125} height={125} className='object-cover w-[125px] h-[125px] rounded-lg'/>
                    </div>
                    <Link href={`/blogs/${blogs[0]._id}`}><Button  className="bg-sky-800 hover:bg-sky-700 text-white px-4 py-2 rounded-lg mt-4">Read More</Button ></Link>
                </div>
                <div className="border border-sky-900 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">{blogs[1].name}</h3>
                    <div className="flex flex-row justify-between ">
                        <div>
                            <p className="text-gray-700">Blog Content</p>
                            <p className="text-gray-700">Category : {blogs[1].category}</p>
                            <p className="text-gray-700">Author : {blogs[1].author} </p>
                        </div>
                        <Image src={`/imgs/blogs/${blogs[1].imageCover}`} alt="cover image" width={125} height={125} className='object-cover w-[125px] h-[125px] rounded-lg'/>
                    </div>
                    <Link href={`/blogs/${blogs[0]._id}`}><Button  className="bg-sky-800 hover:bg-sky-700 text-white px-4 py-2 rounded-lg mt-4">Read More</Button ></Link>
                </div>
                <div className="border border-sky-900 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">{blogs[2].name}</h3>
                    <div className="flex flex-row justify-between ">
                        <div>
                            <p className="text-gray-700">Blog Content</p>
                            <p className="text-gray-700">Category : {blogs[2].category}</p>
                            <p className="text-gray-700">Author : {blogs[2].author} </p>
                        </div>
                        <Image src={`/imgs/blogs/${blogs[2].imageCover}`} alt="cover image" width={125} height={125} className='object-cover w-[125px] h-[125px] rounded-lg'/>
                    </div>
                    <Link href={`/blogs/${blogs[2]._id}`}><Button  className="bg-sky-800 hover:bg-sky-700 text-white px-4 py-2 rounded-lg mt-4">Read More</Button ></Link>
                </div>
                <div className="border border-sky-900 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">{blogs[3].name}</h3>
                    <div className="flex flex-row justify-between ">
                        <div>
                            <p className="text-gray-700">Blog Content</p>
                            <p className="text-gray-700">Category : {blogs[3].category}</p>
                            <p className="text-gray-700">Author : {blogs[3].author} </p>
                        </div>
                        <Image src={`/imgs/blogs/${blogs[3].imageCover}`} alt="cover image" width={125} height={125} className='object-cover w-[125px] h-[125px] rounded-lg'/>
                    </div>
                    <Link href={`/blogs/${blogs[3]._id}`}><Button  className="bg-sky-800 hover:bg-sky-700 text-white px-4 py-2 rounded-lg mt-4">Read More</Button ></Link>
                </div>
            </div>
        </div>
    )
}