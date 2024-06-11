import {
    Card,
    CardContent,
} from "@/components/ui/card";

import {
    LucideIcon
} from "lucide-react";

interface DashobardCardProps {
    title:string;
    value:number;
    icon:React.ReactElement<LucideIcon>;
}
export default function DashboardCard({title,value,icon}:DashobardCardProps) {

    return (
        <Card className='bg-slate-100 p-4 pb-0'>
            <CardContent >
                <h3 className="text-3xl text-center mb-4 font-bold text-slate-500">{title}</h3>
                <div className="flex gap-5 justify-center items-center">
                    {icon}
                    <h3 className="text-5xl font-semibold text-slate-400">{value}</h3>
                </div>
            </CardContent>
        </Card>
    )
}