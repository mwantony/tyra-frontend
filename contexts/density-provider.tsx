// app/context/density-context.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Density = "compact" | "default" | "spacious";

interface DensityContextType {
  density: Density;
  setDensity: (density: Density) => void;
}

const DensityContext = createContext<DensityContextType>({
  density: "default",
  setDensity: () => {},
});

export const DensityProvider = ({ children }: { children: React.ReactNode }) => {
  const [density, setDensity] = useState<Density>("default");

  useEffect(() => {
    const storedDensity = localStorage.getItem("density") as Density | null;
    if (storedDensity) {
      setDensity(storedDensity);
      applyDensityClasses(storedDensity);
    }
  }, []);

  const applyDensityClasses = (newDensity: Density) => {
    document.documentElement.classList.remove(
      "density-compact",
      "density-default",
      "density-spacious"
    );
    
    document.documentElement.classList.add(`density-${newDensity}`);
  };

  const handleSetDensity = (newDensity: Density) => {
    setDensity(newDensity);
    localStorage.setItem("density", newDensity);
    applyDensityClasses(newDensity);
  };

  return (
    <DensityContext.Provider value={{ density, setDensity: handleSetDensity }}>
      {children}
    </DensityContext.Provider>
  );
};

export const useDensity = () => useContext(DensityContext);