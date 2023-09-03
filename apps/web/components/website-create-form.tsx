'use client';

import { useRouter } from 'next/navigation';

import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { websiteFormAtom } from '@/jotai/store';
import { websiteFormSchema } from '@/lib/validations/website';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import { z } from 'zod';

import { Icons } from './icons';

export const WebsiteForm = () => {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();
	const form = useForm<z.infer<typeof websiteFormSchema>>({
		resolver: zodResolver(websiteFormSchema),
		defaultValues: {
			url: '',
			id: '',
		},
	});

	async function onSubmit(values: z.infer<typeof websiteFormSchema>) {
		setIsLoading(true);
		const res = await fetch('/api/website', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(values),
		});
		if (!res.ok) {
			setIsLoading(false);
			if (res.status === 409) {
				return toast({
					title: 'Uh oh!',
					description:
						'This website already exists. Please try again with a different website ID or Website URL.',
					variant: 'destructive',
				});
			}
			return toast({
				title: 'Uh oh!',
				description:
					'This website already exists. Please try again with a different website ID or Website URL.',
				variant: 'destructive',
			});
		}
		setIsLoading(false);
		router.refresh();
	}

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
							<FormLabel>Website Title</FormLabel>
							{/* <FormMessage /> */}
							<FormControl>
								<Input
									placeholder='Your Website Title'
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
							<FormLabel>Website URL</FormLabel>
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
								<div className='border-input flex items-center  rounded-md border px-1 focus-within:outline-none'>
									<span className=' flex h-10 items-center border-r px-2 text-sm'>
										heimdall.com/
									</span>
									<input
										placeholder='site_name'
										{...field}
										className='ring-offset-background placeholder:text-muted-foreground flex h-10 rounded-md border border-none bg-transparent p-2 text-sm outline-none file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50'
									/>
								</div>
							</FormControl>
						</FormItem>
					)}
				/>
				<Button type='submit' disabled={isLoading}>
					{isLoading ? (
						<Icons.spinner className='h-4 w-4 animate-spin' />
					) : (
						'Add Website'
					)}
				</Button>
			</form>
		</Form>
	);
};
