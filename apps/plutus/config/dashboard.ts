import { AppConfig } from '@/types'

export const appConfig: AppConfig = {
  mainNav: [
    {
      title: 'Uptime',
      href: '/dashboard',
    },
    {
      title: 'Logs',
      href: '/dashboard/logs',
    },
  ],
  sidebarNav: [
    {
      id: 'overview',
      title: 'Overview',
      href: '/app',
      icon: 'chart',
    },
    {
      id: 'income',
      title: 'Income',
      href: '/app/income',
      icon: 'income',
    },
    {
      id: 'expenses',
      title: 'Expenses',
      href: '/app/expenses',
      icon: 'expenses',
    },
    {
      id: 'investments',
      title: 'Investments',
      href: '/app/investments',
      icon: 'investments',
    },
    {
      id: 'subscriptions',
      title: 'Subscriptions',
      href: '/app/subscriptions',
      icon: 'subscriptions',
    },
  ],
}
