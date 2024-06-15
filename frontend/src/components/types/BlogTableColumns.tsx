'use client';
import axios from 'axios';
import { ColumnDef } from "@tanstack/react-table";
import {Eye,Pencil,Trash,Ban} from "lucide-react";
import Link from 'next/link';

export interface Blog {
    _id: string;
    name:string;
    description:string;
    author:string;
    images:string[];
    slug: string,
    imageCover:string;
    createdAt:Date;
}
export const columns: ColumnDef<Blog>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'description',
        header: 'Description',
    },
    {
        accessorKey: 'author',
        header: 'author',
    },
    {
        accessorKey: 'createdAt',
        header: 'Created At',
    },{
        id: 'actions',
        cell:({row})=>{
            const blog = row.original 

            const handleView = () => {
                window.open(`/blogs/${blog._id}`, '_blank');
            }

            const handleDelete = async ()=>{
                try{
                    const response = await axios.delete(`http://localhost:8000/api/v1/blogs/${blog._id}`,{withCredentials:true});
                    if(response.data.status === "success"){
                        window.location.reload();
                    }    
                }catch(error){
                    console.log('error deleting this blog', error);
                }
            }

            const handleDisable = async ()=>{
                try{
                    const response = await axios.patch(`/api/blogs/${blog._id}`, { status: 'disabled' },{withCredentials:true});
                    if(response.data.status === "success"){
                        window.location.reload();
                    }    
                }catch(error){
                    console.log('error disabling this blog', error);
                }
            }

           
            return (
                <div className="flex flex-row items-center space-x-4">
                    <Eye className="cursor-pointer hover:text-cyan-600" size={16} onClick={() => handleView()} />
                    <Link href={`/admin/dashboard/blogs/edit/${blog._id}`}><Pencil className="cursor-pointer hover:text-emerald-500" size={16}  /></Link>
                    <Trash className="cursor-pointer hover:text-red-600" size={16} onClick={() => handleDelete()} />
                    <Ban className="cursor-pointer hover:text-gray-600" size={16} onClick={() => handleDisable()} />
                </div>
            )
        }
    }
]
