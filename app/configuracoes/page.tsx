"use client";

import { useTheme } from "@/contexts/theme-provider"; // ajuste o caminho se necessário
import { Switch } from "@/components/ui/switch";

export default function Page() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="flex p-3 pl-6 items-center gap-2">
            <span className="text-sm font-medium">Modo Escuro</span>
            <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
          </div>
        </div>
      </div>
    </div>
  );
}
