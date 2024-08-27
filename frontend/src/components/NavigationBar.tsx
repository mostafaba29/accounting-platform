"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import Link from "next/link";
import {Button} from "./ui/button";
import Image from "next/image";
import { useUserContext } from "@/lib/Providers/UserProvider";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ShoppingCart, User, Menu, LogIn } from 'lucide-react';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { userLogout } from "@/lib/api/userApi";
import { fetchConsults } from "@/lib/api/consultsApi";

interface UserMenuProps {
  user: any;
  logout: () => void;
}
const UserMenu = ({ user, logout }: UserMenuProps) => (
  <DropdownMenu>
    <DropdownMenuTrigger>
      <User size={36} className="text-white ml-4 p-1 rounded-full hover:text-black hover:bg-white" />
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-36 ml-1 flex flex-col items-center">
      <DropdownMenuItem className="w-full flex flex-col items-center hover:bg-blue-500 hover:text-white font-semibold text-base">
        <Link href={`/user/${user.data.data._id}/cart`}>Cart</Link>
      </DropdownMenuItem>
      <DropdownMenuItem className="w-full flex flex-col items-center hover:bg-blue-500 hover:text-white font-semibold text-base">
        <Link href={`/user/${user.data.data._id}/orders`}>Orders</Link>
      </DropdownMenuItem>
      <DropdownMenuItem className="w-full flex flex-col items-center hover:bg-blue-500 hover:text-white font-semibold text-base">
        <p className="hover:cursor-pointer" onClick={logout}>Logout</p>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
)

interface NavItemProps {
  title: string;
  children?: React.ReactNode;
}
const NavItem = ({ title, children }: NavItemProps) => (
  <NavigationMenu>
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuTrigger className="bg-transparent text-white">{title}</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid gap-3 p-4 md:w-[200px] lg:w-[275px] sm:w-[100]">
            {children}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
)

interface MobileNavItemProps {
  title: string;
  children?: React.ReactNode;
}
const MobileNavItem = ({ title, children }: MobileNavItemProps) => (
  <Accordion type="single" collapsible className="w-full">
    <AccordionItem value={title}>
      <AccordionTrigger className="text-white">{title}</AccordionTrigger>
      <AccordionContent>
        {children}
      </AccordionContent>
    </AccordionItem>
  </Accordion>
)

interface MobileUserMenuProps {
  user: any;
  logout: () => void;
}
const MobileUserMenu = ({ user, logout }: MobileUserMenuProps) => (
  <Accordion type="single" collapsible className="w-full">
    <AccordionItem value="user-menu">
      <AccordionTrigger className="text-white">Profile</AccordionTrigger>
      <AccordionContent>
        <Link href={`/user/${user.data.data._id}/cart`} className="block py-2 text-white">Cart</Link>
        <Link href={`/user/${user.data.data._id}/orders`} className="block py-2 text-white">Orders</Link>
        <button onClick={logout} className="block py-2 text-white">Logout</button>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
)


export default function NavigationBar(){
    const queryClient = useQueryClient();
    const { data: user } = useUserContext();
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

    const {mutateAsync:mutateUserLogout}=useMutation({
      mutationFn:userLogout,
      onSuccess:()=>{
        queryClient.invalidateQueries({queryKey:['user']})
        window.location.href='/';     
      }
    })
    const logout = async () => {
      try {
        mutateUserLogout();
      }catch (error) {
        console.log(error);
      }
    }

    const {data:consults}=useQuery({
      queryKey:['consults'],
      queryFn:fetchConsults,
      staleTime:1000*60*60,
      gcTime:1000*60*60*24,
    })

    return(
    <nav className={`transition-colors duration-300 bg-unitedPrimary ${mobileMenuOpen ? 'h-screen' : 'h-16 md:h-28'}`}>
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-row items-center justify-between h-16 md:h-auto">
            <Link href="/" className="hidden md:block"><Image src="/UnitedLogo.png" alt="logo" width={175} height={80}/></Link>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <Link href="/products"><Button variant="ghost" className="text-black font-semibold bg-unitedSecondary"><ShoppingCart className="h-6 w-6 mx-1" /> Store</Button></Link>
                {!user || user.role === "admin" ? (
                  <Link href='auth/login'>
                    <LogIn size={36} className="text-white ml-4 p-1 rounded-full hover:text-black hover:bg-white" />
                  </Link>
                ) : (
                  <UserMenu user={user} logout={logout} />
                )}
                <Button variant="ghost" className="text-white p-1 font-bold rounded-full ml-4 w-[36px] h-[36px] hover:text-black hover:bg-white"><p className='text-lg'>ع</p></Button>
              </div>
            </div>
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-unitedSecondary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <Menu className="block h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-baseline space-x-4">
              <NavItem title="A3mali services" />
              <NavItem title="Accounting services" />
              <NavItem title="Reviewing services" />
              <NavItem title="Financial consults" />
              <NavItem title="HR consults" />
              <NavItem title="Help">
                <Link href='/contact-us'><ListItem title="Contact us" className="hover:text-white hover:bg-sky-800"/></Link>
                <Link href='/join-us'><ListItem title="Join Us" className="hover:text-white hover:bg-sky-800"/></Link>
                <Link href='/faq'><ListItem title="FAQ" className="hover:text-white hover:bg-sky-800"/></Link>
                <Link href='/terms-and-conditions'><ListItem title="Terms and conditions" className="hover:text-white hover:bg-sky-800"/></Link>
                <Link href='/privacy-policy'><ListItem title="Privacy policy" className="hover:text-white hover:bg-sky-800"/></Link>
              </NavItem>
              <Button variant="ghost" className="text-white hover:bg-slate-100/50">Our Clients</Button>
              <Button variant="ghost" className="text-white hover:bg-slate-100/50">Articles</Button>    
            </div>
          </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-start">
            <MobileNavItem title="A3mali services" />
            <MobileNavItem title="Accounting services" />
            <MobileNavItem title="Reviewing services" />
            <MobileNavItem title="Financial consults" />
            <MobileNavItem title="HR consults" />
            <MobileNavItem title="Help">
              <Link href='/contact-us' className="block py-2 text-white">Contact us</Link>
              <Link href='/join-us' className="block py-2 text-white">Join Us</Link>
              <Link href='/faq' className="block py-2 text-white">FAQ</Link>
              <Link href='/terms-and-conditions' className="block py-2 text-white">Terms and conditions</Link>
              <Link href='/privacy-policy' className="block py-2 text-white">Privacy policy</Link>
            </MobileNavItem>
            <Link href='/client-list' className=" w-full text-white text hover:bg-slate-100/50 py-2 px-1">Our Clients</Link>
            <Link href='/blogs'className=" w-full text-white text hover:bg-slate-100/50 py-2 px-1">Articles</Link>
            <Link href='/products' className=" w-full text-white text hover:bg-slate-100/50 py-2 px-1"><ShoppingCart className="h-6 w-6 mr-2 inline" /> Store</Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="px-2">
              {!user || user.role === "admin" ? (
                <Link href='auth/login' className="block py-2 text-white">
                  <LogIn className="h-6 w-6 mr-2 inline" /> Login
                </Link>
              ) : (
                <MobileUserMenu user={user} logout={logout} />
              )}
              <Button variant="ghost" className="w-full text-left text-white hover:bg-slate-100/50 mt-2">
                Language: <span className='text-lg ml-2'>ع</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a 
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"