import {
    FileBarChart,
    Book,
    Users,
    Home,
    Settings,
    Package,
    LineChart,
    Wrench,
  } from "lucide-react";
  import Link from "next/link";
  import Image from "next/image";
  
  export default function CommandSidebar() {
    const locale='en';
  
    return (
      <div className="bg-sky-700 min-h-screen md:w-[200px] w-[50px] rounded-none shadow-lg sticky">
        <Image src={'/unitedLogo.png'} width={200} height={200} alt="logo" className="p-1" />
        <div className="flex flex-col items-start my-2">
          <div className='flex flex-row my-1 w-full'>
            <Link href={`/${locale}/admin/dashboard`} className='flex flex-row items-center w-full p-1 hover:bg-sky-600'>
              <Home className="mx-2 h-5 w-5 text-white" />
              <span className="font-semibold text-white hidden md:block">Dashboard</span>
            </Link>
          </div>
          <div className="flex flex-row my-1 w-full">
            <Link href={`/${locale}/admin/dashboard/consultations`} className="flex flex-row items-center w-full p-1 hover:bg-sky-600">
              <Wrench className="mx-2 h-5 w-5 text-white" />
              <span className="font-semibold text-white hidden md:block">Consultations</span>
            </Link>
          </div>
          <div className="flex flex-row my-1 w-full">
            <Link href={`/${locale}/admin/dashboard/products`} className="flex flex-row items-center w-full p-1 hover:bg-sky-600">
              <FileBarChart className="mx-2 h-5 w-5 text-white" />
              <span className="font-semibold text-white hidden md:block">Products</span>
            </Link>
          </div>
          <div className="flex flex-row my-1 w-full">
            <Link href={`/${locale}/admin/dashboard/blogs`} className="flex flex-row items-center w-full p-1 hover:bg-sky-600">
              <Book className="mx-2 h-5 w-5 text-white" />
              <span className="font-semibold text-white hidden md:block">Blogs</span>
            </Link>
          </div>
          <div className="flex flex-row my-1 w-full">
            <Link href={`/${locale}/admin/dashboard/users`} className="flex flex-row items-center w-full p-1 hover:bg-sky-600">
              <Users className="mx-2 h-5 w-5 text-white" />
              <span className="font-semibold text-white hidden md:block">Users</span>
            </Link>
          </div>
          <div className="flex flex-row my-1 w-full">
            <Link href={`/${locale}/admin/dashboard/packages`} className="flex flex-row items-center w-full p-1 hover:bg-sky-600">
              <Package className="mx-2 h-5 w-5 text-white" />
              <span className="font-semibold text-white hidden md:block">Packages</span>
            </Link>
          </div>
          <div className="flex flex-row my-1 w-full">
            <Link href={`/${locale}/admin/dashboard/analytics`} className="flex flex-row items-center w-full p-1 hover:bg-sky-600">
              <LineChart className="mx-2 h-5 w-5 text-white" />
              <span className="font-semibold text-white hidden md:block">Analytics</span>
            </Link>
          </div>
        </div>
        <div className="flex flex-row my-1 w-full">
          <Link href={`/${locale}/admin/dashboard/settings`} className="flex flex-row items-center w-full p-1 hover:bg-sky-600">
            <Settings className="mx-2 h-5 w-5 text-white" />
            <span className="font-semibold text-white hidden md:block">Settings</span>
          </Link>
        </div>
      </div>
    );
  }
  