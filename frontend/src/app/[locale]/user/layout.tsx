'use client';
import ProtectedRoute from "@/components/shared/ProtectedRoute";
export default function UserLayout({ children }: { children: React.ReactNode }) {
    
    return (
        <ProtectedRoute allowedRoles={['user']} isAdminRoute={false}>
                {children}
        </ProtectedRoute>
    );
}