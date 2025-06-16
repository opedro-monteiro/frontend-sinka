'use client'

import { Loading } from '@/components/loading'
import { createSession } from '@/lib/session'
import { Role } from '@/lib/type'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'sonner'

export default function AuthCallback() {
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const token = searchParams.get('token')
    const refreshToken = searchParams.get('refreshToken')
    const id = searchParams.get('id')
    const name = searchParams.get('name')
    const email = searchParams.get('email')
    const role = searchParams.get('role')
    const tenantId = searchParams.get('tenantId')

    if (token && id) {
      // Cria a sessão no cookie
      createSession({
        user: {
          id,
          name: name || '',
          email: email || '',
          role: role as Role,
          tenantId: tenantId || '',
        },
        accessToken: token,
        refreshToken: refreshToken || '',
      })
        .then(() => {
          router.replace('/dashboard')
        })
        .catch((err) => {
          toast.error(
            'Erro ao criar sessão: ' +
              (err instanceof Error ? err.message : 'Erro desconhecido'),
          )
          router.replace('/login')
        })
    } else {
      router.replace('/login')
    }
  }, [searchParams, router])

  return <Loading />
}
