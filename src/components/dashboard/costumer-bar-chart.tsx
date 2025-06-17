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
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from 'recharts'
export const description = 'A bar chart showing active vs total clients'

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
} as ChartConfig

export function CostumerBarChart({ data }: UseCostumerChartDataDto) {
  const dataCostumer = data.getBarChartData?.() ?? []
  const isEmpty = data.total === 0
  return (
    <Card className="flex w-[453px] flex-col">
      <CardHeader>
        <CardTitle>Clientes Totais vs Clientes Ativos</CardTitle>
        <CardDescription>Indicador de engajamento</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        {isEmpty ? (
          <div className="flex h-[250px] items-center justify-center">
            <span className="text-muted-foreground text-sm">
              Sem dados para exibir
            </span>
          </div>
        ) : (
          <div className="flex h-full flex-1">
            <ChartContainer config={chartConfig}>
              <BarChart width={250} height={200} data={dataCostumer}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="tipo"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <ChartTooltip
                  cursor={true}
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
                      strokeDasharray={4}
                      strokeDashoffset={4}
                    />
                  )}
                />
              </BarChart>
            </ChartContainer>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
