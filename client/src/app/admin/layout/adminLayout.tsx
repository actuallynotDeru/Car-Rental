import type { ReactNode } from "react";
import AdminSidebar from "@/components/admin/ui/AdminSidebar";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import AdminHeader from "@/components/admin/ui/AdminHeader";

interface Props { children: ReactNode; }

export default function AdminLayout({ children }: Props) {
  return (
    <>
        <AdminSidebar />
            <SidebarInset className="flex-grow overflow-hidden">
                    <div className="flex min-h-screen w-full">
                        <div className="w-full flex-1">
                            <AdminHeader trigger={<SidebarTrigger />} />
                            <div className="w-full px-5 py-8 md:px-[24px]">
                                <div className="flex min-h-screen w-full flex-col gap-[32px]">
                                    {children}
                                </div>
                            </div>
                    </div>
                </div>
        </SidebarInset>
    </>
  );
}