import { ArrowLeftCircle } from "lucide-react";
import Link from "next/link";
import {Button} from "./ui/button";
interface BackButtonProps {
    text:string;
    link:string;
}

export default function BackButton({text,link}:BackButtonProps) {
    return (
        <Link href={link}>
           <Button variant="ghost" className="font-medium flex flex-row items-center justify-between m-1"><ArrowLeftCircle size={18}/>{text}</Button> 
        </Link>
    )
}