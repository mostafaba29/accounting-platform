import axios from 'axios';
export const fetchData = async(type:string)=>{
    try{
        const repsonse = await axios.get(`http://localhost:8000/api/v1/${type}`);
        return repsonse.data;
    }catch(error){
        console.error(error);
        return [];
    }
};