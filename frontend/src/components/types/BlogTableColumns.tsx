'use client';
import axios from 'axios';
import { ColumnDef } from "@tanstack/react-table";
import {Eye,Pencil,Trash,Ban} from "lucide-react";
import {ArrowUpDown} from "lucide-react";
import Link from 'next/link';
import {Button} from "@/components/ui/button";
export interface Blog {
    _id: string;
    title_AR:string;
    title_EN:string;
    description_AR:string;
    description_EN:string;
    body_AR:string;
    body_EN:string;
    views:number;
    category:string;
    images:string[];
    imageCover:string;
    createdAt:Date;
}
export const columns: ColumnDef<Blog>[] = [
    {
        accessorKey: 'title_EN',
        header: ({column}) => {
            return(
                <div className='w-[150px]'>
                    <Button variant="ghost" className="hover:bg-transparent " onClick={() => column.toggleSorting(column.getIsSorted()==="asc")}>
                    <ArrowUpDown className=" h-4 w-4" />
                    </Button>
                    English Title
                </div>
            )
        }
    },
    {
        accessorKey: 'descripiton_EN',
        header: 'English Description',
    },
    {
        accessorKey: 'views',
        header: 'Views',
    },
    {
        accessorKey: 'category',
        header: 'Category',
    },
    {
        accessorKey: 'createdAt',
        header: 'Created At',
    },{
        id: 'actions',
        header: 'Actions',
        cell:({row})=>{
            const blog = row.original 

            const handleView = () => {
                window.open(`/blogs/${blog._id}`, '_blank');
            }

            const handleDelete = async ()=>{
                const confirmDelete = window.confirm('Are you sure you want to delete this blog?');

                if (confirmDelete) {
                    try {
                        const response = await axios.delete(`http://localhost:8000/api/v1/consults/${blog._id}`, { withCredentials: true });
                        if (response.data.status === "success") {
                            window.location.reload();
                        }
                    } catch (error) {
                        console.log('Error deleting this blog', error);
                    }
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
