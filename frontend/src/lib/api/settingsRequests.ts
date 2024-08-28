import axios from "axios";

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
    _id:string;
    aboutUs_AR:string;
    aboutUs_EN:string;
    ourVision_AR:string;
    ourVision_EN:string;
    messege_AR:string;
    messege_EN:string;
    goals_AR:string;
    goals_EN:string;
    coverImage:string;
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

export const updateAboutUsInfo = async(data:aboutUsData)=>{
    try {
        const response = await axios.patch(`http://localhost:8000/api/v1/aboutUs/${data._id}`,data,{
            withCredentials: true
        });
        return response.data;
    }catch(error){
        throw new Error("Error updating about us data:", error);
    }
}

//privacy policy

interface privacyPolicyData {
    _id:string;
    description_AR:string;
    description_EN:string;
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

export const updatePrivacyPolicyInfo = async(data:privacyPolicyData)=>{
    try {
        const response = await axios.patch(`http://localhost:8000/api/v1/privacyPolicy/${data._id}`,data,{
            withCredentials: true
        });
        return response.data;
    }catch(error){
        throw new Error("Error updating privacy policy data:", error);
    }
}

//terms and conditions

interface termsAndConditionsData {
    _id:string;
    description_AR:string;
    description_EN:string;
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

export const updateTermsAndConditionsInfo = async(data:termsAndConditionsData)=>{
    try {
        const response = await axios.patch(`http://localhost:8000/api/v1/termsAndConditions/${data._id}`,data,{
            withCredentials: true
        });
        return response.data;
    }catch(error){
        throw new Error("Error updating privacy policy data:", error);
    }
}