'use client';
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import {Pencil,Trash,Eye,Ban} from "lucide-react";
import {ArrowUpDown, MoreHorizontal} from "lucide-react";
import axios from 'axios';
import Link from 'next/link';


export interface Product {
    _id: string;
    title_AR: string;
    title_EN: string;
    description_AR: string;
    description_EN: string;
    body_AR: string;
    body_EN: string;
    views:number;
    Sucessful_Purchases: number;
    category:string;
    discount:number;
    video: string;
    images: string[];
    coverImage: string;
    basic_version:{
        document: string;
        price: number;
    };
    open_version:{
        document: string;
        price: number;
    };
    editable_version:{
        document: string;
        price: number;
    };
    createdAt: Date;
}

export const columns: ColumnDef<Product>[] = [
    {
        accessorKey: 'title_EN',
        header: ({column}) => {
            return(
                <div>
                    <Button variant="ghost" className="hover:bg-transparent " onClick={() => column.toggleSorting(column.getIsSorted()==="asc")}>
                    <ArrowUpDown className=" h-4 w-4" />
                    </Button>
                    English Title
                </div>
            )
        }

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
        accessorKey: 'Sucessful_Purchases',
        header: 'Sucessful Purchases',
    },
    {
        accessorKey: 'createdAt',
        header: 'Created At',
    },
    {
        id: 'actions',
        header: 'Actions',
        cell: ({ row, table }) => {
            const product = row.original;
            const handleView = () => {
                window.open(`/products/${product._id}`, '_blank');
            };

            

            const handleDelete = async () => {
                const confirmDelete = window.confirm('Are you sure you want to delete this product?');

                if (confirmDelete) {
                    try {
                        const response = await axios.delete(`http://localhost:8000/api/v1/consults/${product._id}`, { withCredentials: true });
                        if (response.data.status === "success") {
                            window.location.reload();
                        }
                    } catch (error) {
                        console.log('Error deleting this product', error);
                    }
                }
            };

            const handleDisable = async () => {
                try {
                    await axios.patch(`/api/products/${product._id}`, { status: 'disabled' },{withCredentials: true});
                    window.location.reload();
                } catch (error) {
                    console.error('Error disabling product:', error);
                }
            };

            return (
                <div className="flex flex-row items-center space-x-4">
                    <Eye className="cursor-pointer hover:text-cyan-600" size={16} onClick={() => handleView()} />
                    <Link href={`/admin/dashboard/products/edit/${product._id}`}><Pencil className="cursor-pointer hover:text-emerald-500" size={16} /></Link>
                    <Trash className="cursor-pointer hover:text-red-600" size={16} onClick={() => handleDelete()} />
                    <Ban className="cursor-pointer hover:text-gray-600" size={16} onClick={() => handleDisable()} />  
                </div>
            );
        }
    }
];
