import { api } from '@/lib/axios'

import { deleteSession } from '@/lib/session'
import { redirect, RedirectType } from 'next/navigation'

export type LoginResponse = {
  user: {
    id: string
    name: string
    email: string
    role: string
    tenantId: string
  }
  accessToken: string
  refreshToken: string
}

export type LoginRequest = {
  email: string
  password: string
}

export async function login(data: LoginRequest) {
  const response = await api.post<LoginResponse>('/auth/login', data)

  if (response.status !== 200)
    throw new Error(response.statusText || 'Erro ao realizar login')

  return response.data
}

export async function logout() {
  await deleteSession()

  redirect('/', RedirectType.push)
}
