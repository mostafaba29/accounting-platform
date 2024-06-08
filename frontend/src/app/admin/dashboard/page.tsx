"use client";
import MainComponent from '@/components/MainComponent';
import AdminLoginForm from '@/components/AdminLoginForm';
import { useState } from 'react';

export default function Dashboard() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    const handleSuccessfulLogin = () => {
        setIsLoggedIn(true);
    }
    return (
        <div >
            {isLoggedIn ? <MainComponent  />
             : 
             <AdminLoginForm isLoggedIn={isLoggedIn} onLoginSuccess={handleSuccessfulLogin} />
             }
        </div>
    );
}