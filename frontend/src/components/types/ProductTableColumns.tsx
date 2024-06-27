'use client';
import { ColumnDef } from "@tanstack/react-table";
import {Pencil,Trash,Eye,Ban} from "lucide-react";
import axios from 'axios';
import Link from 'next/link';


export interface Product {
    _id: string;
    name: string;
    description: string;
    document:string;
    views:number;
    Sucessful_Purchases: number;
    category:string;
    price: number;
    images: string[];
    coverImage: string;
    createdAt: Date;
}

export const columns: ColumnDef<Product>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
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
        accessorKey: 'price',
        header: 'Price',
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
                try {
                    await axios.delete(`http://localhost:8000/api/v1/products/${product._id}`, {withCredentials: true});
                    window.location.reload();
                } catch (error) {
                    console.error('Error deleting product:', error);
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
