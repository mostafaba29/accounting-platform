
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
  } from "@/components/ui/command"

  import {
    FileBarChart,
    Book,
    Users,
    Home,
    Settings,
    LineChart,
    Wrench,
    CircleHelp,
  } from "lucide-react";
  import Link from "next/link";
  import axios from 'axios';

export default function CommandSidebar (){

    return (
        <Command className="bg-gray-50  h-screen  md:w-[175px] w-[50px] rounded-none ">
            <CommandList>
                <CommandGroup heading="Dashboard Commands" className="text-center font-semibold hidden md:block">
                <CommandItem className= 'flex flex-row'>
                    <Link className='flex flex-row items-center' href="/admin/dashboard">
                        <Home className="mx-2 h-5 w-5" /> 
                        <span className="font-semibold hidden md:block">Dashboard</span>
                    </Link>
                </CommandItem>
                <CommandItem className="flex flex-row">
                    <Link className="flex flex-row items-center" href="/admin/dashboard/services">
                        <Wrench className="mx-2 h-5 w-5" /> 
                        <span className="font-semibold hidden md:block">Services</span>
                    </Link>
                </CommandItem>
                <CommandItem className="flex flex-row">
                    <Link className="flex flex-row items-center" href="/admin/dashboard/products">
                        <FileBarChart className="mx-2 h-5 w-5" /> 
                        <span className="font-semibold hidden md:block">Products</span>
                    </Link>
                </CommandItem>
                <CommandItem className="flex flex-row">
                    <Link className="flex flex-row items-center" href="/admin/dashboard/blogs">
                        <Book className="mx-2 h-5 w-5" /> 
                        <span className="font-semibold hidden md:block">Blogs</span>
                    </Link>
                </CommandItem>
                <CommandItem className="flex flex-row">
                    <Link className="flex flex-row items-center" href="/admin/dashboard/inquiries">
                        <CircleHelp className="mx-2 h-5 w-5" />
                        <span className="font-semibold hidden md:block">Inquiries</span>
                    </Link>
                </CommandItem>
                <CommandItem className="flex flex-row">
                    <Link className="flex flex-row items-center" href="/admin/dashboard/users">
                        <Users className="mx-2 h-5 w-5" />
                        <span className="font-semibold hidden md:block">Users</span>
                    </Link>
                </CommandItem>
                <CommandItem className="flex flex-row items-center">
                    <Link className="flex flex-row" href="/admin/dashboard/analytics">
                        <LineChart className="mx-2 h-5 w-5" /> 
                        <span className="font-semibold hidden md:block">Analytics</span>
                    </Link>
                </CommandItem>
                <CommandSeparator />
                <CommandItem className="flex flex-row items-center">
                    <Link className="flex flex-row" href="/admin/dashboard/settings">
                        <Settings className="mx-2 h-5 w-5" /> 
                        <span className="font-semibold hidden md:block">Settings</span>
                    </Link>
                </CommandItem>
                </CommandGroup>
            </CommandList>
        </Command>
    )
}