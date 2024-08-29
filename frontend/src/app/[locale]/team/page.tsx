'use client';
import Image from 'next/image';
import NavigtionWrapper from '@/components/shared/NavigationWrapper';
import HeaderSection from '@/components/shared/HeaderSection';
import MemberCard from '@/components/team/MemberCard';
import FounderCard from '@/components/team/FounderCard';
import { useQueryClient,useQuery } from '@tanstack/react-query';
import {fetchAboutUsInfo} from '@/lib/api/generalRequests';
import { useTranslations } from 'next-intl';
import LoadingSpinner from '@/components/shared/LoadingSpinner';

export default function Team() {
    const t = useTranslations('team')
    const {data:members,isLoading,isError,error,isFetched:membersFetched} = useQuery({
        queryKey: ['members'],
        queryFn: fetchAboutUsInfo,
        staleTime: 1000 * 60 * 60,
        gcTime: 1000 * 60 * 60 * 24
    })
    if (isLoading) return <LoadingSpinner messageEn="Loading team members" messageAr="جاري تحميل فريق العمل" />
    // if (isError) return <p>Error</p>
    return (
        <>
            <NavigtionWrapper />
            <HeaderSection pageTitle={{en:'Team members', ar:'فريق العمل'}} pageImage={'contactUs.jpg'} breadCrumbArr={{en:[],ar:[]}} breadCrumbLinkArr={[]} />
            <section className="flex flex-col items-center text-center justify-center">
                        <h1 className="text-4xl font-bold mb-6">{t('title')}</h1>
                        <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
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
                        <h1 className="text-2xl font-bold my-6">{t('subTitle')}</h1>
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