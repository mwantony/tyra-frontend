import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function SectionCards({
  totalFaturado,
  totalVendas,
  mediaVendasPorDia,
}) {
  return (
    <div className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-3 grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
      {/* Total Faturado */}
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Total Faturado</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(totalFaturado)}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <TrendingUpIcon className="size-3" />
              +12,5%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Tendência de alta neste mês <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Visitas nos últimos 6 meses
          </div>
        </CardFooter>
      </Card>

      {/* Vendas Totais */}
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Vendas Totais</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {totalVendas}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <TrendingDownIcon className="size-3" />
              -20%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Queda de 20% neste período <TrendingDownIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Aquisição necessita de atenção
          </div>
        </CardFooter>
      </Card>

      {/* Faturamento Médio por Dia */}
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Faturamento Médio por Dia</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(mediaVendasPorDia)}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <TrendingUpIcon className="size-3" />
              +12,5%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Retenção de usuários forte <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            O engajamento superou as metas
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
