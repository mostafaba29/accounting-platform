"use client";
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { DataTable } from '@/components/Dashboard/DataTable';
import {Member,columns as MemberCoulmns} from '@/components/types/MembersTableColumns';
import BackButton from "@/components/Dashboard/BackButton";
import {Button} from "@/components/ui/button";
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {useQuery} from '@tanstack/react-query';
import { fetchTeamMembers } from '@/lib/api/settingsRequests';

export default function AdminMembersView () {
    // const [members, setMembers] = useState<Member[]>([]);
    const {data:members,isFetched,isLoading,isError,error} = useQuery({
        queryKey: ['members'],
        queryFn: fetchTeamMembers,
    })
    const router = useRouter();
    // 

    const handleAddClick = ()=>{
        router.push('admin/dashboard/settings/about-us/add');
    }

    if (isLoading) return <LoadingSpinner messageEn="Loading team members" messageAr="جاري تحميل العضويات" />

    return (
        <div>
            <div className='flex flex-row justify-between items-center'>
                <BackButton text={'Go Back'} link={'/admin/dashboard/settings'}/>
                <Button className='m-1 mr-[95px]' onClick={handleAddClick}><Plus/> Add Member</Button>
            </div>
            {isFetched && <DataTable columns={MemberCoulmns} data={members} />}
    
        </div>
    );
}