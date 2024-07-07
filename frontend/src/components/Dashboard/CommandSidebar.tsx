
  import {
    FileBarChart,
    Book,
    Users,
    Home,
    Settings,
    Package,
    LineChart,
    Wrench,
    CircleHelp,
    HelpCircle,
  } from "lucide-react";
  import Link from "next/link";
  import axios from 'axios';

export default function CommandSidebar (){

    return (
        <div className="bg-sky-700 min-h-screen md:w-[200px] w-[50px] rounded-none shadow-lg sticky">
            <h1 className="text-sky-700 font-bold text-base text-center w-full bg-white ">Command Sidebar</h1>
            <div className="flex flex-col items-start my-2">
                <div className= 'flex flex-row my-1 w-full'>
                    <Link className='flex flex-row items-center w-full p-1 hover:bg-sky-600' href="/admin/dashboard">
                        <Home className="mx-2 h-5 w-5 text-white " /> 
                        <span className="font-semibold text-white hidden md:block">Dashboard</span>
                    </Link>
                </div>
                <div className="flex flex-row my-1 w-full">
                    <Link className="flex flex-row items-center w-full p-1 hover:bg-sky-600" href="/admin/dashboard/consultations">
                        <Wrench className="mx-2 h-5 w-5 text-white" /> 
                        <span className="font-semibold text-white hidden md:block ">Consultations</span>
                    </Link>
                </div>
                <div className="flex flex-row my-1 w-full">
                    <Link className="flex flex-row items-center w-full p-1 hover:bg-sky-600" href="/admin/dashboard/products">
                        <FileBarChart className="mx-2 h-5 w-5 text-white" /> 
                        <span className="font-semibold text-white hidden md:block ">Products</span>
                    </Link>
                </div>
                <div className="flex flex-row my-1 w-full">
                    <Link className="flex flex-row items-center w-full p-1 hover:bg-sky-600" href="/admin/dashboard/blogs">
                        <Book className="mx-2 h-5 w-5 text-white" /> 
                        <span className="font-semibold text-white hidden md:block ">Blogs</span>
                    </Link>
                </div>
                <div className="flex flex-row my-1 w-full">
                    <Link className="flex flex-row items-center w-full p-1 hover:bg-sky-600" href="/admin/dashboard/inquries">
                        <CircleHelp className="mx-2 h-5 w-5 text-white" /> 
                        <span className="font-semibold text-white hidden md:block ">Inquries</span>
                    </Link>
                </div>
                <div className="flex flex-row my-1 w-full">
                    <Link className="flex flex-row items-center w-full p-1 hover:bg-sky-600" href="/admin/dashboard/users">
                        <Users className="mx-2 h-5 w-5 text-white" /> 
                        <span className="font-semibold text-white hidden md:block ">Users</span>
                    </Link>
                </div>
                <div className="flex flex-row my-1 w-full">
                    <Link className="flex flex-row items-center w-full p-1 hover:bg-sky-600" href="/admin/dashboard/packages">
                        <Package className="mx-2 h-5 w-5 text-white" /> 
                        <span className="font-semibold text-white hidden md:block ">Packages</span>
                    </Link>
                </div>
                <div className="flex flex-row my-1 w-full">
                    <Link className="flex flex-row items-center w-full p-1 hover:bg-sky-600" href="/admin/dashboard/analytics">
                        <LineChart className="mx-2 h-5 w-5 text-white" /> 
                        <span className="font-semibold text-white hidden md:block ">Analytics</span>
                    </Link>
                </div>
            </div>
            <div className="flex flex-row my-1 w-full">
                    <Link className="flex flex-row items-center w-full p-1 hover:bg-sky-600" href="/admin/dashboard/settings">
                        <Settings className="mx-2 h-5 w-5 text-white" /> 
                        <span className="font-semibold text-white hidden md:block ">settings</span>
                    </Link>
                </div>
        </div>
    )
}