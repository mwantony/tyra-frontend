"use client";

import * as React from "react";
import { format, subDays } from "date-fns";
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
  const [date, setDate] = React.useState<DateRange>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });

  // Atualiza o estado se o valor externo mudar
  React.useEffect(() => {
    if (
      value &&
      (value.from?.toISOString() !== date.from?.toISOString() ||
        value.to?.toISOString() !== date.to?.toISOString())
    ) {
      setDate({
        from: value.from || undefined,
        to: value.to || undefined,
      });
    }
  }, [value]);

  const handleDateSelect = (newDate: DateRange | undefined) => {
    if (newDate) {
      setDate({
        from: newDate.from || undefined,
        to: newDate.to || undefined,
      });
      if (onChange) {
        onChange(newDate);
      }
    }
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
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "dd/MM/yyyy")} - {format(date.to, "dd/MM/yyyy")}
                </>
              ) : (
                format(date.from, "dd/MM/yyyy")
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
            onSelect={handleDateSelect}
            locale={ptBR}
            numberOfMonths={2}
            defaultMonth={date?.from}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
