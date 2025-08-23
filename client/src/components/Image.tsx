import React, { useState, useEffect, useRef } from "react";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  placeholderSrc?: string;
  errorSrc?: string;
  lazy?: boolean;
  aspectRatio?: number; // Ej: 16/9
  threshold?: number; // Porcentaje de intersección para cargar (0-1)
}

export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  placeholderSrc,
  errorSrc = "/default-error-image.jpg",
  lazy = true,
  aspectRatio,
  threshold = 0.1,
  className = "",
  style = {},
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver>(null);

  useEffect(() => {
    setHasError(false);

    if (!lazy) {
      // Carga inmediata si lazy está desactivado

      loadImage();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadImage();

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    observerRef.current = observer;

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (observerRef.current && imgRef.current) {
        observerRef.current.unobserve(imgRef.current);
      }
    };
  }, [src, lazy, threshold]);

  const loadImage = () => {
    const image = new window.Image();
    image.src = src;

    image.onload = () => setIsLoaded(true);
    image.onerror = () => setHasError(true);
  };

  const finalSrc = hasError ? errorSrc : src;
  const showPlaceholder = !isLoaded && placeholderSrc;
  const aspectRatioStyle = aspectRatio
    ? { paddingBottom: `${(1 / aspectRatio) * 100}%` }
    : {};

  return (
    <div
      className={`image-container ${className}`}
      style={{ ...style, position: "relative", overflow: "hidden" }}
    >
      {showPlaceholder && (
        <Placeholder
          src={placeholderSrc}
          alt={`${alt} placeholder - ${finalSrc} - hasError: ${hasError} - isLoaded: ${isLoaded}`}
          aspectRatio={aspectRatio}
        />
      )}

      {aspectRatio && (
        <div
          style={{
            width: "100%",
            ...aspectRatioStyle,
            position: "relative",
          }}
        />
      )}

      <img
        ref={imgRef}
        src={isLoaded ? finalSrc : undefined}
        alt={`${alt} desde db - ${finalSrc} - hasError: ${hasError} - isLoaded: ${isLoaded}`}
        loading={lazy ? "lazy" : "eager"}
        style={{
          position: aspectRatio ? "absolute" : "static",
          top: 0,
          left: 0,
          width: "100%",
          height: aspectRatio ? "100%" : "auto",
          objectFit: "cover",
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 0.3s ease-in-out",
        }}
        onError={() => setHasError(true)}
        {...props}
      />
    </div>
  );
};

// Componente Placeholder opcional
export const Placeholder: React.FC<{
  src: string;
  alt: string;
  aspectRatio?: number;
}> = ({ src, alt, aspectRatio }) => (
  <img
    src={src}
    alt={alt}
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: aspectRatio ? "100%" : "auto",
      objectFit: "cover",
      filter: "blur(10px)",
      transform: "scale(1.1)",
    }}
  />
);
