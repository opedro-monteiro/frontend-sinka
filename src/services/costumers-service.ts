import { api } from '@/lib/axios'
import { CostumerDto } from '@/types/dto/costumer.dto'

export async function getCostumers() {
  const response = await api.get<CostumerDto[]>('/costumers')

  if (response.status !== 200)
    throw new Error(response.statusText || 'Erro ao buscar clientes')

  return response.data
}
