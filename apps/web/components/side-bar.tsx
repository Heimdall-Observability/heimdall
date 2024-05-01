'use client'
import { useState } from 'react'

import { Sidebar, SidebarState, useSidebar } from '@almond-ui/core'
import {
  EnvelopeOpen,
  ExcludeSquare,
  RocketLaunch,
} from '@phosphor-icons/react'
import { Book, Briefcase, Key, Shield, Sliders, Users } from 'lucide-react'

export default function SideBar() {
  const [expanded, setExpanded] = useState(true)
  const [mobile, setMobile] = useState(false)
  const sidebar = useSidebar()

  return (
    <Sidebar
      color="white"
      shadow="none"
      onToggle={(state: SidebarState) => {
        setExpanded(state.expanded)
        setMobile(state.mobile)
      }}
      className="absolute"
    >
      <Sidebar.Head>
        <Sidebar.Head.Logo>
          <ExcludeSquare size={32} color="#0074a6" weight="duotone" />
        </Sidebar.Head.Logo>
        <Sidebar.Head.Title>Almond-UI</Sidebar.Head.Title>
        <Sidebar.Head.Toggle />
      </Sidebar.Head>

      <Sidebar.Nav>
        <Sidebar.Nav.Section>
          <Sidebar.Nav.Section.Item
            icon={<RocketLaunch />}
            label="Dashboard"
            href="#"
            active
          />
        </Sidebar.Nav.Section>

        <Sidebar.Nav.Section>
          <Sidebar.Nav.Section.Title>Management</Sidebar.Nav.Section.Title>
          <Sidebar.Nav.Section.Item
            icon={<Briefcase />}
            label="Clients"
            href="#"
          />
          <Sidebar.Nav.Section.Item icon={<Users />} label="Users" as="button">
            <Sidebar.Nav.Section isChild>
              <Sidebar.Nav.Section.Item
                icon={<span className="w-1 h-1 rounded bg-transparent" />}
                label="List all"
                href="#"
              />
              <Sidebar.Nav.Section.Item
                icon={<span className="w-1 h-1 rounded bg-transparent" />}
                label="Add new"
                href="#"
              />
              <Sidebar.Nav.Section.Item
                icon={<span className="w-1 h-1 rounded bg-transparent" />}
                label="Archived"
                href="#"
              />
            </Sidebar.Nav.Section>
          </Sidebar.Nav.Section.Item>
          <Sidebar.Nav.Section.Item icon={<Shield />} label="Roles" href="#" />
          <Sidebar.Nav.Section.Item
            icon={<Key />}
            label="Permissions"
            href="#"
          />
          <Sidebar.Nav.Section.Item
            icon={<Sliders />}
            label="Settings"
            href="#"
          />
        </Sidebar.Nav.Section>

        <Sidebar.Nav.Section>
          <Sidebar.Nav.Section.Title>Support</Sidebar.Nav.Section.Title>
          <Sidebar.Nav.Section.Item
            icon={<EnvelopeOpen />}
            label="Tickets"
            href="#"
          />
          <Sidebar.Separator />
          <Sidebar.Nav.Section.Item
            icon={<Book />}
            label="Documentation"
            href="#"
          />
        </Sidebar.Nav.Section>
      </Sidebar.Nav>

      <Sidebar.Footer>
        <div className="flex flex-col justify-center items-center text-sm">
          <span className="font-semibold">Almond-UI</span>
          <span>version x.y.z</span>
        </div>
      </Sidebar.Footer>
    </Sidebar>
  )
}
