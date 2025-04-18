"use client";

import * as React from "react";
import { subDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { ptBR } from "date-fns/locale";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePickerWithRange({
  className,
  value,
  onChange,
}: {
  className?: string;
  value?: DateRange;
  onChange?: (date: DateRange) => void;
}) {
  // Utiliza um estado controlado com fallback para o valor inicial
  const [date, setDate] = React.useState<DateRange | undefined>(value);

  React.useEffect(() => {
    // Se o value prop for alterado fora do componente, atualize o estado
    if (value && value !== date) {
      setDate(value);
    }
  }, [value]); // Atualiza quando o value prop mudar

  const handleDateSelect = (newDate: DateRange) => {
    setDate(newDate);
    if (onChange) {
      onChange(newDate); // Envia as novas datas para o componente pai
    }
  };

  // Formatação personalizada para exibir as datas no formato 'yyyy-MM-dd'
  const formatDate = (date: Date | undefined) => {
    return date ? format(date, "yyyy-MM-dd") : "";
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date?.from && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {formatDate(date.from)} - {formatDate(date.to)}
                </>
              ) : (
                formatDate(date.from)
              )
            ) : (
              <span>Escolha uma data</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            selected={date}
            onSelect={handleDateSelect} // Altera o estado ao selecionar as datas
            locale={ptBR}
            numberOfMonths={2}
            defaultMonth={date?.from}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
