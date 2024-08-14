// 'use server';
import axios from 'axios';

const userUrl = 'http://localhost:8000/api/v1/users';

//queries 
export const fetchUser = async () =>{
    try {
        const response = await axios.get(`${userUrl}/me`,
            {withCredentials: true}
        );
        return response.data;
    }catch(error){
        throw new Error('failed to fetch user data',error)
    }
}

export const userLogout = async ()=>{
    try {
        const response = await axios.post(`${userUrl}/logout`,
            {withCredentials: true}
        )
        return {status:response.data.status}
    }catch(error){
        throw new Error('failed to logout',error)
    }
}

//mutations

export const userLogin = async({email,password}:{email:string,password:string})=>{
    try{
        const response = axios.post(`${userUrl}/login`,{
            email,
            password
        },{withCredentials: true})
        return response
    }catch(error){
        throw new Error('failed to login',error);
    }
}

interface signupData{
    name:string;
    email:string;
    phone:string;
    password:string;
    passwordConfirm:string;
}
export const userSignup = async(data:signupData)=>{
    try{
        const response = await axios.post(`${userUrl}/signup`,
            data,
            {withCredentials: true}
        )
        return response 
    }catch(error){
        throw new Error('failed to signup',error)
    }
}