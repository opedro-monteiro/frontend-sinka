'use client'

import { TrendingUp } from 'lucide-react'
import { Pie, PieChart } from 'recharts'

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

export const description = 'A pie chart showing active vs inactive clients'

// Simulação de dados (substitua pelos dados reais do seu backend)
const chartData = [
  { status: 'Ativos', value: 500, fill: 'var(--chart-1)' },
  { status: 'Inativos', value: 854, fill: 'var(--chart-2)' },
]

const chartConfig = {
  value: {
    label: 'Clientes',
  },
  Ativos: {
    label: 'Clientes Ativos',
    color: 'var(--chart-1)',
  },
  Inativos: {
    label: 'Clientes Inativos',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig

export function CostumerPieChart() {
  return (
    <Card className="flex w-[453px] flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Distribuição de Clientes</CardTitle>
        <CardDescription>Ativos vs Inativos</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[250px] pb-0"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="value" nameKey="status" label />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Crescimento de 5.2% este mês <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Dados dos últimos 6 meses
        </div>
      </CardFooter>
    </Card>
  )
}
