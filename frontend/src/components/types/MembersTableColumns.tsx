'use client';
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import {Pencil,Trash,Eye,Ban} from "lucide-react";
import {ArrowUpDown, MoreHorizontal} from "lucide-react";
import axios from 'axios';
import Link from 'next/link';


export interface Member {
    _id: string;
    name:string;
    position:string;
    images:string[];
    brief:string;
    isFounder:boolean;
    createdAt: Date;
}

export const columns: ColumnDef<Member>[] = [
    {
        accessorKey: 'name',
        header: ({column}) => {
            return(
                <div>
                    <Button variant="ghost" className="hover:bg-transparent " onClick={() => column.toggleSorting(column.getIsSorted()==="asc")}>
                    <ArrowUpDown className=" h-4 w-4" />
                    </Button>
                    Member Name
                </div>
            )
        }

    },
    {
        accessorKey: 'position',
        header: ({column}) => {
            return(
                <div>
                    <Button variant="ghost" className="hover:bg-transparent " onClick={() => column.toggleSorting(column.getIsSorted()==="asc")}>
                    <ArrowUpDown className=" h-4 w-4" />
                    </Button>
                    Position
                </div>
            )
        }
    },
    {
        accessorKey: 'brief',
        header: 'Description',
    },
    {
        accessorKey: 'isFounder',
        header: 'Is Founder',
    },
    {
        id: 'actions',
        header: 'Actions',
        cell: ({ row, table }) => {
            const member = row.original;
            const handleDelete = async () => {
                const confirmDelete = window.confirm('Are you sure you want to delete this member?');

                if (confirmDelete) {
                    try {
                        const response = await axios.delete(`http://localhost:8000/api/v1/members/${member._id}`, { withCredentials: true });
                        if (response.data.status === "success") {
                            window.location.reload();
                        }
                    } catch (error) {
                        console.log('Error deleting this member', error);
                    }
                }
            };

            

            return (
                <div className="flex flex-row items-center space-x-4">
                    <Link href={`/admin/dashboard/settings/about-us/edit/${member._id}`}><Pencil className="cursor-pointer hover:text-emerald-500" size={16} /></Link>
                    <Trash className="cursor-pointer hover:text-red-600" size={16} onClick={() => handleDelete()} />
                     
                </div>
            );
        }
    }
];
