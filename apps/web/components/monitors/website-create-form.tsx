'use client';

import { useRouter } from 'next/navigation';

import { useEffect, useTransition } from 'react';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { websiteFormSchema } from '@/lib/validations/website';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Icons } from '../icons';

export const WebsiteForm = () => {
	const [isLoading, startTransition] = useTransition();
	const { refresh } = useRouter();
	const form = useForm<z.infer<typeof websiteFormSchema>>({
		resolver: zodResolver(websiteFormSchema),
		defaultValues: {
			url: '',
			id: '',
		},
	});

	const onSubmit = (values: z.infer<typeof websiteFormSchema>) => {
		startTransition(async () => {
			try {
				const res = await fetch('/api/website', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(values),
				});
				if (!res.ok) {
					if (res.status === 409) {
						toast({
							title: 'Uh oh!',
							description:
								'This website already exists. Please try again with a different website ID or Website URL.',
							variant: 'destructive',
						});
					}
					toast({
						title: 'Uh oh!',
						description:
							'This website already exists. Please try again with a different website ID or Website URL.',
						variant: 'destructive',
					});
				}
				refresh();
			} catch (e) {
				toast({
					title: 'Uh oh!',
					description: `An error occurred: ${e.message}`,
					variant: 'destructive',
				});
			}
		});
	};

	const fieldValue = form.watch('url');

	useEffect(() => {
		let url = fieldValue.replace('https://', '').replace('https://', '');
		const allCom = fieldValue.split('.');
		url = url.replace(`.${allCom[allCom.length - 1]}`, '').replace(/\./g, '_');

		form.setValue('id', url);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fieldValue]);
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit, (e) => {
					return toast({
						title: 'Uh oh! ',
						description:
							e.root?.message ??
							e.id?.message ??
							e.title?.message ??
							e.url?.message,
						variant: 'destructive',
					});
				})}
				className='space-y-4'
			>
				<FormField
					control={form.control}
					name='title'
					render={({ field }) => (
						<FormItem className=''>
							<FormLabel>MonitorCardDetails Title</FormLabel>
							{/* <FormMessage /> */}
							<FormControl>
								<Input
									placeholder='Your MonitorCardDetails Title'
									{...field}
									className=' '
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='url'
					render={({ field }) => (
						<FormItem className=''>
							<FormLabel>MonitorCardDetails URL</FormLabel>
							{/* <FormMessage /> */}
							<FormControl>
								<Input
									placeholder='https://example.com'
									{...field}
									className=' '
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='id'
					render={({ field }) => (
						<FormItem className=''>
							<FormLabel>Your website @heimdall</FormLabel>
							{/* <FormMessage /> */}
							<FormControl>
								<div className='flex items-center rounded-md  border border-input px-1 focus-within:outline-none'>
									<span className=' flex h-10 items-center border-r px-2 text-sm'>
										heimdall.com/
									</span>
									<input
										placeholder='site_name'
										{...field}
										className='flex h-10 rounded-md border border-none bg-transparent p-2 text-sm outline-none ring-offset-background file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50'
									/>
								</div>
							</FormControl>
						</FormItem>
					)}
				/>
				<Button type='submit' disabled={isLoading}>
					{isLoading && <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />}
					Submit Task
				</Button>
			</form>
		</Form>
	);
};
