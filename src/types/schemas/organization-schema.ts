import z from 'zod'

export const organizationSchema = z.object({
  organizationName: z
    .string()
    .min(2, 'Nome da organização deve ter pelo menos 2 caracteres')
    .trim(),
  adminName: z
    .string()
    .min(2, 'Nome completo deve ter pelo menos 2 caracteres')
    .trim(),
  adminEmail: z.string().email('Email inválido').trim(),
  adminPassword: z
    .string()
    .min(6, 'Senha deve ter pelo menos 6 caracteres')
    .trim(),
})

export type OrganizationFormData = z.infer<typeof organizationSchema>
