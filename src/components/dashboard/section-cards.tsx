'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UseCostumerChartDataDto } from '@/hooks/dashboard/useCostumerChartData'
import { IconUserCheck, IconUserOff, IconUsers } from '@tabler/icons-react'

export function SectionCards({ data }: UseCostumerChartDataDto) {
  const dataCards = [
    {
      label: 'Total de Clientes',
      value: data.total,
      icon: <IconUsers className="text-primary h-6 w-6" />,
    },
    {
      label: 'Clientes Ativos',
      value: data.ativos,
      icon: <IconUserCheck className="h-6 w-6 text-green-500" />,
    },
    {
      label: 'Clientes Inativos',
      value: data.inativos,
      icon: <IconUserOff className="text-destructive h-6 w-6" />,
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-3">
      {dataCards.map((item) => (
        <Card key={item.label} className="rounded-2xl shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{item.label}</CardTitle>
            {item.icon}
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {data.isLoading ? '...' : item.value?.toLocaleString('pt-BR')}
            </div>
            <p className="text-muted-foreground text-xs">
              {item.label.includes('Ativo')
                ? 'Baseado no status atual'
                : 'Total registrado no sistema'}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
