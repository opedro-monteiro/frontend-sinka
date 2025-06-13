'use client'

import {
  IconBuilding,
  IconDashboard,
  IconHelp,
  IconSettings,
  IconUsers,
} from '@tabler/icons-react'
import { Linkedin } from 'lucide-react'
import * as React from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../ui/sidebar'
import { NavMain } from './nav-main'
import { NavSecondary } from './nav-secondary'
import { NavUser } from './nav-user'

const data = {
  user: {
    name: 'Pedro Monteiro',
    email: 'pedro@example.com',
    avatar: '/login-wallpaper.svg',
  },
  navMain: [
    {
      title: 'Dashboard',
      url: '#',
      icon: IconDashboard,
    },
    {
      title: 'Colaboradores',
      url: '#',
      icon: IconUsers,
    },
    {
      title: 'Clientes',
      url: '#',
      icon: IconBuilding,
    },
  ],
  navSecondary: [
    {
      title: 'Configurações',
      url: '#',
      icon: IconSettings,
    },
    {
      title: 'Ajuda',
      url: '#',
      icon: IconHelp,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="https://www.linkedin.com/in/opedro-monteiro/">
                <Linkedin className="!size-5" />
                <span className="text-base font-semibold">Monteiro Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
