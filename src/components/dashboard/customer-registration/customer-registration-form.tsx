'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

// Schema de validação usando Zod
const customerSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Nome deve ter pelo menos 2 caracteres' })
    .max(100, { message: 'Nome deve ter no máximo 100 caracteres' })
    .trim(),
  email: z
    .string()
    .email({ message: 'Por favor, insira um email válido' })
    .trim(),
  isActive: z.boolean(),
  contact: z
    .string()
    .min(10, { message: 'Contato deve ter pelo menos 10 caracteres' })
    .regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, {
      message: 'Formato inválido. Use: (11) 91234-5678',
    }),
  imageUrl: z
    .string()
    .url({ message: 'Por favor, insira uma URL válida' })
    .optional()
    .or(z.literal('')),
  address: z.object({
    street: z
      .string()
      .min(5, { message: 'Rua deve ter pelo menos 5 caracteres' })
      .max(200, { message: 'Rua deve ter no máximo 200 caracteres' })
      .trim(),
    neighborhood: z
      .string()
      .min(2, { message: 'Bairro deve ter pelo menos 2 caracteres' })
      .max(100, { message: 'Bairro deve ter no máximo 100 caracteres' })
      .trim(),
    number: z
      .string()
      .min(1, { message: 'Número é obrigatório' })
      .max(10, { message: 'Número deve ter no máximo 10 caracteres' })
      .trim(),
    state: z
      .string()
      .min(2, { message: 'Estado é obrigatório' })
      .max(2, { message: 'Use a sigla do estado (ex: SP)' })
      .toUpperCase(),
  }),
})

export type CustomerFormData = z.infer<typeof customerSchema>

// Estados brasileiros
const brazilianStates = [
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'AP', label: 'Amapá' },
  { value: 'AM', label: 'Amazonas' },
  { value: 'BA', label: 'Bahia' },
  { value: 'CE', label: 'Ceará' },
  { value: 'DF', label: 'Distrito Federal' },
  { value: 'ES', label: 'Espírito Santo' },
  { value: 'GO', label: 'Goiás' },
  { value: 'MA', label: 'Maranhão' },
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'PA', label: 'Pará' },
  { value: 'PB', label: 'Paraíba' },
  { value: 'PR', label: 'Paraná' },
  { value: 'PE', label: 'Pernambuco' },
  { value: 'PI', label: 'Piauí' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'RO', label: 'Rondônia' },
  { value: 'RR', label: 'Roraima' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'SP', label: 'São Paulo' },
  { value: 'SE', label: 'Sergipe' },
  { value: 'TO', label: 'Tocantins' },
]

interface CustomerRegistrationFormProps {
  onSubmit?: (data: CustomerFormData) => void | Promise<void>
  defaultValues?: Partial<CustomerFormData>
  isLoading?: boolean
}

export default function CustomerRegistrationForm({
  onSubmit,
  defaultValues,
  isLoading = false,
}: CustomerRegistrationFormProps) {
  const form = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: '',
      email: '',
      isActive: true,
      contact: '',
      imageUrl: '',
      address: {
        street: '',
        neighborhood: '',
        number: '',
        state: '',
      },
      ...defaultValues,
    },
  })

  const handleSubmit = async (data: CustomerFormData) => {
    try {
      if (onSubmit) {
        await onSubmit(data)
      } else {
        // Simulação de envio - remova em produção
        console.log('Dados do cliente:', data)
        toast.success('Cliente cadastrado com sucesso!', {
          description: `${data.name} foi registrado no sistema.`,
        })
      }
    } catch (error) {
      toast.error('Erro ao cadastrar cliente', {
        description: 'Ocorreu um erro inesperado. Tente novamente.',
      })
      console.error('Erro no cadastro:', error)
    }
  }

  // Função para formatar telefone automaticamente
  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length <= 11) {
      return numbers
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4,5})(\d{4})$/, '$1-$2')
    }
    return value
  }

  return (
    <div className="mx-auto w-full max-w-4xl p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Cadastro de Cliente
          </CardTitle>
          <CardDescription className="text-center">
            Preencha os dados abaixo para registrar um novo cliente no sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              {/* Informações Pessoais */}
              <div className="space-y-4">
                <h3 className="border-b pb-2 text-lg font-semibold">
                  Informações Pessoais
                </h3>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome Completo *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Digite o nome completo"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email *</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="exemplo@email.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="contact"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefone de Contato *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="(11) 91234-5678"
                            {...field}
                            onChange={(e) => {
                              const formatted = formatPhone(e.target.value)
                              field.onChange(formatted)
                            }}
                          />
                        </FormControl>
                        <FormDescription>
                          Formato: (11) 91234-5678
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL da Foto (Opcional)</FormLabel>
                        <FormControl>
                          <Input
                            type="url"
                            placeholder="https://exemplo.com/foto.jpg"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Cliente Ativo
                        </FormLabel>
                        <FormDescription>
                          Determina se o cliente está ativo no sistema
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {/* Endereço */}
              <div className="space-y-4">
                <h3 className="border-b pb-2 text-lg font-semibold">
                  Endereço
                </h3>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="md:col-span-2">
                    <FormField
                      control={form.control}
                      name="address.street"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Rua *</FormLabel>
                          <FormControl>
                            <Input placeholder="Rua das Flores" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="address.number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Número *</FormLabel>
                        <FormControl>
                          <Input placeholder="123" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="address.neighborhood"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bairro *</FormLabel>
                        <FormControl>
                          <Input placeholder="Centro" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address.state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estado *</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o estado" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {brazilianStates.map((state) => (
                              <SelectItem key={state.value} value={state.value}>
                                {state.label} ({state.value})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="flex flex-col gap-4 pt-6 sm:flex-row">
                <Button type="submit" className="flex-1" disabled={isLoading}>
                  {isLoading ? 'Cadastrando...' : 'Cadastrar Cliente'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => form.reset()}
                  disabled={isLoading}
                >
                  Limpar Formulário
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
