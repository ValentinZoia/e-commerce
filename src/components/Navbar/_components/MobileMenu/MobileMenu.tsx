import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import {  Menu } from 'lucide-react'
import {Link} from 'react-router-dom'


const MobileMenu = () => {
  return (
    <div className='p-6'>
<Sheet>
    <SheetTrigger asChild>
      <Button variant="ghost" size="icon" className="md:hidden">
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle menu</span>
      </Button>
    </SheetTrigger>
    <SheetContent side="right" className='p-6'>
      <nav className="flex flex-col gap-4 mt-8">
        <Link to="/" className="text-base font-medium transition-colors hover:text-primary">
          Home
        </Link>
        <div className="space-y-3">
          <p className="text-base font-medium">Categories</p>
          <div className="pl-4 space-y-2">
            <Link to="/categories/electronics" className="block text-sm transition-colors hover:text-primary">
              Electronics
            </Link>
            <Link to="/categories/clothing" className="block text-sm transition-colors hover:text-primary">
              Clothing
            </Link>
            <Link to="/categories/home" className="block text-sm transition-colors hover:text-primary">
              Home & Kitchen
            </Link>
            <Link to="/categories/beauty" className="block text-sm transition-colors hover:text-primary">
              Beauty
            </Link>
          </div>
        </div>
        <Link to="/about-us" className="text-base font-medium transition-colors hover:text-primary">
          About
        </Link>
        <div className="border-t pt-4 mt-2 space-y-3">
          <Link to="/login" className="block text-base font-medium transition-colors hover:text-primary">
            Login
          </Link>
          <Link to="/register" className="block text-base font-medium transition-colors hover:text-primary">
            Register
          </Link>
        </div>
      </nav>
    </SheetContent>
  </Sheet>
    </div>
    
  )
}

export default MobileMenu