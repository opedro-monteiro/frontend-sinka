'use client'

import CustomerRegistrationForm, {
  CustomerFormData,
} from '@/components/dashboard/customer-registration/customer-registration-form'
import { Loading } from '@/components/loading'
import { createCostumer } from '@/services/costumers-service'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

export default function CustomerRegistrationFormPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleCustomerSubmit = async (data: CustomerFormData) => {
    console.log('Enviando dados para API:', data)

    try {
      setIsLoading(true)
      const res = await createCostumer(data)
      if (!res) {
        throw new Error('Erro ao criar cliente')
      }

      toast.success('Cliente criado com sucesso!')
      router.push('/dashboard')
    } catch (error) {
      if (error instanceof Error) {
        toast.error(
          'Erro ao criar cliente' + error.message || 'Erro desconhecido',
        )
      }
    }
  }

  if (isLoading) return <Loading />

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <CustomerRegistrationForm onSubmit={handleCustomerSubmit} />
    </main>
  )
}
