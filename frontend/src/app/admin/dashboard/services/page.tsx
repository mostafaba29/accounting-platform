"use client";
import {useState,useEffect} from 'react';
import axios from 'axios';
import { DataTable } from '@/components/Dashboard/DataTable';
import {Service,columns as ServiceCoulmns} from '@/components/types/ServicesTableColumns';
import { Button } from '@/components/ui/button';
import {Plus} from "lucide-react";
import { useRouter } from 'next/navigation';
import BackButton from "@/components/BackButton";

export default function AdminServicesView () {
    const [services,setServices]= useState<Service[]>([]);
    const router = useRouter();
    const fetchServices = async ()=>{
        try {
            const response = await axios.get('http://localhost:8000/api/v1/services');
            setServices(response.data.data.data);
        }catch(error){
            console.log('error fetching services',error);
        }
    }
    const handleAddClick = ()=>{
        router.push('/admin/dashboard/services/add')
    }

    useEffect(()=>{
        fetchServices();
    },[]);
    return (
        <div>
            <div className='flex flex-row justify-between items-center'>
                <BackButton text={'Go Back'} link={'/admin/dashboard'}/>
                <Button className='m-1 mr-[95px]' onClick={handleAddClick}><Plus/> Add Service</Button>
            </div>
            <DataTable columns={ServiceCoulmns} data={services} />
        </div>
    )
}