
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
  } from "lucide-react";
  import Link from "next/link";
  import axios from 'axios';

export default function CommandSidebar (){

    return (
        <Command className="bg-neutral-100 h-[100vh] w-[300px] rounded-none ">
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Dashboard Commands">
                <CommandItem className= 'flex flex-row'>
                    <Link className='flex flex-row' href="/admin/dashboard">
                        <Home className="mr-2 h-5 w-5" /> 
                        <span className="font-semibold">Dashboard</span>
                    </Link>
                    <CommandShortcut>⌘M</CommandShortcut>
                </CommandItem>
                <CommandItem className="flex flex-row">
                    <Link className="flex flex-row" href="/admin/dashboard/services">
                        <Wrench className="mr-2 h-5 w-5" /> 
                        <span className="font-semibold">Services</span>
                    </Link>
                    <CommandShortcut>⌘P</CommandShortcut>
                </CommandItem>
                <CommandItem className="flex flex-row">
                    <Link className="flex flex-row" href="/admin/dashboard/products">
                        <FileBarChart className="mr-2 h-5 w-5" /> 
                        <span className="font-semibold">Products</span>
                    </Link>
                    <CommandShortcut>⌘P</CommandShortcut>
                </CommandItem>
                <CommandItem className="flex flex-row">
                    <Link className="flex flex-row" href="/admin/dashboard/blogs">
                        <Book className="mr-2 h-5 w-5" /> 
                        <span className="font-semibold">Blogs</span>
                    </Link>
                    <CommandShortcut>⌘B</CommandShortcut>
                </CommandItem>
                <CommandItem className="flex flex-row">
                    <Link className="flex flex-row" href="/admin/dashboard/users">
                        <Users className="mr-2 h-5 w-5" />
                        <span className="font-semibold">Users</span>
                    </Link>
                    <CommandShortcut>⌘U</CommandShortcut>
                </CommandItem>
                <CommandItem className="flex flex-row">
                    <Link className="flex flex-row" href="/admin/dashboard/analytics">
                        <LineChart className="mr-2 h-5 w-5" /> 
                        <span className="font-semibold">Analytics</span>
                    </Link>
                    <CommandShortcut>⌘A</CommandShortcut>
                </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Settings">
                <CommandItem className="flex flex-row">
                    <Link className="flex flex-row" href="/admin/dashboard/settings">
                        <Settings className="mr-2 h-5 w-5" /> 
                        <span className="font-semibold">Settings</span>
                    </Link>
                    <CommandShortcut>⌘S</CommandShortcut>
                </CommandItem>
                </CommandGroup>
            </CommandList>
        </Command>
    )
}