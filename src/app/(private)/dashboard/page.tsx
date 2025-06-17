'use client'
import { AppSidebar } from '@/components/dashboard/app-sidebar'
import { CostumerBarChart } from '@/components/dashboard/costumer-bar-chart'
import { CostumerPieChart } from '@/components/dashboard/costumers-pie-chart'
import { DataTableCostumers } from '@/components/dashboard/data-table'
import { SectionCards } from '@/components/dashboard/section-cards'
import { SiteHeader } from '@/components/dashboard/site-header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { useCostumerChartData } from '@/hooks/dashboard/useCostumerChartData'
import { getSession, Session } from '@/lib/session'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function DashboardPage() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession()
      if (!session || !session.user) redirect('/login')

      setSession(session)
    }

    checkSession()
  }, [])

  const data = useCostumerChartData()
  if (data.error) return toast.error('Erro ao buscar clientes')

  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)',
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="mt-2 flex flex-col px-4 lg:px-6">
              <h1>
                Olá, <strong>{session?.user.name}</strong>
              </h1>
              <p className="text-muted-foreground">
                Bem-vindo ao painel de controle da Sinka!
              </p>
            </div>
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards data={data} />
              <div className="px-4 lg:px-6">
                <div className="flex gap-3">
                  <CostumerBarChart data={data} />
                  <CostumerPieChart data={data} />
                </div>
              </div>
              <h1 className="px-4 text-xl font-semibold md:px-6">
                Lista de Clientes
              </h1>
              <DataTableCostumers />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
