import * as React from "react";
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import dayjs from "dayjs";
export function ChartAreaInteractive({ grafico }) {
  const dadosConvertidos = grafico?.labels.map((label, index) => ({
    data: label,
    valor: grafico.values[index],
  }));
  const formatarReal = (valor) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vendas no Período</CardTitle>
        <CardDescription>Vendas totais no período selecionado</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={dadosConvertidos}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="data"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(valor) => dayjs(valor).format("DD/MM")}
              tick={{ style: { fontSize: 13 } }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--accent)",
                borderRadius: "8px",
                border: "none",
                padding: "8px",
                color: "var(--primary)",
                fontSize: "14px",
                fontWeight: "500",
              }}
              formatter={(valor) => formatarReal(valor)}
              labelFormatter={(label) => {
                return dayjs(label).format("DD/MM");
              }}
            />{" "}
            <Area
              type="monotone"
              dataKey="valor"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
