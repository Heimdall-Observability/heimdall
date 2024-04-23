import React from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { ArrowDown, ArrowUpIcon, LucideIcon } from 'lucide-react';

export type InsightType = {
	title: string;
	Icon: LucideIcon;
	data: {
		current: number | string;
		change: number;
	};
	valuePrefix?: string;
	changePrefix?: string;
	BottomChildren?: () => React.ReactNode | null;
	negative?: boolean;
	isLoading?: boolean;
	tooltip?: string;
};

export function InsightCard({
	title,
	Icon,
	data,
	valuePrefix,
	BottomChildren,
	isLoading,
	negative,
	changePrefix,
	tooltip,
}: InsightType) {
	const increase = negative ? data.change <= 0 : data.change >= 0;
	return (
		<Card className='relative p-0 shadow-none'>
			<CardHeader className='flex flex-row items-center justify-between space-y-0 p-4 pb-2'>
				<CardTitle className='text-sm font-medium'>{title}</CardTitle>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild className=' cursor-pointer'>
							<Icon className='h-5 w-5' />
						</TooltipTrigger>
						<TooltipContent>
							<p>{tooltip}</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</CardHeader>
			{!isLoading && data ? (
				<CardContent className='px-4'>
					<div className='text-2xl font-semibold ordinal slashed-zero tabular-nums xl:text-3xl'>{`${
						data.current ? data.current.toLocaleString() : 0
					} ${valuePrefix ?? ''}`}</div>
					<div className=' flex items-center justify-between'>
						{data.change ? (
							<div className=' flex items-center text-xs xl:text-sm'>
								{increase ? (
									<ArrowUpIcon className='w-4 text-green-500 xl:w-5' />
								) : (
									<ArrowDown className='w-4 text-red-500 xl:w-5' />
								)}
								<div>
									{' '}
									{changePrefix ?? ''}
									{data.change && `${data.change.toLocaleString()} %`}{' '}
								</div>
							</div>
						) : (
							<div>-</div>
						)}
						{/* @ts-ignore */}
						{BottomChildren ? <BottomChildren /> : null}
					</div>
				</CardContent>
			) : (
				<CardContent className='px-4'>
					<div className='flex flex-col justify-center gap-5'>
						<div className='text-2xl font-bold xl:text-3xl'>
							<Skeleton className='h-6 w-20 rounded-md bg-gray-200 dark:bg-muted/50' />
						</div>
						<div className=' flex items-center justify-between'>
							<div className=' flex items-center text-xs xl:text-sm'>
								<Skeleton className='h-4 w-9 rounded-md bg-gray-200 dark:bg-muted/50' />
							</div>
							{BottomChildren ? <BottomChildren /> : null}
						</div>
					</div>
				</CardContent>
			)}
		</Card>
	);
}
