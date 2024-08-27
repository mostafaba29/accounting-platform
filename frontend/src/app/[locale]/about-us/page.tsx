'use client';
import Image from 'next/image';
import HeaderSection from '@/components/shared/HeaderSection';
import MemberCard from '@/components/team/MemberCard';
import { useQueryClient,useQuery } from '@tanstack/react-query';
import {fetchAboutUsInfo} from '@/lib/api/generalRequests';


export default function AboutUs() {
    const {data:members,isLoading,isError,error,isFetched:membersFetched} = useQuery({
        queryKey: ['members'],
        queryFn: fetchAboutUsInfo,
        staleTime: 1000 * 60 * 60,
        gcTime: 1000 * 60 * 60 * 24
    })
    return (
        <>
                <HeaderSection pageTitle={'About us'} pageImage={'contactUs.jpg'} breadCrumbArr={[]} breadCrumbLinkArr={[]} />
                <div className="my-3 px-4 py-8 lg:w-[1500px] md:w-[1000px] w-[600px] shadow-lg bg-gray-200/85 ">
                    <section className="mb-12 flex flex-col items-center text-center justify-center">
                        <h1 className="text-4xl font-bold mb-6">About Company</h1>
                        <p className="text-lg leading-relaxed text-gray-700">
                        United Consultants Office for Financial and Administrative Consulting was established to be one of the unique and specialized offices in the field of financial and administrative consulting. 
                        Unlike most consulting offices, we do not rely on external consultants or outsource our work to external assistants. 
                        Instead, we have attracted the most skilled and specialized consultants in all the services we offer, 
                        making them the core and main pillar of our office’s establishment.
                        The union of this elite group of specialists in commercial consulting, 
                        financial and administrative consulting, 
                        zakat and taxation, financial statements, internal and external auditing, governance, 
                        and listing in the Capital Market Authority has become the mainstay of our office. 
                        We believe that by possessing a great deal of experience, depth, and specialization, 
                        we offer unparalleled and unprecedented services compared to any other consulting office. 
                        We provide a distinguished, competitive service, and at the same time, 
                        our main goal is to fully benefit the client, 
                        protecting them from contracts that may not meet their needs or 
                        from carrying out work that does not benefit them and only depletes their funds without any significant return or benefit.
                        </p>
                    </section>
                    <section className="mb-12 flex flex-col items-center text-center justify-center">
                        <h1 className="text-4xl font-bold mb-6">Our vision</h1>
                        <p className="text-lg leading-relaxed text-gray-700">
                        At the Unified Office for Financial and Administrative Consulting, 
                        we aspire to expand to most cities across the Kingdom, 
                        following our successful establishment and reasonable growth in Riyadh. 
                        This achievement is due to our exceptional expertise in the field of financial and administrative consulting.
                        We believe that we are the best in this field, 
                        and we aim to provide our clients with the maximum benefit through our outstanding expertise.
                        </p>
                    </section>
                    <section className="mb-12 flex flex-col items-center text-center justify-center">
                        <h1 className="text-4xl font-bold mb-6">Our mission</h1>
                        <p className="text-lg leading-relaxed text-gray-700">
                        At the Unified Office for Financial and Administrative Consulting, 
                        we strive to achieve the highest level of benefit for our clients by providing the most detailed and accurate financial and administrative studies. 
                        Our goal is to ensure that these studies are not only well-researched and realistic but also actionable models that our clients can rely on to build their expansion and growth plans. 
                        This approach sets us apart and distinguishes us from our peers in the field. We aim to achieve a high level of client satisfaction, 
                        enabling us to build long-lasting bridges of cooperation and mutual success.
                        </p>
                    </section>
                    <section className="mb-12 flex flex-col items-center text-center justify-center">
                        <h1 className="text-4xl font-bold mb-6">Our goals</h1>
                        <p className="text-lg leading-relaxed text-gray-700">
                        Our primary goal is to provide you with complete benefits and maximize the value of our services.
                        - Our objectives are always centered around playing an active role in helping and ensuring the success of our clients by delivering valuable consulting services, 
                        regardless of financial compensation. Our focus is never on selling our services but rather on the success of our clients.
                        - The quality of our services has been thoroughly audited to serve as a key element in our clients' success.
                        - Our office is committed to ensuring your satisfaction with the services provided by all means and solutions, 
                        including revisiting meetings to understand your needs better and reviewing all deliverables and consultations to serve you in the best possible way.
                        - Achieving the widest reach across cities in the Kingdom.
                        - Delivering the highest quality output in financial and administrative studies, 
                        unprecedented in the Kingdom, through the expertise of seasoned professionals in this field.
                        - Unmatched excellence in achieving the highest level of professionalism in internal coordination and management.
                        - In addition to our current elite team of professionals, 
                        we are continuously striving to attract more talent, 
                        and we have the necessary skills to select the best candidates to join our team.
                        </p>
                    </section>
                </div>
        </>
    );
}
