import { Navbar } from "@/components";
import Footer from "@/components/Footer/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-200">
      <ScrollToTop />
      <Navbar />
      <div className="container flex-1 flex flex-col ">
        <main>
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
