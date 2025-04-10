import { Navbar } from "@/components"
import { Outlet } from "react-router-dom"


const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
    <Navbar />
    <div className="container flex-1 flex flex-col">
      <main>
        <Outlet />
      </main>

    </div>
    {/* <Footer /> */}
  </div>
  )
}

export default MainLayout