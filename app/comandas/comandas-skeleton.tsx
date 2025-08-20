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

export const ComandasSkeleton = () => {
  const rows = Array.from({ length: 10 }, (_, i) => i);

  return (
    <div className="space-y-4">
      <div className="pb-4">
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      <div className="flex space-x-2 mb-4">
        {["Todas", "Abertas", "Fechadas", "Canceladas"].map((tab) => (
          <Skeleton key={tab} className="h-10 w-24 rounded-md" />
        ))}
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            {["ID", "Número", "Status", "Ações", ""].map((header) => (
              <TableHead key={header}>
                <Skeleton className="h-4 w-20" />
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
                <Skeleton className="h-4 w-24" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-20 rounded-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-9 w-24" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-9 w-9 rounded-md" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Skeleton para a paginação */}
      <div className="flex justify-center space-x-2 mt-4">
        <Skeleton className="h-9 w-9 rounded-md" />
        <Skeleton className="h-9 w-9 rounded-md" />
        <Skeleton className="h-9 w-9 rounded-md" />
        <Skeleton className="h-9 w-9 rounded-md" />
        <Skeleton className="h-9 w-9 rounded-md" />
      </div>
    </div>
  );
};