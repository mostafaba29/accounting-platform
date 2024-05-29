import {Home,Settings,FileBarChart,Users,Book,LineChart} from 'lucide-react';
import Link from 'next/link';

export default function SideBar() {
    return (
        <div className="flex flex-col justify-between  w-[50px] rounded-lg border border-slate-300">
           <div>
                <Link href="/"><Home size="48" className="mb-2 hover:bg-slate-300 p-1 rounded"/></Link>
                <Link href="/"><FileBarChart size="48" className="mb-2 hover:bg-slate-300 p-1 rounded"/></Link>
                <Link href="/"><Book size="48" className="mb-2 hover:bg-slate-300 p-1 rounded"/></Link>
                <Link href="/"><Users size="48" className="mb-2 hover:bg-slate-300 p-1 rounded"/></Link>
                <Link href="/"><LineChart size="48" className="mb-2 hover:bg-slate-300 p-1 rounded"/></Link>
           </div>
           <div>
                <Link href="/"><Settings size="48" className="mt-2 hover:bg-slate-300 p-1 rounded"/></Link>
           </div>
        </div>
    );
}