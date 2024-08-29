'use client';
import { useUserContext } from "@/lib/Providers/UserProvider";
import CommandSidebar from "@/components/Dashboard/CommandSidebar";
import {useRouter} from "next/navigation";
import {useEffect} from "react";
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const {user,isLoading}=useUserContext();
    const router = useRouter();

    useEffect(()=>{
        if (!isLoading && (!user || user.role !== "admin")){
            router.push('/admin/login');
        }
    },[isLoading,user,router]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!user || user.role !== "admin") {
        return null; // The useEffect will handle the redirect
    }
    
    return (
        <div className="flex bg-white">
            <CommandSidebar />
            <div className="lg:w-full md:w-[500px] w-[250px]" >
                {children}
            </div>
        </div>
    );
}