"use client";
import {useState,useEffect} from 'react';
import axios from 'axios';
import { User } from '@/components/types/UserTableColumns';
export default function AdminUserView (){
    const [userData,setUserData] = useState<User>();

    const fetchUserData = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/users/${id}`);
            setUserData(response.data.data.data);
        }catch(error){
            console.log(error);
        }
    }
    return (
        <div>
            <h2>Username : {userData?.name}</h2>
            <h2>email : {userData?.email}</h2>
            <h2>Phone : {userData?.phone}</h2>
            <h2>Is an Active user : {userData?.active}</h2>
            <p>Purchases : {userData?.purchases.map((purchase,index)=>(
                <p key={index} >{purchase.EnTitle}</p>
            ))}</p>
        </div>
    )
}