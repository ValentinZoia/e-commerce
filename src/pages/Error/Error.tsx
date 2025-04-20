import { Navbar } from "@/components"
import { Link } from "react-router-dom"


const Error = () => {
  return (
    <>
    
    <div className="w-full min-h-screen flex flex-col">
     <Navbar />
      <div className="w-full flex-1 flex flex-col gap-4 justify-center items-center">
        <h2 className="text-2xl font-bold">Parece que esta página no existe</h2>
        <Link to="/" className="text-muted-foreground ml-2">Volver al inicio</Link>
      </div>
    </div>
    </>
    
  )
}

export default Error