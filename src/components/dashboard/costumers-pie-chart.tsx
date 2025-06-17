'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { UseCostumerChartDataDto } from '@/hooks/dashboard/useCostumerChartData'
import { Pie, PieChart } from 'recharts'
export const description = 'A pie chart showing active vs inactive clients'

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

export function CostumerPieChart({ data }: UseCostumerChartDataDto) {
  const dataCostumer = data.getPieChartData?.() ?? []
  const isEmpty = data.total === 0

  return (
    <Card className="flex w-[453px] flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Distribuição de Clientes</CardTitle>
        <CardDescription>Ativos vs Inativos</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {isEmpty ? (
          <div className="flex h-[250px] items-center justify-center">
            <span className="text-muted-foreground text-sm">
              Sem dados para exibir
            </span>
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[250px] pb-0"
          >
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <Pie data={dataCostumer} dataKey="value" nameKey="tipo" label />
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}
