'use client';
import { Consultation } from '@/components/types/ConsultationTableColumns';
import {useState,useEffect} from 'react';
import axios from 'axios';
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/Footer';
import ConsultCard from '@/components/ConsultCard';

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
         <div className="container mx-auto py-8">
            <div className="grid grid-cols-4 gap-4">
                 {currentConsults.map((consult,id) => (
                    <ConsultCard key={id} consult={consult} />
                ))} 
            </div>
        </div>
        <Footer /> 
        </div>
    );
}