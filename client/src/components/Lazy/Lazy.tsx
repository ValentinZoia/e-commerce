import React, { useEffect, useRef, useState } from "react";

interface LazyProps {
  children: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
  /** Altura reservada mientras no se monta el contenido real */
  minHeight?: number | string;
  /** Placeholder opcional (ej: skeleton) mientras no es visible */
  placeholder?: React.ReactNode;
  /** Si usás un contenedor con scroll, pasalo acá */
  root?: Element | null;
}

function Lazy({
  children,
  threshold = 0.25,
  rootMargin = "200px 0px", // pre-carga un poco antes
  placeholder = null,
  root = null,
}: LazyProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);

  // Observamos un sentinel que SIEMPRE existe y ocupa espacio
  const sentinelRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current?.disconnect();

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsVisible(true);
          console.log("card");
          observer.unobserve(entry.target);
          // dispara animación en el siguiente frame
          requestAnimationFrame(() => setHasEntered(true));
        }
      },
      { threshold, rootMargin, root }
    );

    if (sentinelRef.current) observer.observe(sentinelRef.current);
    observerRef.current = observer;

    return () => observer.disconnect();
  }, [threshold, rootMargin, root]);

  return (
    <div
      className="min-h-full"
      // El contenedor mantiene espacio y hace la animación una sola vez
      style={{
        opacity: hasEntered ? 1 : 0,
        transform: hasEntered ? "translateY(0)" : "translateY(12px)",
        transition: "opacity 0.45s ease, transform 0.45s ease",
        willChange: "opacity, transform",
      }}
    >
      {/* Sentinel siempre presente para que el IO tenga geometría real */}
      <div ref={sentinelRef} style={{ height: 1, width: 1 }} />
      {isVisible ? children : placeholder}
    </div>
  );
}

export default Lazy;
