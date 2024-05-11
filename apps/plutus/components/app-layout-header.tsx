import { ReactNode } from 'react'

import DatePicker from '@/components/date-range-picker'
import { Icons } from '@/components/icons'
import MobileNav from '@/components/mobile-nav'
import { DashboardShell } from '@/components/shell'

interface DashboardHeaderProps {
  heading: string
  subHeading?: string
  showDatePicker?: boolean
  addButton?: ReactNode
}

export default function AppLayoutHeader({
  heading,
  subHeading,
  showDatePicker = false,
  addButton,
}: DashboardHeaderProps) {
  return (
    <DashboardShell>
      <div className="flex flex-col justify-between gap-2 md:flex-row">
        <div className="grid gap-1">
          <div className="flex flex-row justify-between">
            <div className="flex items-center space-x-2">
              <div className="block md:hidden">
                <Icons.logo height={36} width={36} />
              </div>
              <h1 className="bg-clip-text font-semibold text-primary leading-none md:text-xl">
                {heading}
              </h1>
            </div>
            {subHeading && (
              <p className="text-muted-foreground">{subHeading}</p>
            )}
            <MobileNav />
          </div>
        </div>
        <div className="md:flex md:items-center md:justify-between md:space-x-2">
          {showDatePicker ? <DatePicker /> : null}
          {addButton}
        </div>
      </div>
    </DashboardShell>
  )
}
