"use client";

import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch"

export default function Page() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Verificar se o usuário já tem uma preferência salva para o tema
  useEffect(() => {
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const handleThemeChange = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="flex p-3 pl-6 items-center gap-2">
            <span className="text-sm font-medium">Modo Escuro</span>
            <Switch checked={isDarkMode} onCheckedChange={handleThemeChange} />
          </div>
        </div>
      </div>
    </div>
  );
}
