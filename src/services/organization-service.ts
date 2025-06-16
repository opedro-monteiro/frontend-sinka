import { api } from '@/lib/axios'

export interface TenantCreateDto {
  name: string
  admin: Admin
}

export interface Admin {
  name: string
  email: string
  password: string
}

export interface TenantResponse {
  id: string
  name: string
}

export async function createTenant(data: TenantCreateDto) {
  const response = await api.post<TenantResponse>('/tenants', data)

  if (response.status !== 200)
    throw new Error(response.statusText || 'Erro ao realizar login')

  return response.data
}

export async function getTenantById(tenantId: string) {
  const response = await api.get<TenantResponse>(`/tenants/${tenantId}`)

  if (response.status !== 200)
    throw new Error(response.statusText || 'Erro ao buscar tenant')

  return response.data
}
