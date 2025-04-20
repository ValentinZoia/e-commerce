import { Button } from '@/components/ui/button'
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from '@/components/ui/carousel'
import { Image } from '@/components/Image';


const CarouselHome = () => {
  const carouselinfo =[
    {
      id: 1,
      title: "Ofertas de Verano",
      description: "Hasta 50% de descuento en productos seleccionados",
      image: "https://placehold.co/1000x500",
      cta: "Ver Ofertas",
    },
    {
      id: 2,
      title: "Nueva Colección",
      description: "Descubre las últimas tendencias",
      image: "https://placehold.co/1000x500",
      cta: "Explorar",
    },
    {
      id: 3,
      title: "Envío Gratis",
      description: "En compras superiores a $50",
      image: "https://placehold.co/1000x500",
      cta: "Comprar Ahora",
    },
  ];
  
  
  return (
    <section className="py-6">
          <div className="container">
            <Carousel className="w-full">
              <CarouselContent>
                {carouselinfo.map((slide) => (
                  <CarouselItem key={slide.id}>
                    <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden rounded-xl">
                      <Image src={slide.image || "/placeholder.svg"} alt={slide.title}  className="object-cover" lazy={true} placeholderSrc='https://placehold.co/1000x500' errorSrc='https://placehold.co/1000x500'  />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex flex-col justify-center p-10">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{slide.title}</h2>
                        <p className="text-white/90 text-lg md:text-xl mb-6 max-w-md">{slide.description}</p>
                        <Button className="w-fit">{slide.cta}</Button>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </Carousel>
          </div>
        </section>
  )
}

export default CarouselHome
