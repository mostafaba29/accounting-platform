import CommandSidebar from "@/components/Dashboard/CommandSidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex bg-white">
            <CommandSidebar />
            <div className="lg:w-full md:w-[500px] w-[250px]" >
                {children}
            </div>
        </div>
    );
}