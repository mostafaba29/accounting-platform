"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/Footer';
import HeaderSection from '@/components/HeaderSection';
import MemberCard from '@/components/about-us/MemberCard';
import axios from 'axios';

export default function AboutUs() {
    const [founders, setFounders] = useState([]);
    const [members, setMembers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/v1/about-us');
                const { founders, members } = response.data; 
                setFounders(founders);
                setMembers(members);
            } catch (error) {
                console.error('Error fetching about us data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <NavigationBar />
            <div className="flex flex-col items-center">
                <HeaderSection pageTitle={'About us'} pageImage={'contactUs.jpg'} breadCrumbArr={[]} breadCrumbLinkArr={[]} />
                <div className="my-3 px-4 py-8 lg:w-[1500px] md:w-[1000px] w-[600px] shadow-lg bg-gray-200/85 ">
                    <section className="mb-12 flex flex-col items-center text-center justify-center">
                        <h1 className="text-4xl font-bold mb-6">About Company</h1>
                        <p className="text-lg leading-relaxed text-gray-700">
                            Our accounting company, with over 20 years of experience,
                            stands as a beacon of excellence and reliability in the financial sector.
                            We have honed our skills across all manners of accounting problems,
                            offering comprehensive solutions to businesses of all sizes.
                            Our expertise spans from meticulous bookkeeping and financial reporting to strategic tax planning and compliance.
                            Our dedicated team of professionals is committed to delivering personalized services tailored to meet the unique needs of each client.
                            We pride ourselves on our ability to navigate the complexities of the financial world,
                            ensuring our clients achieve their financial goals with confidence and peace of mind.
                            Trust in our experience, and let us guide you towards financial success with our unmatched dedication and skill.
                        </p>
                    </section>
                    <section className="flex flex-col items-center text-center justify-center">
                        <h1 className="text-4xl font-bold mb-6">Founders</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {founders.map((founder, index) => (
                                <div key={index} className="flex flex-col items-center text-center">
                                    <Image
                                        src={founder.image}
                                        alt={founder.name}
                                        className="rounded-full"
                                        width={150}
                                        height={150}
                                    />
                                    <h2 className="text-2xl font-semibold mt-4">{founder.name}</h2>
                                    <p className="text-gray-600 mt-2">{founder.jobTitle}</p>
                                    <p className="mt-2 text-gray-700">{founder.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                    <section className="flex flex-col items-center text-center justify-center">
                        <h1 className="text-2xl font-bold my-6">Team members</h1>
                        {members.map((member, index) => (
                            <MemberCard
                                key={index}
                                name={member.name}
                                image={member.image}
                                jobTitle={member.jobTitle}
                                description={member.description}
                            />
                        ))}
                    </section>
                </div>
            </div>
            <Footer />
        </>
    );
}
