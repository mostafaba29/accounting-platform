'use client';
import axios from 'axios';
import { ColumnDef } from "@tanstack/react-table";
import {Button} from "./ui/button"
import { MoreHorizontal } from "lucide-react";
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuTrigger , 
    DropdownMenuSeparator,
    DropdownMenuLabel
        } from "@radix-ui/react-dropdown-menu";

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
                    const response = await axios.delete(`http://localhost:8000/api/v1/blog/${blog._id}`);
                    if(response.data.status === "success"){
                        window.location.reload();
                    }    
                }catch(error){
                    console.log('error deleting this blog', error);
                }
            }

            const handleDisable = async ()=>{
                try{
                    const response = await axios.patch(`/api/blogs/${blog._id}`, { status: 'disabled' });
                    if(response.data.status === "success"){
                        window.location.reload();
                    }    
                }catch(error){
                    console.log('error disabling this blog', error);
                }
            }

            const handleEdit = () => {
                if (table.options.meta && typeof table.options.meta.onEdit === 'function') {
                    table.options.meta.onEdit(blog);
                } else {
                    console.error('Edit function is not defined');
                }
            }
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-16 h-30 bg-slate-50 rounded-sm flex flex-col items-center justify-around border border-slate-300">
                        <DropdownMenuLabel className="bg-slate-300 w-full text-center">Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={handleView}>View</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleDisable}>Disable</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    }
]
