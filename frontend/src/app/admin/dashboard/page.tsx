"use client";
import MainComponent from '@/components/MainComponent';
import AdminLoginForm from '@/components/AdminLoginForm';
import { useState } from 'react';
import DashboardCard from '@/components/Dashboard/DashboardCard';
import PostsTable from '@/components/posts/PostsTable';
import AnalyticsChart from '@/components/Dashboard/AnalyticsChart';
import { Newspaper } from 'lucide-react';
export default function Dashboard() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    const handleSuccessfulLogin = () => {
        setIsLoggedIn(true);
    }
    if(!isLoggedIn){
        return (<AdminLoginForm isLoggedIn={isLoggedIn} onLoginSuccess={handleSuccessfulLogin} />)
    }
    return (
        <>
        <h1 className="text-3xl font-bold text-center m-2 w-full">Admin Dashboard</h1>
        <div className="flex flex-row justify-between gap-5 m-2">
            <DashboardCard title={'posts'} value={10} icon={<Newspaper size="48" className="text-slate-400" />}/>
            <DashboardCard title={'posts'} value={10} icon={<Newspaper size="48" className="text-slate-400" />}/>
            <DashboardCard title={'posts'} value={10} icon={<Newspaper size="48" className="text-slate-400" />}/>
            <DashboardCard title={'posts'} value={10} icon={<Newspaper size="48" className="text-slate-400" />}/>
            <DashboardCard title={'posts'} value={10} icon={<Newspaper size="48" className="text-slate-400" />}/>
            <DashboardCard title={'posts'} value={10} icon={<Newspaper size="48" className="text-slate-400" />}/>
        </div>
        <AnalyticsChart />
        <PostsTable title={'posts'}/>
            {/* <div >
                {true ? <MainComponent  />
                : 
                <AdminLoginForm isLoggedIn={true} onLoginSuccess={handleSuccessfulLogin} />
                }
            </div> */}
        </>    
    );
}