// "use server";

import axios from 'axios';
import { Inquiry } from '../types/inquiry';
//about-us 
export const fetchAboutUsInfo = async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/v1/about');
        return response.data.data.data;
    } catch (error) {
        throw new Error('Error fetching about us data:', error);
    }
};

//client-list

export const fetchClientList = async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/v1/clients');
        return response.data.data.data;
    } catch (error) {
        throw new Error('Error fetching client list:', error);
    }
}

//contact-us

export const fetchContactUsInfo = async ()=>{
    try{
        const response = await axios.get('http://localhost:8000/api/v1/contact');
        return response.data.data.data[0];
    }catch(error){
        throw new Error('Error fetching contact us data:', error);
    }
}


//contact-us and join-us request
export const postInquiry = async (inquiry: Inquiry) => {
    try {
        const response = await axios.post('http://localhost:8000/api/v1/contact/contact_us',
            inquiry
        );
        return response;
    } catch (error) {
        throw new Error('Error posting inquiry:', error);
    }
}