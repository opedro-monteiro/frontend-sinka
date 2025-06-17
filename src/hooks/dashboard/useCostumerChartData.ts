import { getCostumers } from '@/services/costumers-service'
import { CostumerDto } from '@/types/dto/costumer.dto'
import { useEffect, useState } from 'react'

export interface ChartDataDto {
  tipo: string
  value: number
  fill: string
}

export interface UseCostumerChartDataDto {
  data: {
    isLoading?: boolean
    error?: string | null
    total?: number
    ativos?: number
    inativos?: number
    getBarChartData?: () => ChartDataDto[]
    getPieChartData?: () => ChartDataDto[]
  }
}

export const useCostumerChartData = () => {
  const [total, setTotal] = useState(0)
  const [ativos, setAtivos] = useState(0)
  const [inativos, setInativos] = useState(0)

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCostumers = async () => {
      try {
        setIsLoading(true)

        const costumers: CostumerDto[] = await getCostumers()

        const total = costumers.length
        const ativos = costumers.filter((c) => c.isActive).length
        const inativos = total - ativos

        setTotal(total)
        setAtivos(ativos)
        setInativos(inativos)
      } catch (error) {
        console.error('Erro ao buscar clientes:', error)
        setError('Erro ao buscar clientes')
      } finally {
        setIsLoading(false)
      }
    }

    fetchCostumers()
  }, [])

  const getBarChartData = (): ChartDataDto[] => [
    { tipo: 'Total de Clientes', value: total, fill: 'var(--chart-1)' },
    { tipo: 'Ativos', value: ativos, fill: 'var(--chart-2)' },
  ]

  const getPieChartData = (): ChartDataDto[] => [
    { tipo: 'Ativos', value: ativos, fill: 'var(--chart-1)' },
    { tipo: 'Inativos', value: inativos, fill: 'var(--chart-2)' },
  ]

  return {
    isLoading,
    error,
    total,
    ativos,
    inativos,
    getBarChartData,
    getPieChartData,
  }
}
