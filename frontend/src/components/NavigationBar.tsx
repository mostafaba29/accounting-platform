"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import clsx from "clsx";
import Link from "next/link";
import {Button} from "./ui/button";
import Image from "next/image";
import { useUserContext } from "@/lib/Providers/UserProvider";
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
import {useQueryClient,useMutation,useQuery} from '@tanstack/react-query';
import { userLogout } from "@/lib/api/userApi";
import { fetchConsults } from "@/lib/api/consultsApi";

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
    const [isScrolled, setIsScrolled] = React.useState(false);
    const queryClient = useQueryClient();
    // user context hook for the user data query
    const { data: user } = useUserContext();

    //mutations on the navigation bar
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


    //queries for the navigation bar
    const {data:consults}=useQuery({
      queryKey:['consults'],
      queryFn:fetchConsults,
      staleTime:1000*60*60,
      gcTime:1000*60*60*24,
    })

    
    React.useEffect(() => {
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
    <nav className={clsx("h-32 sticky top-0 flex flex-col z-50 transition-colors duration-300 ",
      { "bg-gradient-to-b from-blue-500/75 to-blue-300/50 shadow-md": isScrolled, 
        "bg-gradient-to-b from-blue-800/85 to-blue-500/85": !isScrolled }
    )}>
          <div className="flex flex-row items-center justify-between px-4">
            <Link href="/"><Image src="/UnitedLogo.png" alt="logo" width={240} height={80}/></Link>
            <div className="flex flex-row items-center ml-4 ">
              <Link href="/search">
              <Search size={36} className=" text-white ml-4 p-1 hover:rounded-full hover:text-black hover:bg-white  "/>
              </Link>
              {!user || user.role === "admin" ? 
              (
                <Link href='auth/login'>
                  <LogIn size={36} className="text-white ml-4 p-1 rounded-full hover:text-black hover:bg-white "/>
                </Link>
              ) 
              : (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <User size={36} className="text-white ml-4 p-1 rounded-full hover:text-black hover:bg-white " />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-36 ml-1 flex flex-col items-center">
                  <DropdownMenuItem className="w-full flex flex-col items-center hover:bg-blue-500 hover:text-white font-semibold text-base ">
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
              )}
              {/* <Link href={`/user/${user.data.data._id}/cart`}>
              <ShoppingBasket size={36} className="text-white ml-4 p-1 rounded-full hover:text-black hover:bg-white "/>
              </Link> */}
              {/* <Link href="/contact-us">
              <Phone size={36} className="text-white ml-4 p-1 rounded-full hover:text-black hover:bg-white "/>
              </Link> */}
              <Button variant="ghost" className="text-white p-1 font-bold rounded-full ml-4 w-[36px] h-[36px]  hover:text-black hover:bg-white  "><p className='text-lg'>ع</p></Button>
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
                    {consults && (consults.map((item) => (
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
          {/* <NavigationMenu>
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
          </NavigationMenu>   */}
          </div>
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