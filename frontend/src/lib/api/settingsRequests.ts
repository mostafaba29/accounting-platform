import axios from "axios";
import {Member} from '@/components/types/MembersTableColumns';
//landing-page

interface Service {
    _id:string;
    title_AR:string;
    title_EN:string;
    description_AR:string;
    description_EN:string;
    icon:string;
}
export interface LandingPageData {
    intro_AR:string;
    intro_EN:string;
    services:Service[];
    _id:string;
}
export const fetchLandingPageData = async () => {
    try {
        const response = await axios.get("http://localhost:8000/api/v1/landingContent",{
            withCredentials: true
        });
        return response.data.data.data[0];
    } catch (error) {
        throw new Error("Error fetching landing page data:", error);
    }
};

export const updateLandingPageData = async(data:LandingPageData)=>{
    try {
        const response = await axios.patch(`http://localhost:8000/api/v1/landingContent/${data._id}`,data,{
            withCredentials: true
        });
        return response.data;
    }catch(error){
        throw new Error("Error updating landing page data:", error);
    }
}

//about us 

interface aboutUsData {
    aboutUs_AR:string;
    aboutUs_EN:string;
    ourVision_AR:string;
    ourVision_EN:string;
    messege_AR:string;
    messege_EN:string;
    goals_AR:string;
    goals_EN:string;
    coverImage:File;
}

interface updateAboutUsData {
    id:string;
    data:aboutUsData
}
export const fetchAboutUsInfo = async () => {
    try {
        const response = await axios.get("http://localhost:8000/api/v1/aboutUs",{
            withCredentials: true
        });
        return response.data.data.data[0];
    } catch (error) {
        throw new Error("Error fetching about us data:", error);
    }
}

export const updateAboutUsInfo = async({id,data}:updateAboutUsData)=>{
    try {
        const response = await axios.patch(`http://localhost:8000/api/v1/aboutUs/${id}`,data,{
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true
        });
        return response.data;
    }catch(error){
        throw new Error("Error updating about us data:", error);
    }
}

//privacy policy

interface privacyPolicyData {
    description_AR:string;
    description_EN:string;
    coverImage:File;
}

interface updatePrivacyPolicyData{
    id:string;
    data:privacyPolicyData
}

export const fetchPrivacyPolicyInfo = async () => {
    try {
        const response = await axios.get("http://localhost:8000/api/v1/privacyPolicy",{
            withCredentials: true
        });
        return response.data.data.data[0];
    } catch (error) {
        throw new Error("Error fetching privacy policy data:", error);
    }
}

export const updatePrivacyPolicyInfo = async({id,data}:updatePrivacyPolicyData)=>{
    try {
        const response = await axios.patch(`http://localhost:8000/api/v1/privacyPolicy/${id}`,data,{
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true
        });
        return response.data;
    }catch(error){
        throw new Error("Error updating privacy policy data:", error);
    }
}

//terms and conditions

interface termsAndConditionsData {
    description_AR:string;
    description_EN:string;
    coverImage:File;
}

interface upadateTermsAndConditionsData {
    id:string;
    data:termsAndConditionsData
}

export const fetchTermsAndConditionsInfo = async () => {
    try {
        const response = await axios.get("http://localhost:8000/api/v1/termsAndConditions",{
            withCredentials: true
        });
        return response.data.data.data[0];
    } catch (error) {
        throw new Error("Error fetching privacy policy data:", error);
    }
}

export const updateTermsAndConditionsInfo = async({id,data}:upadateTermsAndConditionsData)=>{
    try {
        const response = await axios.patch(`http://localhost:8000/api/v1/termsAndConditions/${id}`,data,{
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
        });
        return response.data;
    }catch(error){
        throw new Error("Error updating privacy policy data:", error);
    }
}

//team requests 

export const fetchTeamMembers = async () => {
    try {
        const response = await axios.get("http://localhost:8000/api/v1/members",{
            withCredentials: true
        });
        return response.data.data.data;
    } catch (error) {
        throw new Error("Error fetching team members:", error);
    }
}

export const addNewTeamMember = async(data:Member)=>{
    try {
        const response = await axios.post("http://localhost:8000/api/v1/members",data,{
            withCredentials: true
        });
        return response.data;
    }catch(error){
        throw new Error("Error adding new team member:", error);
    }
}

//clients
interface Client {
    name_AR:string;
    name_EN:string;
}

interface updateClientsData {
    id:string;
    data:Client
}
export const fetchClients = async () => {
    try {
        const response = await axios.get("http://localhost:8000/api/v1/clients",{
            withCredentials: true
        });
        return response.data.data.data;
    } catch (error) {
        throw new Error("Error fetching clients:", error);
    }
}

export const fetchOneClient = async (id:string) => {
    try {
        const response = await axios.get(`http://localhost:8000/api/v1/clients/${id}`,{
            withCredentials: true
        });
        return response.data.data.data;
    } catch (error) {
        throw new Error("Error fetching one client:", error);
    }
}

export const updateClients = async({id,data}:updateClientsData)=>{
    try{
        const response = await axios.patch(`http://localhost:8000/api/v1/clients/${id}`,data,{
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true
        });
    }catch(error){
        throw new Error("Error updating clients:", error);
    }
}

export const AddClients = async(data:Client)=>{
    try {
        const response = await axios.post("http://localhost:8000/api/v1/clients",data,{
            withCredentials: true
        });
        return response.data;
    }catch(error){
        throw new Error("Error adding new client:", error);
    }
}