'use client';
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "./ui/button";
import { MoreHorizontal } from "lucide-react";
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuTrigger, 
    DropdownMenuSeparator,
    DropdownMenuLabel
} from "./ui/dropdown-menu";
import axios from 'axios';

export interface Product {
    _id: {
        $oid: string;
    };
    name: string;
    description: string;
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
        accessorKey: 'description',
        header: 'Description',
    },
    {
        accessorKey: 'price',
        header: 'Price',
    },
    {
        accessorKey: 'createdAt',
        header: 'Created At',
    },
    {
        id: 'actions',
        cell: ({ row, table }) => {
            const product = row.original;

            const handleView = () => {
                console.log(product._id);
                window.open(`/products/${product._id.$oid}`, '_blank');
            };

            const handleEdit = () => {
                if (table.options.meta && typeof table.options.meta.onEdit === 'function') {
                    table.options.meta.onEdit(product);
                } else {
                    console.error('Edit function is not defined');
                }
            };

            const handleDelete = async () => {
                try {
                    await axios.delete(`http://localhost:8000/api/v1/products/${product._id.$oid}`);
                    window.location.reload();
                } catch (error) {
                    console.error('Error deleting product:', error);
                }
            };

            const handleDisable = async () => {
                try {
                    await axios.patch(`/api/products/${product._id.$oid}`, { status: 'disabled' });
                    window.location.reload();
                } catch (error) {
                    console.error('Error disabling product:', error);
                }
            };

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 bg-slate-50 rounded-sm border border-slate-300">
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
            );
        }
    }
];
