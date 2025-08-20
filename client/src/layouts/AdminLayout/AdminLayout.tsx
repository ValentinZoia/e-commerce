import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

import TopAdminNav from "./_components/TopAdminNav/TopAdminNav";
import { AppSidebar } from "./_components/Sidebar/Sidebar";

const AdminLayout = () => {
  return (
    <div className="flex  min-h-screen bg-slate-200">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <TopAdminNav />
          <main className="container flex flex-1 flex-col gap-4 p-4 pt-0 ">
            {/* <SidebarTrigger /> */}
            <Outlet />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};
export default AdminLayout;
