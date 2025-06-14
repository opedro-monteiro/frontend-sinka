'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { OrganizationFormData } from '@/types/schemas/organization-schema'

interface OrganizationStepProps {
  formData: OrganizationFormData
  errors: Partial<OrganizationFormData>
  updateFormData: (field: keyof OrganizationFormData, value: string) => void
}

export function OrganizationStep({
  formData,
  errors,
  updateFormData,
}: OrganizationStepProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="organizationName">Nome da Organização *</Label>
        <Input
          id="organizationName"
          placeholder="Ex: Minha Empresa Ltda"
          value={formData.organizationName}
          onChange={(e) => updateFormData('organizationName', e.target.value)}
          className={errors.organizationName ? 'border-red-500' : ''}
        />
        {errors.organizationName && (
          <p className="mt-1 text-sm text-red-500">{errors.organizationName}</p>
        )}
      </div>
    </div>
  )
}
