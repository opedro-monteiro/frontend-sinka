'use client'

import { AdminStep } from '@/components/create-organization/admin-step'
import { ConfirmationStep } from '@/components/create-organization/confirmation-step'
import { OrganizationStep } from '@/components/create-organization/organization-step'
import { StepIndicator } from '@/components/create-organization/step-indicator'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createTenant } from '@/services/organization-service'
import {
  type OrganizationFormData,
  organizationSchema,
} from '@/types/schemas/organization-schema'
import { ArrowLeft, ArrowRight, Building2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

export default function CreateOrganizationPage() {
  const router = useRouter()

  const [formData, setFormData] = useState<OrganizationFormData>({
    organizationName: '',
    adminName: '',
    adminEmail: '',
    adminPassword: '',
  })

  const [errors, setErrors] = useState<Partial<OrganizationFormData>>({})
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const steps = [
    { number: 1, title: 'Organização', description: 'Informações da empresa' },
    { number: 2, title: 'Administrador', description: 'Dados do responsável' },
    { number: 3, title: 'Confirmação', description: 'Revisar dados' },
  ]

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<OrganizationFormData> = {}

    if (step === 1) {
      if (!formData.organizationName.trim()) {
        newErrors.organizationName = 'Nome da organização é obrigatório'
      }
    }

    if (step === 2) {
      if (!formData.adminName.trim()) {
        newErrors.adminName = 'Nome completo é obrigatório'
      }
      if (!formData.adminEmail.trim()) {
        newErrors.adminEmail = 'Email é obrigatório'
      } else if (!/\S+@\S+\.\S+/.test(formData.adminEmail)) {
        newErrors.adminEmail = 'Email inválido'
      }
      if (!formData.adminPassword.trim()) {
        newErrors.adminPassword = 'Senha é obrigatória'
      } else if (formData.adminPassword.length < 6) {
        newErrors.adminPassword = 'Senha deve ter pelo menos 6 caracteres'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const updateFormData = (field: keyof OrganizationFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1)
    setErrors({})
  }

  const handleSubmit = async () => {
    try {
      setIsLoading(true)
      organizationSchema.parse(formData)

      const result = await createTenant({
        name: formData.organizationName,
        admin: {
          name: formData.adminName,
          email: formData.adminEmail,
          password: formData.adminPassword,
        },
      })

      if (!result.id) throw new Error('Erro ao criar organização')

      toast.success('Organização criada com sucesso!')
      router.push('/login?organization=created')
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Erro ao criar organização',
      )
    } finally {
      setIsLoading(false)
    }
  }

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return 'Informações da Organização'
      case 2:
        return 'Dados do Administrador'
      case 3:
        return 'Confirmar Criação'
      default:
        return ''
    }
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <OrganizationStep
            formData={formData}
            errors={errors}
            updateFormData={updateFormData}
          />
        )
      case 2:
        return (
          <AdminStep
            formData={formData}
            errors={errors}
            updateFormData={updateFormData}
          />
        )
      case 3:
        return <ConfirmationStep formData={formData} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
      <div className="container mx-auto max-w-2xl px-4">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold text-slate-900">Sinka</span>
          </div>
        </div>

        {/* Step Indicator */}
        <StepIndicator steps={steps} currentStep={currentStep} />

        {/* Card */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              {getStepTitle()}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {renderCurrentStep()}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className={currentStep === 1 ? 'invisible' : ''}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Anterior
              </Button>

              {currentStep < 3 ? (
                <Button onClick={handleNext}>
                  Próximo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={isLoading}>
                  {isLoading ? 'Criando...' : 'Criar organização e continuar'}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
