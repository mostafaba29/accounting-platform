import BackButton from "@/components/Dashboard/BackButton";
import { Button } from "@/components/ui/button";
import {Eye} from "lucide-react";
import Link from "next/link";
export default function settings () {
    return (
        <div className="flex flex-col items-center my-2 ">
            <h1 className="text-2xl font-semibold">Settings</h1>
            <div className="flex flex-col items-start w-full mb-5">
                <BackButton text="Go Back" link="/admin/dashboard" />
            </div>
            <div className="my-1">
                <div className="w-[1200px] flex flex-row justify-around items-center ">
                    <div className="flex flex-row w-[200px]">
                        <p className="font-semibold mr-2">Contact Us page</p>
                        <Link href='/contact-us'>
                            <Eye size={24} className="hover:text-sky-800"/>
                        </Link>
                    </div>
                    <Link href="/admin/dashboard/settings/contact-us">
                        <Button className="w-[250px]">Change Contact us settings</Button>
                    </Link>
                </div>
            </div>
            <div className="my-1">
                <div className="w-[1200px] flex flex-row justify-around items-center ">
                    <div className="flex flex-row w-[200px]">
                        <p className="font-semibold mr-2">About Us page</p>
                        <Link href='/about-us'>
                            <Eye size={24} className="hover:text-sky-800"/>
                        </Link>
                    </div>
                    <Link href="/admin/dashboard/settings/about-us">
                        <Button className="w-[250px]" >Change About us settings</Button>
                    </Link>
                </div>
            </div>
            <div className="my-1">
                <div className="w-[1200px] flex flex-row justify-around items-center ">
                    <div className="flex flex-row w-[200px]">
                        <p className="font-semibold mr-2">Client List</p>
                        <Link href='/partners'>
                            <Eye size={24} className="hover:text-sky-800"/>
                        </Link>
                    </div>
                    <Link href="/admin/dashboard/settings/client-list">
                        <Button className="w-[250px]" >Change Cient List settings</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}