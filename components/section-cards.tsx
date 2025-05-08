/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  TrendingDownIcon,
  TrendingUpIcon,
  TrendingUpDownIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSpring, animated } from "@react-spring/web";

export const AnimatedNumber = ({
  value,
  isCurrency = false,
}: {
  value: number;
  isCurrency?: boolean;
}) => {
  const { number } = useSpring({
    from: { number: 0 },
    to: { number: value },
    config: { tension: 120, friction: 14 },
  });
  
  return (
    /* @ts-expect-error */
    <animated.div>
      {number.to((n) =>
        isCurrency
          ? new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(n)
          : Math.round(n)
      )}
    </animated.div>
  );
};

export function SectionCards({
  totalFaturado,
  totalVendas,
  mediaVendasPorDia,
}: {
  totalFaturado: number;
  totalVendas: number;
  mediaVendasPorDia: number;
}) {
  const renderTendencyText = (
    value: number,
    type: "faturado" | "vendas" | "media"
  ) => {
    const absoluteValue = Math.abs(value);
    let intensity = "";

    if (absoluteValue > 20) intensity = "Significativa ";
    else if (absoluteValue > 10) intensity = "";
    else if (absoluteValue > 5) intensity = "Ligeira ";
    else intensity = "Pequena ";

    if (value > 0) {
      const variations = {
        faturado: {
          text: `${intensity}Alta no faturamento`,
          detail:
            absoluteValue > 15
              ? "Excelente desempenho financeiro"
              : "Bom desempenho financeiro",
        },
        vendas: {
          text: `${intensity}Aumento nas vendas`,
          detail:
            absoluteValue > 15
              ? "Demanda em crescimento"
              : "Vendas consistentes",
        },
        media: {
          text: `${intensity}Alta na média diária`,
          detail:
            absoluteValue > 15 ? "Clientes mais ativos" : "Engajamento estável",
        },
      };

      return {
        ...variations[type],
        icon: <TrendingUpIcon className="size-4" />,
        badge: (
          <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
            <TrendingUpIcon className="size-3" />+{value}%
          </Badge>
        ),
      };
    } else if (value < 0) {
      const variations = {
        faturado: {
          text: `${intensity}queda no faturamento`,
          detail:
            absoluteValue > 15 ? "Revisar estratégias" : "Monitorar tendência",
        },
        vendas: {
          text: `${intensity}redução nas vendas`,
          detail:
            absoluteValue > 15
              ? "Necessidade de ações"
              : "Observar comportamento",
        },
        media: {
          text: `${intensity}baixa na média diária`,
          detail:
            absoluteValue > 15
              ? "Clientes menos ativos"
              : "Leve redução no engajamento",
        },
      };

      return {
        ...variations[type],
        icon: <TrendingDownIcon className="size-4" />,
        badge: (
          <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
            <TrendingDownIcon className="size-3" />-{absoluteValue}%
          </Badge>
        ),
      };
    } else {
      return {
        text: "Estabilidade",
        detail:
          type === "faturado"
            ? "Faturamento consistente"
            : type === "vendas"
            ? "Vendas estáveis"
            : "Média diária mantida",
        icon: <TrendingUpDownIcon className="size-4" />,
        badge: (
          <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
            <TrendingUpDownIcon className="size-3" />
            0%
          </Badge>
        ),
      };
    }
  };

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
            <AnimatedNumber value={totalFaturado} isCurrency />
          </CardTitle>
          <div className="absolute right-4 top-4">{faturadoTendency.badge}</div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {faturadoTendency.text} {faturadoTendency.icon}
          </div>
          <div className="text-muted-foreground">{faturadoTendency.detail}</div>
        </CardFooter>
      </Card>

      {/* Vendas Totais */}
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Vendas Totais</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            <AnimatedNumber value={totalVendas} />
          </CardTitle>
          <div className="absolute right-4 top-4">{vendasTendency.badge}</div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {vendasTendency.text} {vendasTendency.icon}
          </div>
          <div className="text-muted-foreground">{vendasTendency.detail}</div>
        </CardFooter>
      </Card>

      {/* Faturamento Médio por Dia */}
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Faturamento Médio por Dia</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            <AnimatedNumber value={mediaVendasPorDia} isCurrency />
          </CardTitle>
          <div className="absolute right-4 top-4">{mediaTendency.badge}</div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {mediaTendency.text} {mediaTendency.icon}
          </div>
          <div className="text-muted-foreground">{mediaTendency.detail}</div>
        </CardFooter>
      </Card>
    </div>
  );
}
