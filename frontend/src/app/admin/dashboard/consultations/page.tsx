"use client";
import {useState,useEffect} from 'react';
import axios from 'axios';
import { DataTable } from '@/components/Dashboard/DataTable';
import {Consultation,columns as ConsultaionCoulmns} from '@/components/types/ConsultationTableColumns';
import { Button } from '@/components/ui/button';
import {Plus} from "lucide-react";
import { useRouter } from 'next/navigation';
import BackButton from "@/components/Dashboard/BackButton";

export default function AdminConsultationView () {
    const [consultaion,setConsultaion]= useState<Consultation[]>([]);
    const router = useRouter();
    const fetchConsultaion= async ()=>{
        try {
            const response = await axios.get('http://localhost:8000/api/v1/consults');
            setConsultaion(response.data.data.data);
        }catch(error){
            console.log('error fetching consultaions',error);
        }
    }
    const handleAddClick = ()=>{
        router.push('/admin/dashboard/consultations/add')
    }

    useEffect(()=>{
        fetchConsultaion();
    },[]);
    return (
        <div>
            <div className='flex flex-row justify-between items-center'>
                <BackButton text={'Go Back'} link={'/admin/dashboard'}/>
                <Button className='m-1 mr-[95px]' onClick={handleAddClick}><Plus/> Add Consultation</Button>
            </div>
            <DataTable columns={ConsultaionCoulmns} data={consultaion} />
        </div>
    )
}