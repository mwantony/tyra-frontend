import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const VendasSkeleton = () => {
  const rows = Array.from({ length: 10 }, (_, i) => i);

  return (
    <Table className="relative">
      <TableHeader className="sticky top-0 z-10">
        <TableRow>
          {["ID", "Comanda", "Total", "Método de Pagamento", "Data da Venda"].map((header) => (
            <TableHead key={header}>
              <div className="flex items-center">
                <Skeleton className="h-4 w-20" />
                {header === "Data da Venda" && (
                  <Skeleton className="h-4 w-4 ml-1 rounded-full" />
                )}
              </div>
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row}>
            <TableCell>
              <Skeleton className="h-4 w-8" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-6 w-20 rounded-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-24" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-6 w-28 rounded-full" />
            </TableCell>
            <TableCell>
              <div className="flex flex-col space-y-1">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-3 w-16" />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};