'use client';

import React, { Fragment, useEffect, useState } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { localSettingAtom } from '@/jotai/store';
import { getLast24Hour } from '@/lib/time-helper';
import { cn, fetcher } from '@/lib/utils';
import { heimdall } from '@heimdall-logs/tracker';
import { TrackClick } from '@heimdall-logs/tracker/react';
import { GetInsightResponse } from '@heimdall-logs/types';
import { env } from 'env.mjs';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { useAtom } from 'jotai';
import {
	Activity,
	BarChart,
	Eye,
	Laptop2,
	LineChart,
	TimerIcon,
	UserIcon,
	Users2,
} from 'lucide-react';
import { MoreHorizontal } from 'lucide-react';
import useSWR from 'swr';

import { AddTracker } from '../add-tracker';
import { Label } from '../ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { CalendarDateRangePicker, DatePicker } from './date-picker';
import Events from './events';
import { InsightCard } from './insight/card';
import LocationMap from './insight/location-map';
import { InsightTables } from './insight/tables';
import { Graph } from './insight/visitor-graph';
import { Filter, FilterProp, TimeRange } from './type';

export const Dashboard = ({
	website,
	isPublic,
	token,
	showSetup,
}: {
	website: { id: string; url: string; title: string | null };
	isPublic: boolean;
	showSetup?: boolean;
	token: string;
}) => {
	const [timeRange, setTimeRange] = useState<TimeRange>({
		startDate: getLast24Hour(),
		endDate: new Date(),
		stringValue: '24hr',
	});
	const [customTime, setCustomTime] = useState(false);
	const [filters, setFilters] = useState<Filter[]>([]);
	const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
	const [setting] = useAtom(localSettingAtom);
	const url = env.NEXT_PUBLIC_API_URL;
	const { data, isLoading } = useSWR<GetInsightResponse>(
		`${url}?websiteId=${
			website.id
		}&startDate=${timeRange.startDate.toUTCString()}&endDate=${timeRange.endDate.toUTCString()}&timeZone=${
			setting.timezone ?? timezone
		}&filter=${JSON.stringify(filters)}&token=${token}`,
		fetcher
	);

	console.log('Class: , Function: Dashboard, Line 71 data():', data);

	function addFilter(f: Filter) {
		setFilters([...filters, f]);
	}

	function clearFilter(key: string) {
		setFilters((prev) => prev.filter((f) => f.key !== key));
	}

	const isFilterActive = (key: string) =>
		filters.some((filter) => filter.key === key);

	const filter: FilterProp = {
		addFilter,
		clearFilter,
		isFilterActive,
	};

	const [curTableTab, setCurTableTab] = useState('');
	const [viCardSwitch, setViCardSwitch] = useState<
		'New Visitors' | 'Unique Visitors' | 'Retaining Visitors'
	>('Unique Visitors');
	const [isBar, setIsBar] = useState(setting.graph === 'bar-graph');
	useEffect(() => {
		if (setting) {
			setIsBar(setting.graph === 'bar-graph');
		}
	}, [setting]);

	return (
		<main>
			<AddTracker websiteId={website.id} show={showSetup ?? false} />
			<LayoutGroup>
				<div
					className={cn(
						'w-full space-y-4 transition-all duration-700 dark:text-white/80 scrollbar-hide'
					)}
				>
					<Tabs defaultValue='insights' className='space-y-4'>
						{!isPublic ? (
							<div className=' flex items-center justify-between'>
								<TabsList>
									<TabsTrigger
										value='insights'
										// className='dark:data-[state=active]:text-emphasis data-[state=active]:text-emphasis'
									>
										Insights
									</TabsTrigger>
									<TabsTrigger
										value='events'
										// className=' dark:data-[state=active]:text-emphasis data-[state=active]:text-emphasis'
										onClick={() =>
											heimdall.track('events-tab-clicked', {
												websiteId: website.id,
											})
										}
									>
										Events
									</TabsTrigger>
								</TabsList>
								{/*<div>*/}
								{/*	{data && (*/}
								{/*		<Celebrate*/}
								{/*			pageview={data.insight.totalPageViews}*/}
								{/*			uniqVisitor={data.insight.uniqueVisitors}*/}
								{/*			websiteId={website.id}*/}
								{/*			time={timeRange.stringValue}*/}
								{/*			title={website.title ?? undefined}*/}
								{/*		/>*/}
								{/*	)}*/}
								{/*</div>*/}
							</div>
						) : null}
						<div className=' flex justify-between'>
							<div
								className=' flex gap-2 items-center'
								onClick={() =>
									heimdall.track('date-picker-clicked', {
										websiteId: website.id,
									})
								}
							>
								<DatePicker
									setTimeRange={setTimeRange}
									setCustomTime={setCustomTime}
									timeRange={timeRange}
									customTime={customTime}
								/>
							</div>
							<div className=' flex flex-col items-end'>
								<div className=' flex gap-1 items-center'>
									<div className=' w-2.5 h-2.5 bg-gradient-to-tr from-lime-500 to-lime-700 animate-pulse rounded-full'></div>
									<p className=' text-sm bg-gradient-to-tr from-lime-600 to-lime-800 text-transparent bg-clip-text font-medium'>
										{data ? data.data.onlineVisitors : 0} Online
									</p>
								</div>
							</div>
						</div>
						<AnimatePresence>
							{customTime && (
								<motion.div
									layout
									initial={{ opacity: 0, y: -20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{
										type: 'keyframes',
										duration: 0.5,
										ease: 'easeInOut',
									}}
								>
									<CalendarDateRangePicker
										setDate={setTimeRange}
										date={{
											from: timeRange.startDate,
											to: timeRange.endDate,
										}}
									/>
								</motion.div>
							)}
						</AnimatePresence>
						<AnimatePresence>
							<motion.div layout>
								<TabsContent value='insights' className='space-y-4'>
									<div className='grid gap-4 md:grid-cols-2 grid-cols-2 lg:grid-cols-4'>
										<InsightCard
											title={viCardSwitch}
											Icon={UserIcon}
											data={
												data
													? viCardSwitch === 'New Visitors'
														? data.insight.newVisitors
														: viCardSwitch === 'Unique Visitors'
														? data.insight.uniqueVisitors
														: viCardSwitch === 'Retaining Visitors'
														? data.insight.returningVisitor
														: { change: 0, current: 0 }
													: { change: 0, current: 0 }
											}
											isLoading={isLoading}
											tooltip={
												viCardSwitch === 'New Visitors'
													? 'The number of people visiting your website for the first time.'
													: viCardSwitch === 'Unique Visitors'
													? 'The total number of different people who visited your website.'
													: viCardSwitch === 'Retaining Visitors'
													? 'The number of visitors who returned to your website multiple times.'
													: ''
											}
											BottomChildren={() => (
												<div className=' cursor-pointer'>
													<div>
														<Popover>
															<PopoverTrigger asChild>
																<MoreHorizontal className='h-4 w-4' />
															</PopoverTrigger>
															<PopoverContent className='w-48 '>
																<RadioGroup
																	onValueChange={(
																		v:
																			| 'New Visitors'
																			| 'Unique Visitors'
																			| 'Retaining Visitors'
																	) => {
																		setViCardSwitch(v);
																		heimdall.track('visitor-card-switched', {
																			websiteId: website.id,
																			switch: viCardSwitch,
																		});
																	}}
																	defaultValue={viCardSwitch}
																	className='grid gap-4'
																>
																	<div className='flex items-center space-x-2'>
																		<RadioGroupItem
																			value='Unique Visitors'
																			id='r2'
																		/>
																		<Label htmlFor='r2'>Unique Visitors</Label>
																	</div>

																	<div className='flex items-center space-x-2'>
																		<RadioGroupItem
																			value='New Visitors'
																			id='r1'
																		/>
																		<Label htmlFor='r1'>New Visitors</Label>
																	</div>

																	<div className='flex items-center space-x-2'>
																		<RadioGroupItem
																			value='Retaining Visitors'
																			id='r3'
																		/>
																		<Label htmlFor='r3'>
																			Retaining Visitors
																		</Label>
																	</div>
																</RadioGroup>
															</PopoverContent>
														</Popover>
													</div>
												</div>
											)}
										/>
										<InsightCard
											title={'Views'}
											Icon={Eye}
											data={
												data
													? data.insight.totalPageViews
													: { change: 0, current: 0 }
											}
											isLoading={isLoading}
											tooltip='The total number of pages viewed. Repeated views of a single page are counted.'
										/>
										<InsightCard
											title={'Average Time'}
											Icon={TimerIcon}
											data={
												data
													? data.insight.averageTime
													: { change: 0, current: 0 }
											}
											valuePrefix={''}
											isLoading={isLoading}
											tooltip='The average amount of time visitors spend on your website.'
										/>
										<InsightCard
											title={'Bounce Rate'}
											valuePrefix={'%'}
											Icon={Activity}
											negative
											data={
												data
													? data.insight.bounceRate
													: { change: 0, current: 0 }
											}
											isLoading={isLoading}
											tooltip=' The percentage of visitors who quickly exit your website without exploring further.'
										/>
									</div>
									<div className='grid gap-4 min-h-max md:grid-cols-2 lg:grid-cols-7 grid-cols-1'>
										<Card className='md:col-span-4'>
											{curTableTab === 'locations' ? (
												<Fragment>
													<CardHeader className=' flex flex-row gap-2 items-end'>
														<CardTitle className='text-base py-4'>
															Visitors Map
														</CardTitle>
													</CardHeader>
													<CardContent
														className={cn(
															curTableTab === 'locations' && 'zoom-in-95'
														)}
													>
														<LocationMap
															data={data ? data.data.locations.country : []}
														/>
													</CardContent>
												</Fragment>
											) : (
												<Tabs defaultValue='visitors' className=''>
													<CardHeader className=' flex flex-row justify-between items-center'>
														<CardTitle className='text-base'>
															<TabsList className=''>
																<TabsTrigger value='visitors'>
																	Visitors
																</TabsTrigger>
																<TabsTrigger value='sessions'>
																	Sessions
																</TabsTrigger>
															</TabsList>
														</CardTitle>
														<div className=' flex items-center gap-2'>
															<Tabs
																defaultValue={
																	isBar ? 'bar-graph' : 'line-graph'
																}
																onValueChange={(v) =>
																	setIsBar(v === 'bar-graph')
																}
																value={isBar ? 'bar-graph' : 'line-graph'}
															>
																<TabsList className=''>
																	<TabsTrigger value='line-graph'>
																		<LineChart size={18} />
																	</TabsTrigger>
																	<TabsTrigger value='bar-graph'>
																		<BarChart size={18} />
																	</TabsTrigger>
																</TabsList>
															</Tabs>
														</div>
													</CardHeader>
													<CardContent>
														<div className='pl-2'>
															<TabsContent
																value='visitors'
																className='rounded-lg'
															>
																<Graph
																	bar={isBar}
																	data={
																		data ? data.graph.uniqueVisitorsByDate : []
																	}
																	name='Visitors'
																	Icon={Users2}
																	isLoading={isLoading}
																	setTimeRange={setTimeRange}
																/>
															</TabsContent>
															<TabsContent value='sessions' className=''>
																<Graph
																	data={
																		data ? data.graph.uniqueSessionByDate : []
																	}
																	name='Sessions'
																	Icon={Laptop2}
																	isLoading={isLoading}
																	setTimeRange={setTimeRange}
																	bar={isBar}
																/>
															</TabsContent>
														</div>
													</CardContent>
												</Tabs>
											)}
										</Card>
										<InsightTables
											isLoading={isLoading}
											filter={filter}
											data={data}
											websiteUrl={website.url}
											setCurrentTableTab={setCurTableTab}
										/>
									</div>
								</TabsContent>

								<TrackClick
									name='event-visited'
									payload={{
										websiteId: website.id,
									}}
								>
									<TabsContent value='events'>
										<Events
											startDate={timeRange.startDate}
											endDate={timeRange.endDate}
											websiteId={website.id}
										/>
									</TabsContent>
								</TrackClick>
							</motion.div>
						</AnimatePresence>
					</Tabs>
				</div>
			</LayoutGroup>
		</main>
	);
};
