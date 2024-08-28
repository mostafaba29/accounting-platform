"use client";
import {useState,useEffect} from 'react';
import axios from 'axios';
import { DataTable } from '@/components/Dashboard/DataTable';
import {Member,columns as MemberCoulmns} from '@/components/types/MembersTableColumns';
import BackButton from "@/components/Dashboard/BackButton";
import {Button} from "@/components/ui/button";
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminMembersView () {
    const [members, setMembers] = useState<Member[]>([]);
    const router = useRouter();
    const fetchMembers = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/v1/about');
            setMembers(response.data.data.data);
        }catch(error){
            console.error('Error fetching members:', error);
        }
    }

    const handleAddClick = ()=>{
        router.push('/admin/dashboard/settings/about-us/add');
    }

    useEffect(() => {
        fetchMembers();
    }  , []);

    return (
        <div>
            <div className='flex flex-row justify-between items-center'>
                <BackButton text={'Go Back'} link={'/admin/dashboard/settings'}/>
                <Button className='m-1 mr-[95px]' onClick={handleAddClick}><Plus/> Add Member</Button>
            </div>
            <DataTable columns={MemberCoulmns} data={members} />
        </div>
    );
}