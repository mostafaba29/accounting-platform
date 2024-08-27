'use client';
import Image from 'next/image';
import HeaderSection from '@/components/shared/HeaderSection';
import MemberCard from '@/components/team/MemberCard';
import FounderCard from '@/components/team/FounderCard';
import { useQueryClient,useQuery } from '@tanstack/react-query';
import {fetchAboutUsInfo} from '@/lib/api/generalRequests';

export default function Founders() {
    const {data:members,isLoading,isError,error,isFetched:membersFetched} = useQuery({
        queryKey: ['members'],
        queryFn: fetchAboutUsInfo,
        staleTime: 1000 * 60 * 60,
        gcTime: 1000 * 60 * 60 * 24
    })
    return (
        <>
            <HeaderSection pageTitle={'Team Members'} pageImage={'contactUs.jpg'} breadCrumbArr={[]} breadCrumbLinkArr={[]} />
            <section className="flex flex-col items-center text-center justify-center">
                        <h1 className="text-4xl font-bold mb-6">Founders</h1>
                        <div className="grid grid-cols-1 gap-2 grid-cols-2">
                            {membersFetched && members.filter(member => member.isFounder).map((member, index) => (
                                    <FounderCard
                                        key={index}
                                        name={member.name}
                                        image={`/imgs/${member.images[0]}`}
                                        jobTitle={member.position}
                                        brief={member.brief}
                                    />
                            ))}
                        </div>
                    </section>
                    <section className="flex flex-col items-center text-center justify-center mt-[100px]">
                        <h1 className="text-2xl font-bold my-6">Team members</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 w-full justify-items-end">
                        {membersFetched && members.filter(member => !member.isFounder).map((member, index) => (
                            <MemberCard
                                key={index}
                                name={member.name}
                                image={`/imgs/${member.images[0]}`}
                                jobTitle={member.position}
                            />
                        ))}
                        </div>
                    </section>
        </>
    )
}