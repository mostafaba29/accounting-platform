'use client';
import axios from 'axios';
import { ColumnDef } from "@tanstack/react-table";
import {Eye,Pencil,Trash,Ban} from "lucide-react";
import Link from 'next/link';

export interface Service {
    _id: string;
    name:string;
    description:string;
    images:string[];
    imageCover:string;
    createdAt:Date;
}
export const columns: ColumnDef<Service>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'description',
        header: 'Description',
    },
    {
        accessorKey: 'createdAt',
        header: 'Created At',
    },{
        id: 'actions',
        cell:({row})=>{
            const service = row.original 

            const handleView = () => {
                window.open(`/services/${service._id}`, '_blank');
            }

            const handleDelete = async ()=>{
                try{
                    const response = await axios.delete(`http://localhost:8000/api/v1/service/${service._id}`);
                    if(response.data.status === "success"){
                        window.location.reload();
                    }    
                }catch(error){
                    console.log('error deleting this service', error);
                }
            }

            const handleDisable = async ()=>{
                try{
                    const response = await axios.patch(`/api/service/${service._id}`, { status: 'disabled' },{withCredentials:true});
                    if(response.data.status === "success"){
                        window.location.reload();
                    }    
                }catch(error){
                    console.log('error disabling this service', error);
                }
            }

           
            return (
                <div className="flex flex-row items-center space-x-4">
                    <Eye className="cursor-pointer hover:text-cyan-600" size={16} onClick={() => handleView()} />
                    <Link href={`/admin/dashboard/services/edit/${service._id}`}><Pencil className="cursor-pointer hover:text-emerald-500" size={16}  /></Link>
                    <Trash className="cursor-pointer hover:text-red-600" size={16} onClick={() => handleDelete()} />
                    <Ban className="cursor-pointer hover:text-gray-600" size={16} onClick={() => handleDisable()} />
                </div>
            )
        }
    }
]
