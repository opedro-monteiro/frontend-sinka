'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createSession } from '@/lib/session'
import { Role } from '@/lib/type'
import { login } from '@/services/auth-service'
import { LoginFormData, loginFormSchema } from '@/types/schemas/login-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import GitHubIcon from './icons/github'
import GoogleIcon from './icons/google'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'

export function LoginForm() {
  const router = useRouter()

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: LoginFormData) {
    try {
      const result = await login(values)

      await createSession({
        user: {
          id: result.user.id,
          name: result.user.name,
          email: result.user.email,
          role: result.user.role as Role,
          tenantId: result.user.tenantId,
        },
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      })

      toast.success('Login realizado com sucesso!')
      router.push('/dashboard')
    } catch (error) {
      if (error instanceof Error) {
        toast.error('Erro ao realizar login: ' + error.message)
        return { message: error.message }
      }
      return { message: 'Erro desconhecido. Tente novamente.' }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Entre na sua conta</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Digite seu email abaixo para entrar na sua conta
          </p>
        </div>
        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="m@exemplo.com" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center">
                  <FormLabel>Senha</FormLabel>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Esqueceu sua senha?
                  </a>
                </div>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Entrar
          </Button>
          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="text-muted-foreground relative z-10 bg-slate-100 px-2">
              Ou continue com
            </span>
          </div>
          <Button type="button" variant="outline" className="w-full">
            <Link
              href={`${process.env.NEXT_PUBLIC_BASE_URL}/auth/github/login`}
              className="flex items-center gap-2"
            >
              <GitHubIcon />
              Entrar com GitHub
            </Link>
          </Button>
          <Button type="button" variant="outline" className="w-full" asChild>
            <Link
              href={`${process.env.NEXT_PUBLIC_BASE_URL}/auth/google/login`}
              className="flex items-center gap-2"
            >
              <GoogleIcon />
              Entrar com Google
            </Link>
          </Button>
        </div>
        <div className="text-center text-sm">
          Não tem uma conta?{' '}
          <a
            href="/create-organization"
            className="underline underline-offset-4"
          >
            Cadastre-se
          </a>
        </div>
      </form>
    </Form>
  )
}
