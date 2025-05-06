import { useEffect, useRef } from "react";

export const TrustedBySection = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const speed = 0.5; // Velocidade do scroll (quanto maior, mais rápido)

  useEffect(() => {
    const carousel = carouselRef.current;
    const items = itemsRef.current;

    if (!carousel || !items) return;

    const itemsWidth = items.getBoundingClientRect().width;
    let position = 0;

    const animate = () => {
      position -= speed;
      
      if (position <= -itemsWidth) {
        position = 0;
      }
      
      items.style.transform = `translateX(${position}px)`;
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  const restaurants = [
    "Restaurante A",
    "Restaurante B",
    "Restaurante C",
    "Restaurante D",
    "Restaurante E",
    "Restaurante F",
    "Restaurante G",
    "Restaurante H"
  ];

  return (
    <div className="container mx-auto px-4 py-12 border-y border-border overflow-hidden">
      <p className="text-center text-muted-foreground mb-8">
        Confiado pelos melhores restaurantes
      </p>
      
      <div 
        ref={carouselRef}
        className="overflow-hidden relative"
      >
        <div 
          ref={itemsRef}
          className="flex gap-8 md:gap-16 opacity-80 w-max"
        >
          {[...restaurants, ...restaurants].map((restaurant, index) => (
            <div 
              key={index}
              className="text-xl font-bold flex-shrink-0 px-4 py-2"
            >
              {restaurant}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};