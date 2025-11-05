import type {ReactNode} from 'react';
import AdminSidebar from '@/components/admin/ui/AdminSidebar';
import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar.tsx";
import AdminHeader from '@/components/admin/ui/AdminHeader';

interface LayoutProps {
    children: ReactNode;
}

export default function MainLayout({children}: LayoutProps) {
    return (
        <>
            <SidebarProvider>
                <AdminSidebar/>
                <SidebarInset className="flex-grow overflow-hidden">
                    <div className="flex min-h-screen w-full">
                        <div className="w-full flex-1">
                            <AdminHeader trigger={<SidebarTrigger />} />
                            {/* Main Content Container */}
                            <div className="w-full px-5 py-8 md:px-[24px]">
                                {/* Main Content Content */}
                                <div className="flex min-h-screen w-full flex-col gap-[32px]">
                                    {children}
                                </div>
                            </div>
                        </div>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </>
    );
}