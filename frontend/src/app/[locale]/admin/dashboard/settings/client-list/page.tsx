"use client";
import {useState,useEffect} from 'react';
import axios from 'axios';
import { DataTable } from '@/components/Dashboard/DataTable';
import {Client,columns as ClientCoulmns} from '@/components/types/ClientTableColumns';
import BackButton from "@/components/Dashboard/BackButton";
import {Button} from "@/components/ui/button";
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {useQuery,useQueryClient} from '@tanstack/react-query';
import { fetchClients } from '@/lib/api/settingsRequests';

export default function ClientListView () {
    
    const router = useRouter();
    const {data:clients,isLoading,isError}=useQuery({
        queryKey: ['clients'],
        queryFn: fetchClients,
        staleTime: 1000*60*60,
        gcTime: 1000*60*60*24
    })

    const handleAddClick = ()=>{
        router.push('/add');
    }

    return (
        <div>
            <div className='flex flex-row justify-between items-center'>
                <BackButton />
                <Button className='m-1 mr-[95px]' onClick={handleAddClick}><Plus/> Add Client</Button>
            </div>
            <DataTable columns={ClientCoulmns} data={clients} />
        </div>
    );
}