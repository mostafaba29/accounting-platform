"use client";
import {useState,useEffect} from 'react';
import axios from 'axios';
import { DataTable } from '@/components/Dashboard/DataTable';
import {Package,columns as PackageCoulmns} from '@/components/types/PackagesTableColumns';
import { Button } from '@/components/ui/button';
import {Plus} from "lucide-react";
import { useRouter } from 'next/navigation';
import BackButton from "@/components/Dashboard/BackButton";

export default function AdminPackageView () {
    const [packageData,setPackageData]= useState<Package[]>([]);
    const router = useRouter();
    const fetchPackage= async ()=>{
        try {
            const response = await axios.get('http://localhost:8000/api/v1/package');
            setPackageData(response.data.data.data);
        }catch(error){
            console.log('error fetching Packages',error);
        }
    }
    const handleAddClick = ()=>{
        router.push('/admin/dashboard/packages/add')
    }

    useEffect(()=>{
        fetchPackage();
    },[]);
    return (
        <div>
            <div className='flex flex-row justify-between items-center'>
                <BackButton text={'Go Back'} link={'/admin/dashboard'}/>
                <Button className='m-1 mr-[95px]' onClick={handleAddClick}><Plus/> Add Package</Button>
            </div>
            <DataTable columns={PackageCoulmns} data={packageData} />
        </div>
    )
}