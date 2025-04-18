import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, Tooltip, ResponsiveContainer } from "recharts";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const dadosDoGrafico = [
  { data: "2025-04-17", valor: 10 },
];

export function ChartAreaInteractive() {
  const [intervaloDeTempo, setIntervaloDeTempo] = React.useState("30d");

  const dadosFiltrados = dadosDoGrafico; // Já que seus dados estão filtrados, pode usar diretamente

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vendas no Período</CardTitle>
        <CardDescription>Vendas totais no período selecionado</CardDescription>
        <div className="absolute right-4 top-4">
          <Select value={intervaloDeTempo} onValueChange={setIntervaloDeTempo}>
            <SelectTrigger>
              <SelectValue placeholder="Últimos 3 meses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="90d">Últimos 3 meses</SelectItem>
              <SelectItem value="30d">Últimos 30 dias</SelectItem>
              <SelectItem value="7d">Últimos 7 dias</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={dadosFiltrados}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="data"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(valor) => {
                const data = new Date(valor);
                return data.toLocaleDateString("pt-BR", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <Tooltip />
            <Bar
              dataKey="valor"
              fill="#8884d8"
              stroke="#8884d8"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
