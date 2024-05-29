'use client';
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

export interface User {
    name:string;
    email:string;
    photo:string;
    createdAt:Date;
}
export const columns: ColumnDef<User>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'email',
        header: 'Email',
    },
    {
        accessorKey: 'photo',
        header: 'Photo',
    },
    {
        accessorKey: 'createdAt',
        header: 'Created At',
    },{
        id: 'actions',
        cell:({row})=>{
            const product = row.original 
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
                        <DropdownMenuItem>View</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Disable</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    }
]
