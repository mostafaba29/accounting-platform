"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/Footer';
import HeaderSection from '@/components/HeaderSection';
import ClientCard from '@/components/ClientCard';

const clients = [
    {
        name: 'Client 1',
        image: '/images/client1.jpg',
        description: 'Description of Client 1...',
    },
    {
        name: 'Client 2',
        image: '/images/client2.jpg',
        description: 'Description of Client 2...',
    },
    // Add more clients as needed
];

export default function ClientList() {
    const [clientsData, setClientsData] = useState([]);
    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/v1/clients');
                setClientsData(response.data.data);
            } catch (error) {
                console.log(error);
            }
        }
    }, []);
    return (
        <>
            <NavigationBar />
            <div className="flex flex-col items-center">
                <HeaderSection pageTitle={'Client List'} pageImage={'contactUs.jpg'} breadCrumbArr={[]} breadCrumbLinkArr={[]} />
                <div className="flex flex-col items-center px-4 py-8 lg:w-[1500px] md:w-[1000px] w-[600px] bg-gray-200/85 shadow-lg my-3">
                    <div className="w-full flex flex-col items-center text-center  justify-center">
                        <h1 className="text-4xl font-bold mb-6">Our Clients and Partners</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center w-full">
                            {clients.map((client, index) => (
                                <ClientCard
                                    key={index}
                                    name={client.name}
                                    image={client.image}
                                    description={client.description}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
