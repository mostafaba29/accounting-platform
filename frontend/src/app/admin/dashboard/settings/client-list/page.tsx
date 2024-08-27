"use client";
import {useState,useEffect} from 'react';
import axios from 'axios';
import { DataTable } from '@/components/Dashboard/DataTable';
import {Client,columns as ClientCoulmns} from '@/components/types/ClientTableColumns';
import BackButton from "@/components/Dashboard/BackButton";
import {Button} from "@/components/ui/button";
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ClientListView () {
    const [clients, setClients] = useState<Client[]>([]);
    const router = useRouter();
    const fetchClients = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/v1/clients');
            setClients(response.data.data.data);
        }catch(error){
            console.error('Error fetching clients:', error);
        }
    }

    const handleAddClick = ()=>{
        router.push('/admin/dashboard/settings/client-list/add');
    }

    useEffect(() => {
        fetchClients();
    }  , []);

    return (
        <div>
            <div className='flex flex-row justify-between items-center'>
                <BackButton text={'Go Back'} link={'/admin/dashboard/settings'}/>
                <Button className='m-1 mr-[95px]' onClick={handleAddClick}><Plus/> Add Client</Button>
            </div>
            <DataTable columns={ClientCoulmns} data={clients} />
        </div>
    );
}