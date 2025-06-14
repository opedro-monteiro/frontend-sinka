'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft, ArrowRight, Building2, Check } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { z } from 'zod'

const organizationSchema = z.object({
  organizationName: z
    .string()
    .min(2, 'Nome da organização deve ter pelo menos 2 caracteres'),
  adminName: z
    .string()
    .min(2, 'Nome completo deve ter pelo menos 2 caracteres'),
  adminEmail: z.string().email('Email inválido'),
  adminPassword: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres'),
})

type FormData = z.infer<typeof organizationSchema>

export default function CreateOrganizationPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    organizationName: '',
    adminName: '',
    adminEmail: '',
    adminPassword: '',
  })
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [isLoading, setIsLoading] = useState(false)

  const steps = [
    { number: 1, title: 'Organização', description: 'Informações da empresa' },
    { number: 2, title: 'Administrador', description: 'Dados do responsável' },
    { number: 3, title: 'Confirmação', description: 'Revisar informações' },
  ]

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<FormData> = {}

    if (step === 1) {
      if (!formData.organizationName.trim()) {
        newErrors.organizationName = 'Nome da organização é obrigatório'
      }
    } else if (step === 2) {
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
      } else if (formData.adminPassword.length < 8) {
        newErrors.adminPassword = 'Senha deve ter pelo menos 8 caracteres'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1)
    setErrors({})
  }

  const handleSubmit = async () => {
    try {
      setIsLoading(true)
      organizationSchema.parse(formData)

      // Simular criação da organização
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Redirecionar para login
      router.push('/login?organization=created')
    } catch (error) {
      console.error('Erro ao criar organização:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
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

        {/* Steps Indicator */}
        <div className="mb-8 flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium ${
                    currentStep >= step.number
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {currentStep > step.number ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    step.number
                  )}
                </div>
                <div className="mt-2 text-center">
                  <div className="text-sm font-medium text-slate-900">
                    {step.title}
                  </div>
                  <div className="text-xs text-slate-500">
                    {step.description}
                  </div>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`mx-4 h-px flex-1 ${currentStep > step.number ? 'bg-blue-600' : 'bg-slate-200'}`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Form Card */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              {currentStep === 1 && 'Informações da Organização'}
              {currentStep === 2 && 'Dados do Administrador'}
              {currentStep === 3 && 'Confirmar Criação'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Organization */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="organizationName">
                    Nome da Organização *
                  </Label>
                  <Input
                    id="organizationName"
                    placeholder="Ex: Minha Empresa Ltda"
                    value={formData.organizationName}
                    onChange={(e) =>
                      updateFormData('organizationName', e.target.value)
                    }
                    className={errors.organizationName ? 'border-red-500' : ''}
                  />
                  {errors.organizationName && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.organizationName}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Step 2: Administrator */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="adminName">Nome Completo *</Label>
                  <Input
                    id="adminName"
                    placeholder="Seu nome completo"
                    value={formData.adminName}
                    onChange={(e) =>
                      updateFormData('adminName', e.target.value)
                    }
                    className={errors.adminName ? 'border-red-500' : ''}
                  />
                  {errors.adminName && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.adminName}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="adminEmail">Email *</Label>
                  <Input
                    id="adminEmail"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.adminEmail}
                    onChange={(e) =>
                      updateFormData('adminEmail', e.target.value)
                    }
                    className={errors.adminEmail ? 'border-red-500' : ''}
                  />
                  {errors.adminEmail && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.adminEmail}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="adminPassword">Senha *</Label>
                  <Input
                    id="adminPassword"
                    type="password"
                    placeholder="Mínimo 8 caracteres"
                    value={formData.adminPassword}
                    onChange={(e) =>
                      updateFormData('adminPassword', e.target.value)
                    }
                    className={errors.adminPassword ? 'border-red-500' : ''}
                  />
                  {errors.adminPassword && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.adminPassword}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Confirmation */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="space-y-3 rounded-lg bg-slate-50 p-4">
                  <h3 className="font-medium text-slate-900">
                    Resumo das Informações
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Organização:</span>
                      <span className="font-medium">
                        {formData.organizationName}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Administrador:</span>
                      <span className="font-medium">{formData.adminName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Email:</span>
                      <span className="font-medium">{formData.adminEmail}</span>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg bg-blue-50 p-4 text-sm text-slate-600">
                  <p>
                    Ao criar sua organização, você será redirecionado para a
                    tela de login onde poderá acessar sua conta.
                  </p>
                </div>
              </div>
            )}

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
