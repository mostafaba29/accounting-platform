"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import Link from "next/link";
import {Button} from "@/components/ui/button";
import Image from "next/image";
import { useUserContext } from "@/lib/Providers/UserProvider";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ShoppingCart, User, Menu, LogIn } from 'lucide-react';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { userLogout } from "@/lib/api/userApi";
import { fetchConsults } from "@/lib/api/consultsApi";
import { usePathname, useRouter } from 'next/navigation';

interface UserMenuProps {
  user: any;
  logout: () => void;
}
const UserMenu = ({ user, logout }: UserMenuProps) => (
  <DropdownMenu>
    <DropdownMenuTrigger>
      <User size={36} className="text-white mr-4 p-1 rounded-full hover:text-black hover:bg-white" />
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-36 mr-1 flex flex-col items-center">
      <DropdownMenuItem className="w-full flex flex-col items-center hover:bg-blue-500 hover:text-white font-semibold text-base">
        <Link href={`/user/${user.data.data._id}/cart`}>سلة التسوق</Link>
      </DropdownMenuItem>
      <DropdownMenuItem className="w-full flex flex-col items-center hover:bg-blue-500 hover:text-white font-semibold text-base">
        <Link href={`/user/${user.data.data._id}/orders`}>الطلبات</Link>
      </DropdownMenuItem>
      <DropdownMenuItem className="w-full flex flex-col items-center hover:bg-blue-500 hover:text-white font-semibold text-base">
        <p className="hover:cursor-pointer" onClick={logout}>تسجيل خروج</p>
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
      <AccordionTrigger className="text-white">الملف الشخصي</AccordionTrigger>
      <AccordionContent>
        <Link href={`/user/${user.data.data._id}/cart`} className="block py-2 text-white">سلة التسوق</Link>
        <Link href={`/user/${user.data.data._id}/orders`} className="block py-2 text-white">الطلبات</Link>
        <button onClick={logout} className="block py-2 text-white">تسجيل خروج</button>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
)


export default function NavigationBarAR(){
    const queryClient = useQueryClient();
    const { data: user } = useUserContext();
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const isRTL = pathname.startsWith('/ar');
    const lang = isRTL ? 'ar' : 'en';
    const toggleLocale = () => {
      const currentPath = pathname;
      console.log('Current path:', currentPath);
      let newPath;

      if (isRTL) {
          newPath = currentPath.replace(/^\/ar/, '') || '/en';
      } else {
          newPath = `/ar${currentPath}`;
      }

      console.log('New path:', newPath);
      router.push(newPath);
  }

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
      <nav className={`transition-colors duration-300 bg-unitedPrimary ${mobileMenuOpen ? 'h-screen' : 'h-16 md:h-28'} rtl`}>
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-row-reverse items-center justify-between h-16 md:h-auto">
              <Link href="/" className="hidden md:block"><Image src="/UnitedLogo.png" alt="logo" width={175} height={80}/></Link>
              <div className="hidden md:block">
                  <div className="ml-2 flex items-center md:ml-6">
                      <Button onClick={toggleLocale} variant="ghost" className="text-white p-1 font-bold rounded-full ml-4 w-[36px] h-[36px] hover:text-black hover:bg-white"><p className='text-lg'>{lang === 'en' ? 'ع' : 'EN'}</p></Button>
                      {!user || user.role === "admin" ? (
                          <Link href='auth/login'>
                              <LogIn size={36} className="text-white ml-4 p-1 rounded-full hover:text-black hover:bg-white" />
                          </Link>
                      ) : (
                          <UserMenu user={user} logout={logout} />
                      )}
                      <Link href="/products"><Button variant="ghost" className="text-black font-semibold bg-unitedSecondary">المتجر <ShoppingCart className="h-6 w-6 mx-1" /></Button></Link>
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
                      <span className="sr-only">افتح القائمة الرئيسية</span>
                      <Menu className="block h-6 w-6" aria-hidden="true" />
                  </button>
              </div>
          </div>
          
          <div className="hidden md:block md:w-full">
              <div className="w-full flex items-start justify-end space-x-4">
                  <Button variant="ghost" className="text-white hover:bg-slate-100/50">المقالات</Button>
                  <Button variant="ghost" className="text-white hover:bg-slate-100/50">عملاؤنا</Button>
                  <NavItem title="المساعدة">
                      <Link href='/privacy-policy'><ListItem title="سياسة الخصوصية" className="hover:text-white hover:bg-sky-800"/></Link>
                      <Link href='/terms-and-conditions'><ListItem title="الشروط والأحكام" className="hover:text-white hover:bg-sky-800"/></Link>
                      <Link href='/faq'><ListItem title="الأسئلة الشائعة" className="hover:text-white hover:bg-sky-800"/></Link>
                      <Link href='/join-us'><ListItem title="انضم إلينا" className="hover:text-white hover:bg-sky-800"/></Link>
                      <Link href='/contact-us'><ListItem title="اتصل بنا" className="hover:text-white hover:bg-sky-800"/></Link>
                  </NavItem>
                  <NavItem title="استشارات الموارد البشرية" />
                  <NavItem title="الاستشارات المالية" />
                  <NavItem title="خدمات المراجعة" />
                  <NavItem title="خدمات المحاسبة" />
                  <NavItem title="خدمات أعمالي" />
              </div>
          </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-start">
            <MobileNavItem title="خدمات أعمالي" />
            <MobileNavItem title="خدمات محاسبية" />
            <MobileNavItem title="خدمات المراجعة" />
            <MobileNavItem title="إستشارات مالية" />
            <MobileNavItem title="إستشارات إدارية" />
            <MobileNavItem title="المساعدة">
              <Link href='/contact-us' className="block py-2 text-white">تواصل معنا</Link>
              <Link href='/join-us' className="block py-2 text-white">إنضم لنا </Link>
              <Link href='/faq' className="block py-2 text-white">الأسئلة الشائعة</Link>
              <Link href='/terms-and-conditions' className="block py-2 text-white">الشروط والأحكام</Link>
              <Link href='/privacy-policy' className="block py-2 text-white">سياسة الخصوصية</Link>
            </MobileNavItem>
            <Link href='/client-list' className=" w-full text-white text hover:bg-slate-100/50 py-2 px-1">عملاؤنا</Link>
            <Link href='/blogs'className=" w-full text-white text hover:bg-slate-100/50 py-2 px-1">مقالات</Link>
            <Link href='/products' className=" w-full text-white text hover:bg-slate-100/50 py-2 px-1"><ShoppingCart className="h-6 w-6 mr-2 inline" /> المتجر</Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="px-2">
              {!user || user.role === "admin" ? (
                <Link href='auth/login' className="block py-2 text-white">
                  <LogIn className="h-6 w-6 mr-2 inline" /> تسجيل دخول
                </Link>
              ) : (
                <MobileUserMenu user={user} logout={logout} />
              )}
              <Button onClick={toggleLocale} variant="ghost" className="w-full text-left text-white hover:bg-slate-100/50 mt-2">
                اللغة: <span className='text-lg ml-2'>{lang === 'en' ? 'ع' : 'EN'}</span>
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