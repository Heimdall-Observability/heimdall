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
		<Card className='relative p-0'>
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
					<div className='text-2xl xl:text-3xl font-bold'>{`${
						data.current ? data.current.toLocaleString() : 0
					} ${valuePrefix ?? ''}`}</div>
					<div className=' flex justify-between items-center'>
						{data.change ? (
							<div className=' flex text-xs xl:text-sm items-center'>
								{increase ? (
									<ArrowUpIcon className='text-green-500 w-4 xl:w-5' />
								) : (
									<ArrowDown className='text-red-500 w-4 xl:w-5' />
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
						<div className='text-2xl xl:text-3xl font-bold'>
							<Skeleton className='w-20 h-6 rounded-md bg-gray-200 dark:bg-gray-800' />
						</div>
						<div className=' flex justify-between items-center'>
							<div className=' flex text-xs xl:text-sm items-center'>
								<Skeleton className='w-9 h-4 rounded-md bg-gray-200 dark:bg-gray-800' />
							</div>
							{BottomChildren ? <BottomChildren /> : null}
						</div>
					</div>
				</CardContent>
			)}
		</Card>
	);
}
