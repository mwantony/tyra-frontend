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
}: {
  totalFaturado: number;
  totalVendas: number;
  mediaVendasPorDia: number;
}) {
  // Função para determinar o texto de tendência
  const renderTendencyText = (value: number, type: "faturado" | "vendas" | "media") => {
    if (value > 0) {
      return {
        text: type === "faturado" ? "Tendência de alta neste mês" : type === "vendas" ? "Aumento nas vendas" : "Retenção de usuários forte",
        icon: <TrendingUpIcon className="size-4" />,
        badge: <Badge variant="outline" className="flex gap-1 rounded-lg text-xs"><TrendingUpIcon className="size-3" />+{value}%</Badge>,
      };
    } else if (value < 0) {
      return {
        text: type === "faturado" ? "Tendência de queda neste mês" : type === "vendas" ? "Queda nas vendas" : "Retenção abaixo da meta",
        icon: <TrendingDownIcon className="size-4" />,
        badge: <Badge variant="outline" className="flex gap-1 rounded-lg text-xs"><TrendingDownIcon className="size-3" />-{Math.abs(value)}%</Badge>,
      };
    } else {
      return {
        text: "Sem alteração significativa",
        icon: null,
        badge: null,
      };
    }
  };

  // Cards de cada item
  const faturadoTendency = renderTendencyText(totalFaturado, "faturado");
  const vendasTendency = renderTendencyText(totalVendas, "vendas");
  const mediaTendency = renderTendencyText(mediaVendasPorDia, "media");

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
            {faturadoTendency.badge}
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {faturadoTendency.text} {faturadoTendency.icon}
          </div>
          <div className="text-muted-foreground">Visitas nos últimos 6 meses</div>
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
            {vendasTendency.badge}
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {vendasTendency.text} {vendasTendency.icon}
          </div>
          <div className="text-muted-foreground">Aquisição necessita de atenção</div>
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
            {mediaTendency.badge}
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {mediaTendency.text} {mediaTendency.icon}
          </div>
          <div className="text-muted-foreground">O engajamento superou as metas</div>
        </CardFooter>
      </Card>
    </div>
  );
}
