"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import clsx from "clsx";
import Link from "next/link";
import {Button} from "./ui/button";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ShoppingBasket,Phone,User,Search,LogIn} from 'lucide-react';
import axios from 'axios';

const accAndFinancialServices:{title:string; href:string}[] =[
  {
    title:"Holding ledgers and accounts",
    href:'/'
  },
  {
    title:"Inner financial lists",
    href:'/'
  },
  {
    title:"Daily and monthely work reports",
    href:'/'
  },
  {
    title:"Tax and zakat disclousres",
    href:'/'
  }
]

const FinancialConsultants:{title:string; href:string}[] =[
  {
    title:"Structuring and preparation of financial managment department",
    href:'/'
  },
  {
    title:"Selection and recommendation of suitable ERP systems",
    href:'/'
  },
  {
    title:"Preparation of banking facilitaion files",
    href:'/'
  },
  {
    title:"Preparation of Internal Implementing Regulations Manual",
    href:'/'
  },
  {
    title:"Preparation of internal monitoing system manual",
    href:'/'
  },
  {
    title:"Quarterly follow-up",
    href:'/'
  },
  {
    title:"Structring and Restructuring of companys and enterprises",
    href:'/' 
  },
  {
    title:"Application of ERP systems",
    href:'/'
  },
  {
    title:"Certified financial lists",
    href:'/'
  },
  {
    title:"Preparation of of judgmental manual and commities",
    href:'/'
  },
  {
    title:"Economic Feasibility Studies",
    href:'/'
  }
]

const HrServices:{title:string; href:string}[] =[
  {
    title:"full revision of human resources and the gurantee of commitment to rules and regulations",
    href:'/'
  },
  {
    title:"Preparation and design of the companys human resource plan",
    href:'/'
  },
  {
    title:"Job analysis and job description",
    href:'/'
  },
  {
    title:"Polices, procedures and guidelines manual",
    href:'/'
  },
  {
    title:"Preparation, management and overseeing governmental platforms",
    href:'/'
  },
  {
    title:"Revision of contracts and desining suitable clauses for activitys",
    href:'/'
  },
  {
    title:"Prparing array of permissions for human resources",
    href:'/'
  },
  {
    title:"Medical insurance",
    href:'/'
  },
  {
    title:"Training plans",
    href:'/'
  },
  {
    title:"Human resources consultants",
    href:'/'
  },
  {
    title:"Workload analysis",
    href:'/'
  },
  {
    title:"Internal regulations preparaion",
    href:'/'
  },
  {
    title:"Performance evaluation systems",
    href:'/'
  },
  {
    title:"Salary managment and salary protection system",
    href:'/'
  },
  {
    title:"Time and attendence managment",
    href:'/'
  },
  {
    title:"Evaluation and overseeing general or specific housing plans",
    href:'/'
  },
  {
    title:"Full excel databases for employees including a dynamic dashobard",
    href:'/'
  },
  {
    title:"dynamic salary and overtime databases",
    href:'/'
  },
  {
    title:"Annual holidays and holiday plans databases",
    href:'/'
  },
  {
    title:"Sick leave,sanctions and Irregularities databases",
    href:'/'
  },
  {
    title:"Total employee costs databases",
    href:'/'
  }
]
export default function NavigationBar(){
    const [userLoggedIn,setUserLoggedIn] = React.useState(false);
    const [userData,setUserData] = React.useState({});
    const [profileIconActive,setProfileIconActive] = React.useState(false);
    const [consults,setConsults] = React.useState([]);
    const [isScrolled, setIsScrolled] = React.useState(false);
    const checkUser = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/users/me',{withCredentials: true });
        console.log(response.data.status);
        console.log(response.data.data.data.role);
        if (response.data.status === "success" && response.data.data.data.role !== "admin") {
          setUserLoggedIn(true);
          setUserData(response.data.data.data);
        }
      }catch (error) {
        console.log(error);
      }
    }

    const fetchConsults = async ()=> {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/consults');
        setConsults(response.data.data.data);
      }catch (error) {
        console.log(error);
      }
    }

    const logout = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/users/logout',{withCredentials: true });
        if (response.data.status === "success") {
          setUserLoggedIn(false);
          window.location.href = '/auth/login';
        }
      }catch (error) {
        console.log(error);
      }
    }

    React.useEffect(() => {
      checkUser();
      fetchConsults();
      const handleScroll = () => {
        if (window.scrollY > 0) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      };
    
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, [isScrolled]);
    return(
    <>
      <div className={clsx("h-32 sticky top-0 flex flex-col z-50 transition-colors duration-300 shadow-md",
                      { "bg-gradient-to-b from-blue-500 to-blue-300/75": isScrolled, "bg-transparent": !isScrolled }
                    )}>
          <div className="flex flex-row items-center justify-between px-4">
            <Link href="/"><Image src="/UnitedLogo.png" alt="logo" width={240} height={80}/></Link>
            <div className="flex flex-row items-center ml-4 ">
              {!userLoggedIn ? 
              (
                <Link href='auth/login'>
                  <LogIn size={36} className="text-white ml-4 p-1 rounded-full hover:text-black hover:bg-white "/>
                </Link>
              ) 
              : (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <User size={36} className={clsx("text-white ml-4 p-1 rounded-full hover:text-black hover:bg-white ",{
                      "bg-white text-black":profileIconActive,"text-white": !profileIconActive}
                    )} onClick={() => setProfileIconActive(true)}/>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-28 ml-1 flex flex-col items-center">
                  <DropdownMenuLabel>User</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="w-full flex flex-col items-center hover:bg-blue-500 hover:text-white">
                    <Link href={`/user/${userData._id}/cart`}>Cart</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="w-full flex flex-col items-center hover:bg-blue-500 hover:text-white">
                    <Link href={`/user/${userData._id}/orders`}>Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="w-full flex flex-col items-center hover:bg-blue-500 hover:text-white">
                    <p className="hover:cursor-pointer" onClick={logout}>Logout</p>
                  </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
          
              )}
              <Link href="/products">
              <ShoppingBasket size={36} className="text-white ml-4 p-1 rounded-full hover:text-black hover:bg-white "/>
              </Link>
              <Link href="/contact-us">
              <Phone size={36} className="text-white ml-4 p-1 rounded-full hover:text-black hover:bg-white "/>
              </Link>
              <Link href="/search">
              <Search size={36} className=" text-white ml-4 p-1 rounded-full hover:text-black hover:bg-white  "/>
              </Link>
              <Button variant="ghost" className="text-black bg-white font-bold rounded-full ml-4  hover:text-white hover:bg-sky-500  ">ع</Button>
            </div>
          </div>
          <div className="flex flex-row w-full items-start gap-4 ml-1">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white ">Platform</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[200px] lg:w-[275px] sm:w-[100] ">
                    <Link href='/about-us'><ListItem title="About us" className="hover:text-white hover:bg-sky-800"/></Link>
                    <Link href='/contact-us'><ListItem title="Contact us" className="hover:text-white hover:bg-sky-800"/></Link>
                    <Link href='/join-us'><ListItem title="join Us" className="hover:text-white hover:bg-sky-800"/></Link>
                    <Link href='/partners'><ListItem title="Client List" className="hover:text-white hover:bg-sky-800"/></Link>
                    <Link href='/terms-and-conditions'><ListItem title="Terms and conditions" className="hover:text-white hover:bg-sky-800"/></Link>
                    <Link href='/privacy-policy'><ListItem title="Privacy policy" className="hover:text-white hover:bg-sky-800"/></Link>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white ">Consults</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[200px] lg:w-[275px] sm:w-[100] ">
                    {(consults.map((item) => (
                      <Link href={`/consults/${item._id}`} key={item.title_EN}>
                        <ListItem key={item._id} title={item.title_EN} className="hover:text-white hover:bg-sky-800"/>
                      </Link>
                    )))
                    }
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white  ">Financial consultants</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[200px] lg:w-[275px] sm:w-[100] ">
                    {FinancialConsultants.map((item) => (
                      <Link href={item.href} key={item.title}>
                        <ListItem key={item.title} title={item.title} />
                      </Link>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white  ">Hr services</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[300px] lg:w-[450px] sm:w-[300] grid-cols-2 ">
                    {HrServices.map((item) => (
                      <Link href={item.href} key={item.title}>
                        <ListItem key={item.title} title={item.title} />
                      </Link>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>  
          </div>
      </div>
    </>
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