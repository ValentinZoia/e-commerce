import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Image } from "@/components/Image";
import { useStoreCustomerSuspense } from "@/hooks/StoreCustomer/useStoreCustomer";
import { Link } from "react-router-dom";

const CarouselHome = () => {
  const { data } = useStoreCustomerSuspense();
  console.log(data[0]);
  return (
    <section className="">
      <div className="">
        <Carousel className="w-full rounded-none">
          <CarouselContent>
            {data.length === 0 && <></>}

            {data[0].banners.map(
              (banner, index) => (
                console.log(banner, index),
                (
                  <CarouselItem key={index}>
                    <div className="relative w-full overflow-hidden">
                      <Image
                        src={banner.imageUrl || "/placeholder.svg"}
                        alt={banner.title || "Banner"}
                        className="object-cover"
                        aspectRatio={16 / 5}
                        lazy={true}
                        placeholderSrc="https://placehold.co/1000x500"
                        errorSrc="https://placehold.co/1000x500"
                      />
                      {banner.title && (
                        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex flex-col justify-center p-10 lg:p-14">
                          <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">
                            {banner.title}
                          </h2>
                          <p className="text-white/90 text-lg md:text-xl mb-6 max-w-md">
                            {banner.description}
                          </p>
                          {banner.redirectUrl &&
                            (console.log(banner.redirectUrl),
                            (
                              <Button className="w-fit">
                                <Link to={banner.redirectUrl || "/"}>
                                  Ver más
                                </Link>
                              </Button>
                            ))}
                        </div>
                      )}
                    </div>
                  </CarouselItem>
                )
              )
            )}
          </CarouselContent>
          {data[0].banners.length > 1 && (
            <div className="hidden md:block">
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </div>
          )}
        </Carousel>
        <div className="flex justify-center mt-3 md:hidden">
          <p className="text-sm text-gray-500">
            Desliza para ver las otras imagenes
          </p>
        </div>
      </div>
    </section>
  );
};

export default CarouselHome;
