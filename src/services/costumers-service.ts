import { CustomerFormData } from '@/components/dashboard/customer-registration/customer-registration-form'
import { api } from '@/lib/axios'
import { CostumerDto } from '@/types/dto/costumer.dto'

export async function getCostumers() {
  const response = await api.get<CostumerDto[]>('/costumers')

  if (response.status !== 200)
    throw new Error(response.statusText || 'Erro ao buscar clientes')

  return response.data
}

export async function createCostumer(costumer: CustomerFormData) {
  const response = await api.post<CostumerDto>('/costumers', costumer)

  if (response.status !== 201)
    throw new Error(response.statusText || 'Erro ao criar cliente')

  return response.data
}
