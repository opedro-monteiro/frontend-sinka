import type { OrganizationFormData } from '@/types/schemas/organization-schema'

interface ConfirmationStepProps {
  formData: OrganizationFormData
}

export function ConfirmationStep({ formData }: ConfirmationStepProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-3 rounded-lg bg-slate-50 p-4">
        <h3 className="font-medium text-slate-900">Resumo das Informações</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-600">Organização:</span>
            <span className="font-medium">{formData.organizationName}</span>
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
          Ao criar sua organização, você será redirecionado para a tela de login
          onde poderá acessar sua conta.
        </p>
      </div>
    </div>
  )
}
