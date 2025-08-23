import { NavMenuContent } from "../Navbar/_components/NavMenuContent";
import { NavigationMenu } from "../ui/navigation-menu";

enum ImagesPaymentMethods {
  VISA = "https://d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/visa@2x.png",
  MASTERCARD = "https://d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/mastercard@2x.png",
  AMERICANEXPRESS = "https://d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/amex@2x.png",
  CABAL = "https://d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/ar/cabal@2x.png",
  NARANJA = "https://d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/ar/tarjeta-naranja@2x.png",
  MERCADOPAGO = "https://raw.githubusercontent.com/FriendsOfBotble/fob-mercadopago/develop/screenshot.png",
}
const arrayImagesPaymentMethods = [
  ImagesPaymentMethods.VISA,
  ImagesPaymentMethods.MASTERCARD,
  ImagesPaymentMethods.AMERICANEXPRESS,
  ImagesPaymentMethods.CABAL,
  ImagesPaymentMethods.NARANJA,
  ImagesPaymentMethods.MERCADOPAGO,
];

function Footer() {
  return (
    <footer className="bg-card ">
      <div className="container mt-12 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 border-b-2 border-white pb-8">
          {/* Links section */}
          <div className="space-y-6 ">
            <span className="text-sm text-muted-foreground">
              Menu de Navegación
            </span>
            <NavigationMenu>
              <NavMenuContent />
            </NavigationMenu>
          </div>

          {/* Social media section */}
          <div className="space-y-6 ">
            <div className="space-y-2">
              <span className="text-sm text-muted-foreground">
                Medios de pago
              </span>
              <div className="flex gap-4 flex-wrap mt-2 ">
                {arrayImagesPaymentMethods.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    className="w-[40px] hover:scale-110 duration-200"
                    alt="metodo-de-pago"
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-sm text-muted-foreground">
                Sobre Nosotros
              </span>
              <p className="text-muted-foreground">
                Esta es una tienda creada exclusivamente con fines de
                aprendizage sobre el desarrollo web. Ningun producto es real. Ni
                su fin es vender productos.
              </p>
            </div>
            <div className="space-y-2">
              <span className="text-sm text-muted-foreground">Contacto</span>
              <p className="text-muted-foreground">valentinzoia@gmail.com</p>
              <a
                href="https://github.com/ValentinZoia"
                className="text-muted-foreground"
              >
                Sigueme en github!
              </a>
            </div>
          </div>
        </div>

        <p className="pt-8 text-center">
          Copyright © 2025 VZ-Ecommerce. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
export default Footer;
