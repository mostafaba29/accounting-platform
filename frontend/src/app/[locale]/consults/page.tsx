'use client';
import { Consultation } from '@/components/types/ConsultationTableColumns';
import {useState,useEffect} from 'react';
import axios from 'axios';
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/shared/Footer';
import ConsultCard from '@/components/ConsultCard';
import HeaderSection from '@/components/shared/HeaderSection';

export default function ConsultsPage(){
    const [consults,setConsults] = useState<Consultation[]>([]);
    const [currentPage,setCurrentPage] = useState(1);
    const [consultsPerPage] = useState(16);

    useEffect(()=>{
        fetchConsults();
    },[]);

    const fetchConsults = async ()=>{
        try{
            const response = await axios.get('http://localhost:8000/api/v1/consults');
            if (response.data.status === "success" && response.data.data && Array.isArray(response.data.data.data)) {
                setConsults(response.data.data.data);
            } else {
                console.error('Invalid response format:', response.data);
                setConsults([]);
            }   
        }catch(error){
            console.log(error);
        }
    }
    const indexOfLastConsult = currentPage * consultsPerPage;
    const indexOfFirstConsult = indexOfLastConsult - consultsPerPage;
    const currentConsults = Array.isArray(consults) ? consults.slice(indexOfFirstConsult, indexOfLastConsult) : [];

    return (
        <div className='w-full'>
        <NavigationBar />
        <div className='flex flex-col items-center'>
            <HeaderSection pageTitle="Consults" pageImage='contactUs.jpg' breadCrumbArr={[]} breadCrumbLinkArr={[]}/>
            <div className="lg:w-[1500px] md:w-[1000px] w-[600px] p-4 m-2 shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center">
                    {currentConsults.map((consult,id) => (
                        <ConsultCard key={id} consult={consult} />
                    ))} 
                </div>
            </div>
        </div>
        <Footer /> 
        </div>
    );
}