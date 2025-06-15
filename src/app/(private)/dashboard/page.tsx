'use client'
import { AppSidebar } from '@/components/dashboard/app-sidebar'
import { CostumerBarChart } from '@/components/dashboard/costumer-bar-chart'
import { CostumerPieChart } from '@/components/dashboard/costumers-pie-chart'
import { DataTableCostumers } from '@/components/dashboard/data-table'
import { SectionCards } from '@/components/dashboard/section-cards'
import { SiteHeader } from '@/components/dashboard/site-header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

export default function DashboardPage() {
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
            <div className="flex flex-col gap-2 px-4 lg:px-6">
              <h1></h1>
              <p className="text-muted-foreground">
                Bem-vindo ao painel de controle da Sinka!
              </p>
            </div>
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <div className="flex gap-3">
                  <CostumerBarChart />
                  <CostumerPieChart />
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
