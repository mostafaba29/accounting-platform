import CommandSidebar from "@/components/Dashboard/CommandSidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex">
            <CommandSidebar />
            <div className="w-full h-screen">
                {children}
            </div>
        </div>
    );
}