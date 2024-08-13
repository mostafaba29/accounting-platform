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