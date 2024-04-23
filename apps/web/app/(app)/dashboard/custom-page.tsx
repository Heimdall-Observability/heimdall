'use client';

import * as React from 'react';
import { ReactNode, useState } from 'react';

import { Overlay, Sidebar, SidebarState, useSidebar } from '@almond-ui/core';
import {
	Book,
	Briefcase,
	EnvelopeOpen,
	ExcludeSquare,
	Key,
	RocketLaunch,
	Shield,
	Sliders,
	Users,
} from '@phosphor-icons/react';

interface Props {
	children: ReactNode;
}

export default function CustomPage({ children }: Props) {
	const [expanded, setExpanded] = useState(true);
	const [mobile, setMobile] = useState(false);
	const sidebar = useSidebar();

	return (
		<div className='flex min-h-screen flex-col bg-muted/50 pb-12'>
			<div className='flex w-full h-full flex-1 flex-col space-y-0 overflow-hidden'>
				<Sidebar
					color='white'
					shadow='none'
					onToggle={(state: SidebarState) => {
						setExpanded(state.expanded);
						setMobile(state.mobile);
					}}
				>
					<Sidebar.Head>
						<Sidebar.Head.Logo>
							<ExcludeSquare size={32} color='#0074a6' weight='duotone' />
						</Sidebar.Head.Logo>
						<Sidebar.Head.Title>Almond-UI</Sidebar.Head.Title>
						<Sidebar.Head.Toggle />
					</Sidebar.Head>

					<Sidebar.Nav>
						<Sidebar.Nav.Section>
							<Sidebar.Nav.Section.Item
								icon={<RocketLaunch />}
								label='Dashboard'
								href='#'
								active
							/>
						</Sidebar.Nav.Section>

						<Sidebar.Nav.Section>
							<Sidebar.Nav.Section.Title>Management</Sidebar.Nav.Section.Title>
							<Sidebar.Nav.Section.Item
								icon={<Briefcase />}
								label='Clients'
								href='#'
							/>
							<Sidebar.Nav.Section.Item
								icon={<Users />}
								label='Users'
								as='button'
							>
								<Sidebar.Nav.Section isChild>
									<Sidebar.Nav.Section.Item
										icon={<span className='w-1 h-1 rounded bg-transparent' />}
										label='List all'
										href='#'
									/>
									<Sidebar.Nav.Section.Item
										icon={<span className='w-1 h-1 rounded bg-transparent' />}
										label='Add new'
										href='#'
									/>
									<Sidebar.Nav.Section.Item
										icon={<span className='w-1 h-1 rounded bg-transparent' />}
										label='Archived'
										href='#'
									/>
								</Sidebar.Nav.Section>
							</Sidebar.Nav.Section.Item>
							<Sidebar.Nav.Section.Item
								icon={<Shield />}
								label='Roles'
								href='#'
							/>
							<Sidebar.Nav.Section.Item
								icon={<Key />}
								label='Permissions'
								href='#'
							/>
							<Sidebar.Nav.Section.Item
								icon={<Sliders />}
								label='Settings'
								href='#'
							/>
						</Sidebar.Nav.Section>

						<Sidebar.Nav.Section>
							<Sidebar.Nav.Section.Title>Support</Sidebar.Nav.Section.Title>
							<Sidebar.Nav.Section.Item
								icon={<EnvelopeOpen />}
								label='Tickets'
								href='#'
							/>
							<Sidebar.Separator />
							<Sidebar.Nav.Section.Item
								icon={<Book />}
								label='Documentation'
								href='#'
							/>
						</Sidebar.Nav.Section>
					</Sidebar.Nav>

					<Sidebar.Footer>
						<div className='flex flex-col justify-center items-center text-sm'>
							<span className='font-semibold'>Almond-UI</span>
							<span>version 0.0.1</span>
						</div>
					</Sidebar.Footer>
				</Sidebar>

				<main
					className={`transition-all transform container duration-100 text-slate-700 flex w-full min-h-screen flex-col items-center ${
						expanded ? 'md:ml-64' : 'md:ml-20'
					}`}
				>
					{mobile && (
						<Overlay
							blur='none'
							onClick={() => {
								sidebar.toggleMobile();
							}}
							className='md:hidden z-40'
						/>
					)}

					<div className='w-full h-full p-8'>{children}</div>
				</main>
			</div>
		</div>
	);
}
