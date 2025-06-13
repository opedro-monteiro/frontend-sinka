'use client'

import { TrendingUp } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

export const description = 'A bar chart showing active vs total clients'

// Simule os dados reais
const chartData = [
  { tipo: 'Total', value: 1250, fill: 'var(--chart-1)' },
  { tipo: 'Ativos', value: 1100, fill: 'var(--chart-2)' },
]

const chartConfig = {
  value: {
    label: 'Clientes',
  },
  Total: {
    label: 'Total de Clientes',
    color: 'var(--chart-2)',
  },
  Ativos: {
    label: 'Clientes Ativos',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig

export function CostumerBarChart() {
  return (
    <Card className="flex w-[453px] flex-col">
      <CardHeader>
        <CardTitle>Clientes Ativos vs Total</CardTitle>
        <CardDescription>Indicador de engajamento</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="flex h-full flex-1">
          <ChartContainer config={chartConfig}>
            <BarChart width={250} height={200} data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="tipo"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) =>
                  chartConfig[value as keyof typeof chartConfig]?.label
                }
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar
                dataKey="value"
                strokeWidth={2}
                radius={8}
                activeIndex={1}
                activeBar={({ ...props }) => (
                  <Rectangle
                    {...props}
                    fillOpacity={0.8}
                    stroke={props.payload.fill}
                    strokeDasharray={4}
                    strokeDashoffset={4}
                  />
                )}
              />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Crescimento de 5.2% este mês <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Dados dos últimos 6 meses
        </div>
      </CardFooter>
    </Card>
  )
}
