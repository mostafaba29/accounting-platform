'use client';
import { Service } from '@/components/types/ServicesTableColumns';
import {useState,useEffect} from 'react';
import axios from 'axios';
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/Footer';
import ServiceCard from '@/components/ServiceCard';

export default function ServicesPage(){
    const [services,setServices] = useState<Service[]>([]);
    const [currentPage,setCurrentPage] = useState(1);
    const [servicesPerPage] = useState(16);

    useEffect(()=>{
        fetchServices();
    },[]);

    const fetchServices = async ()=>{
        try{
            const response = await axios.get('http://localhost:8000/api/v1/services');
            if (response.data.status === "success" && response.data.data && Array.isArray(response.data.data.data)) {
                setServices(response.data.data.data);
            } else {
                console.error('Invalid response format:', response.data);
                setServices([]);
            }   
        }catch(error){
            console.log(error);
        }
    }
    const indexOfLastService = currentPage * servicesPerPage;
    const indexOfFirstService = indexOfLastService - servicesPerPage;
    const currentServices = Array.isArray(services) ? services.slice(indexOfFirstService, indexOfLastService) : [];

    return (
        <div className='w-full'>
        <NavigationBar />
         <div className="container mx-auto py-8">
            <div className="grid grid-cols-4 gap-4">
                 {currentServices.map((service,id) => (
                    <ServiceCard key={id} service={service} />
                ))} 
            </div>
        </div>
        <Footer /> 
        </div>
    );
}