'use client';
import CommandSidebar from "@/components/Dashboard/CommandSidebar";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    
    return (
        <ProtectedRoute allowedRoles={['admin']} isAdminRoute={true}>
        <div className="flex bg-white">
            <CommandSidebar />
            <div className="lg:w-full md:w-[500px] w-[250px]" >
                {children}
            </div>
        </div>
        </ProtectedRoute>
    );
}