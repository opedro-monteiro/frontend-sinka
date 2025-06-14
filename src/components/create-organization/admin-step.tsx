'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { OrganizationFormData } from '@/types/schemas/organization-schema'

interface AdminStepProps {
  formData: OrganizationFormData
  errors: Partial<OrganizationFormData>
  updateFormData: (field: keyof OrganizationFormData, value: string) => void
}

export function AdminStep({
  formData,
  errors,
  updateFormData,
}: AdminStepProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="adminName">Nome Completo *</Label>
        <Input
          id="adminName"
          placeholder="Seu nome completo"
          value={formData.adminName}
          onChange={(e) => updateFormData('adminName', e.target.value)}
          className={errors.adminName ? 'border-red-500' : ''}
        />
        {errors.adminName && (
          <p className="mt-1 text-sm text-red-500">{errors.adminName}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="adminEmail">Email *</Label>
        <Input
          id="adminEmail"
          type="email"
          placeholder="seu@email.com"
          value={formData.adminEmail}
          onChange={(e) => updateFormData('adminEmail', e.target.value)}
          className={errors.adminEmail ? 'border-red-500' : ''}
        />
        {errors.adminEmail && (
          <p className="mt-1 text-sm text-red-500">{errors.adminEmail}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="adminPassword">Senha *</Label>
        <Input
          id="adminPassword"
          type="password"
          placeholder="Mínimo 6 caracteres"
          value={formData.adminPassword}
          onChange={(e) => updateFormData('adminPassword', e.target.value)}
          className={errors.adminPassword ? 'border-red-500' : ''}
        />
        {errors.adminPassword && (
          <p className="mt-1 text-sm text-red-500">{errors.adminPassword}</p>
        )}
      </div>
    </div>
  )
}
