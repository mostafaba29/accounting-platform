"use client";
import {useState,useEffect} from 'react';
import axios from 'axios';
import { DataTable } from '@/components/Dashboard/DataTable';
import {User,columns as UserCoulmns} from '@/components/types/UserTableColumns';
import { Button } from '@/components/ui/button';
import {Plus} from "lucide-react";
import { useRouter } from 'next/navigation';
import BackButton from "@/components/Dashboard/BackButton";

export default function AdminUsersView (){
    const [users,setUsers]= useState<User[]>([]);
    const router = useRouter();
    const fetchUsers = async ()=>{
        try {
            const response = await axios.get('http://localhost:8000/api/v1/users',{withCredentials: true});
            setUsers(response.data.data.data);
        }catch(error){
            console.log('error fetching userss',error);
        }
    }
    const handleAddClick = ()=>{
        router.push('/admin/dashboard/users/add')
    }

    useEffect(()=>{
        fetchUsers();
    },[]);
    return (
        <div>
            <div className='flex flex-row justify-between items-center'>
                <BackButton text={'Go Back'} link={'/admin/dashboard'}/>
                <Button className='m-1 mr-[95px]' onClick={handleAddClick}><Plus/> Add User</Button>
            </div>
            <DataTable columns={UserCoulmns} data={users} />
        </div>
    )
}