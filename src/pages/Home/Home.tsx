import {ProductsHeader }from '@/components'
import {CarouselHome} from './_components'

const Home = () => {
  //hacer un fetch a los productos en promocion-destacados-nuevos
  //hacer un enum para promocion-destacados-nuevos y pasarlo como prop
  
  
  return (
    <>
    <CarouselHome />
    <ProductsHeader title="Productos en Promoción" />
    <ProductsHeader title="Productos Destacados" />
    <ProductsHeader title="Productos Nuevos" />
    
    </>
    
  )
}

export default Home