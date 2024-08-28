'use client';

import BackButton from "@/components/Dashboard/BackButton";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from 'next/navigation';
import { useParams } from 'next/navigation';

export default function Settings() {
    const router = useRouter();
    const pathname = usePathname();
    const params = useParams();
    const locale = params.locale || 'en'; // Default to 'en' if no locale is found

    const getLocalizedHref = (path) => `/${locale}${path}`;

    return (
        <div className="flex flex-col items-center my-2 ">
            <h1 className="text-2xl font-semibold">Settings</h1>
            <div className="flex flex-col items-start w-full mb-5">
                <BackButton text="Go Back" link={getLocalizedHref("/admin/dashboard")} />
            </div>
            <div className="my-1">
                <div className="w-[1200px] flex flex-row justify-around items-center ">
                    <div className="flex flex-row w-[200px]">
                        <p className="font-semibold mr-2">Home page</p>
                        <Link href={getLocalizedHref("/")}>
                            <Eye size={24} className="hover:text-sky-800"/>
                        </Link>
                    </div>
                    <Button onClick={() => router.push(getLocalizedHref("/admin/dashboard/settings/landing-page"))} className="w-[250px]">Change home page settings</Button>
                </div>
            </div>
            <div className="my-1">
                <div className="w-[1200px] flex flex-row justify-around items-center ">
                    <div className="flex flex-row w-[200px]">
                        <p className="font-semibold mr-2">Contact Us page</p>
                        <Link href={getLocalizedHref("/contact-us")}>
                            <Eye size={24} className="hover:text-sky-800"/>
                        </Link>
                    </div>
                    <Link href={getLocalizedHref("/admin/dashboard/settings/contact-us")}>
                        <Button className="w-[250px]">Change Contact us settings</Button>
                    </Link>
                </div>
            </div>
            <div className="my-1">
                <div className="w-[1200px] flex flex-row justify-around items-center ">
                    <div className="flex flex-row w-[200px]">
                        <p className="font-semibold mr-2">Team</p>
                        <Link href={getLocalizedHref("/team")}>
                            <Eye size={24} className="hover:text-sky-800"/>
                        </Link>
                    </div>
                    <Link href={getLocalizedHref("/admin/dashboard/settings/team")}>
                        <Button className="w-[250px]" >Change Team settings</Button>
                    </Link>
                </div>
            </div>
            <div className="my-1">
                <div className="w-[1200px] flex flex-row justify-around items-center ">
                    <div className="flex flex-row w-[200px]">
                        <p className="font-semibold mr-2">About us</p>
                        <Link href={getLocalizedHref("/about-us")}>
                            <Eye size={24} className="hover:text-sky-800"/>
                        </Link>
                    </div>
                    <Link href={getLocalizedHref("/admin/dashboard/settings/about-us")}>
                        <Button className="w-[250px]" >Change About us settings</Button>
                    </Link>
                </div>
            </div>
            <div className="my-1">
                <div className="w-[1200px] flex flex-row justify-around items-center ">
                    <div className="flex flex-row w-[200px]">
                        <p className="font-semibold mr-2">Client List</p>
                        <Link href={getLocalizedHref("/client-list")}>
                            <Eye size={24} className="hover:text-sky-800"/>
                        </Link>
                    </div>
                    <Link href={getLocalizedHref("/admin/dashboard/settings/client-list")}>
                        <Button className="w-[250px]" >Change Client List settings</Button>
                    </Link>
                </div>
            </div>
            <div className="my-1">
                <div className="w-[1200px] flex flex-row justify-around items-center ">
                    <div className="flex flex-row w-[200px]">
                        <p className="font-semibold mr-2">Privacy Policy</p>
                        <Link href={getLocalizedHref("/privacy-policy")}>
                            <Eye size={24} className="hover:text-sky-800"/>
                        </Link>
                    </div>
                    <Link href={getLocalizedHref("/admin/dashboard/settings/privacy-policy")}>
                        <Button className="w-[250px]" >Change Privacy Policy settings</Button>
                    </Link>
                </div>
            </div>
            <div className="my-1">
                <div className="w-[1200px] flex flex-row justify-around items-center ">
                    <div className="flex flex-row w-[200px]">
                        <p className="font-semibold mr-2">Terms & Conditions</p>
                        <Link href={getLocalizedHref("/terms-conditions")}>
                            <Eye size={24} className="hover:text-sky-800"/>
                        </Link>
                    </div>
                    <Link href={getLocalizedHref("/admin/dashboard/settings/terms-conditions")}>
                        <Button className="w-[250px]" >Change Terms & Conditions settings</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}