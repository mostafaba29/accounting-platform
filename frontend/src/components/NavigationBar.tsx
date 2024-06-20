"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
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

    const checkUser = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/users/me',{withCredentials: true });
        if (response.data.status === "success") {
          setUserLoggedIn(true);
        }
      }catch (error) {
        console.log(error);
      }
    }
    React.useEffect(() => {
      checkUser();
    }, []);
    return(
    <>
      <div className="h-32 bg-sky-800 sticky top-0 flex flex-col z-50">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center ml-4 ">
              {!userLoggedIn ? 
              (
                <Link href='auth/login'>
                  <LogIn size={36} className="text-white ml-4 p-1 rounded-full hover:text-black hover:bg-white "/>
                </Link>
              ) 
              : (
                <Link href="/profile">
                  <User size={36} className="text-white ml-4 p-1 rounded-full hover:text-black hover:bg-white "/>
                </Link>
              )}
              <Link href="/products">
              <ShoppingBasket size={36} className="text-white ml-4 p-1 rounded-full hover:text-black hover:bg-white "/>
              </Link>
              <Link href="/contact-us">
              <Phone size={36} className="text-white ml-4 p-1 rounded-full hover:text-black hover:bg-white "/>
              </Link>
              <Link href="/search">
              <Search size={36} className="text-white ml-4 p-1 rounded-full hover:text-black hover:bg-white "/>
              </Link>
              <Button variant="ghost" className="text-white font-bold rounded-full ">AR</Button>
            </div>
            <Link href="/"><Image src="/UnitedLogo.png" alt="logo" width={240} height={80}/></Link>
          </div>
          <div className="flex flex-row w-full justify-center">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white ">Platform</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[200px] lg:w-[275px] sm:w-[100] ">
                    <Link href='/about-us'><ListItem>About us</ListItem></Link>
                    <Link href='/vision'><ListItem> Vision</ListItem></Link>
                    <Link href='/team'><ListItem> Team</ListItem></Link>
                    <Link href='/contact-us'><ListItem> Contact</ListItem></Link>
                    <Link href='/careers'><ListItem> Careers</ListItem></Link>
                    <Link href='/terms-and-conditions'><ListItem> Terms and conditions</ListItem></Link>
                    <Link href='/privacy-policy'><ListItem> Privacy policy</ListItem></Link>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white ">Accounting and financial services</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[200px] lg:w-[275px] sm:w-[100] ">
                    {accAndFinancialServices.map((item) => (
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