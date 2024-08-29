"use client";
import ClientCard from '@/components/ClientCard';
import { fetchClientList } from '@/lib/api/generalRequests';
import {useQuery} from '@tanstack/react-query';
import {useTranslations} from 'next-intl';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import NavigtionWrapper from '@/components/shared/NavigationWrapper';


export default function ClientList() {
    const t = useTranslations('client-list');
    const {data:clientsData,isLoading,isError,isFetched} = useQuery({
        queryKey: ['clients'],
        queryFn: fetchClientList,
        staleTime: 1000*60*60,
        gcTime: 1000*60*60*24
    });
    if(isLoading) return <LoadingSpinner messageEn={"Loading clients and parteners"} messageAr={"جاري تحميل العملاء والشركاء"} />
    // if(isError) return <p>Error</p>
    return (
        <>
            <NavigtionWrapper />
                <section className="flex flex-col items-center px-4 py-8 lg:w-[1500px] md:w-[1000px] w-[600px] bg-gray-200/85 shadow-lg my-3">
                    <div className="w-full flex flex-col items-center text-center  justify-center">
                        <h1 className="text-4xl font-bold mb-6">{t('title')}</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center w-full">
                            {isFetched && clientsData.map((client, index) => (
                                <ClientCard
                                    key={index}
                                    name={client.name}
                                    image={`/imgs/${client.images[0]}`}
                                    description={client.description}
                                />
                            ))}
                        </div>
                    </div>
                </section>
        </>
    );
}
