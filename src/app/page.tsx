import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Building2, Shield, Zap } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <Building2 className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-slate-900">Sinka</span>
          </div>
          <Link href="/login">
            <Button
              variant="ghost"
              className="text-slate-600 hover:text-slate-900"
            >
              Já tem uma conta? Fazer login
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-4xl leading-tight font-bold text-slate-900 lg:text-6xl">
            Centralize sua gestão
            <span className="block text-blue-600">em um só lugar</span>
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-xl leading-relaxed text-slate-600">
            Simplifique a administração da sua empresa com nossa plataforma
            completa de gestão multi-tenant.
          </p>

          <div className="mb-16 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/create-organization">
              <Button size="lg" className="w-full px-8 py-3 text-lg sm:w-auto">
                Criar sua organização
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/login">
              <Button
                variant="outline"
                size="lg"
                className="w-full px-8 py-3 text-lg sm:w-auto"
              >
                Já tem uma conta? Fazer login
              </Button>
            </Link>
          </div>

          {/* Features Grid */}
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            <Card className="border-0 bg-white/60 shadow-lg backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                  <Building2 className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-slate-900">
                  Multi-tenant
                </h3>
                <p className="text-slate-600">
                  Isolamento completo de dados entre organizações
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/60 shadow-lg backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-slate-900">
                  Segurança
                </h3>
                <p className="text-slate-600">
                  Autenticação robusta e proteção de dados
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/60 shadow-lg backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                  <Zap className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-slate-900">
                  Performance
                </h3>
                <p className="text-slate-600">Rápido, escalável e confiável</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8 text-center text-slate-600">
          <p>&copy; 2024 Sinka. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
