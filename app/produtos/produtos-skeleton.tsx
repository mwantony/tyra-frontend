"use client";

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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";

export const ProdutosSkeleton = () => {
  // Número de linhas do skeleton
  const rows = Array.from({ length: 10 }, (_, i) => i);

  return (
    <div className="space-y-4">
      {/* Skeleton para o campo de busca */}
      <div className="pb-4">
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      {/* Skeleton para a tabela */}
      <Table>
        <TableHeader>
          <TableRow>
            {["ID", "Nome", "Preço",  "Criado em", "Ações"].map((header) => (
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
                <Skeleton className="h-4 w-32" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-20" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-24" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-28" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-30" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-30" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-9 w-9 rounded-md" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Skeleton para a paginação */}
      <div className="flex justify-end">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <Skeleton className="h-9 w-9 rounded-md" />
            </PaginationItem>
            {[...Array(5)].map((_, i) => (
              <PaginationItem key={i}>
                <Skeleton className="h-9 w-9 rounded-md" />
              </PaginationItem>
            ))}
            <PaginationItem>
              <Skeleton className="h-9 w-9 rounded-md" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};