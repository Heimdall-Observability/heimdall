import Link from 'next/link';

import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { toast } from '@/components/ui/use-toast';
import { siteConfig } from '@/config/site';
import { websiteDeleteModalAtom } from '@/jotai/store';
import { websiteFormSchema } from '@/lib/validations/website';
import { Website } from '@heimdall-logs/types/models';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { ExternalLink, Info, Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import { z } from 'zod';

import { CopyToClipboard } from '../copy-to-clipboard';
import { Icons } from '../icons';

export const EditWebsiteForm = ({
	data,
	isOpen,
	setIsOpen,
}: {
	data?: Website;
	isOpen: boolean;
	setIsOpen: (state: boolean) => void;
}) => {
	const [isLoading, setIsLoading] = useState(false);
	const [, setDeleteAlert] = useAtom(websiteDeleteModalAtom);
	const form = useForm<z.infer<typeof websiteFormSchema>>({
		resolver: zodResolver(websiteFormSchema),
	});

	async function onSubmit(values: z.infer<typeof websiteFormSchema>) {
		setIsLoading(true);
		try {
			const res = await fetch(`/api/website/${data?.id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(values),
			});
			if (!res.ok) {
				toast({
					title: 'Uh oh!',
					description:
						'Error updating website. Please try again later or contact support if the issue persists.',
					variant: 'destructive',
				});
			}
			toast({
				title: 'Success!',
				description: 'Website updated successfully.',
			});
		} catch {
			toast({
				title: 'Uh oh!',
				description:
					'Error updating website. Please try again later or contact support if the issue persists.',
				variant: 'destructive',
			});
		}
		setIsLoading(false);
		setIsOpen(false);
	}

	const modalVariants = {
		hidden: {
			opacity: 0,
			scale: 0.8,
		},
		visible: {
			opacity: 1,
			y: 0,
			scale: 1,
		},
	};
	useEffect(() => {
		if (data) {
			const { setValue } = form;
			setValue('id', data.id);
			setValue('title', data.title ?? '');
			setValue('url', data.url);
			setValue('public', data.public);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);
	return (
		<AnimatePresence>
			{isOpen ? (
				<Modal
					isOpen={isOpen}
					onRequestClose={() => setIsOpen(false)}
					ariaHideApp
					shouldCloseOnEsc
					shouldCloseOnOverlayClick
					className='font-jost mx-4 flex h-full items-center justify-center border-none outline-none backdrop:blur-xl'
					style={{
						overlay: {
							backgroundColor: 'rgba(0, 0, 0, 0.8)',
							backdropFilter: 'blur(5px)',
						},
						content: {},
					}}
				>
					<motion.div
						variants={modalVariants} // Apply the animation variants
						initial='hidden' // Set the initial animation state
						animate='visible' // Set the target animation
						exit={{
							opacity: 0,
							transition: { duration: 0.1 },
						}} // Exit gracefully
						transition={{
							type: 'keyframes',
							delay: 0.1,
							ease: 'easeInOut',
							duration: 0.3,
						}}
						className='relative flex w-11/12 flex-col justify-center  rounded-md border bg-gradient-to-tr from-gray-100 to-gray-200 px-8 pb-10 pt-4 animate-in dark:border-stone-800 dark:from-black dark:to-stone-900/20 md:w-3/12'
					>
						<div className=' ml-auto'>
							<Button
								variant='outline'
								className=''
								onClick={() => {
									setIsOpen(false);
									setDeleteAlert(true);
								}}
							>
								<Trash2 size={16} className=' text-red-500' />
							</Button>
						</div>
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit, (e) => {
									return toast({
										title: 'Uh oh! ',
										description:
											e.root?.message ?? e.title?.message ?? e.url?.message,
										variant: 'destructive',
									});
								})}
								className='space-y-2 '
							>
								<FormField
									control={form.control}
									name='title'
									render={({ field }) => (
										<FormItem className=' w-full'>
											<FormLabel>Website Title</FormLabel>
											<FormControl>
												<Input placeholder='title' {...field} className=' ' />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='url'
									render={({ field }) => (
										<FormItem className=' w-full'>
											<FormLabel>Website URL</FormLabel>
											<FormControl>
												<Input
													placeholder='https://example.com'
													{...field}
													className=''
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='id'
									render={({ field }) => (
										<FormItem className=' w-full grow'>
											<FormLabel>Your website @heimdall</FormLabel>
											{/* <FormMessage /> */}
											<FormControl>
												<div className='flex items-center rounded-md  border border-input px-1 focus-within:outline-none'>
													<span className='flex h-10 items-center border-r px-2 text-sm dark:border-stone-800'>
														heimdall.francismasha.com/
													</span>
													<input
														placeholder='site_name'
														{...field}
														className='flex h-10 w-full rounded-md border border-none bg-transparent p-2 text-sm outline-none ring-offset-background file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50'
													/>
												</div>
											</FormControl>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='public'
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												<div className=' flex items-start gap-1'>
													Public Page
													<TooltipProvider>
														<Tooltip>
															<TooltipTrigger>
																<Info size={12} />
															</TooltipTrigger>
															<TooltipContent>
																<p className=' text-sm'>
																	Public page will make your website public and
																	accessible to anyone with the link.
																</p>
															</TooltipContent>
														</Tooltip>
													</TooltipProvider>
												</div>
											</FormLabel>
											{field.value ? (
												<div className=' flex items-center justify-between'>
													<Link
														href={`${siteConfig.url}/${data?.id}`}
														target='_blank'
														className=' flex items-center gap-2 decoration-blue-500 hover:underline'
													>
														<p className=' text-sm text-blue-600'>
															{`${siteConfig.url}/`}
															<span className=''>{data?.id}</span>{' '}
														</p>

														<ExternalLink
															size={14}
															className=' cursor-pointer text-blue-500'
														/>
													</Link>
													<CopyToClipboard
														text={`${siteConfig.url}/${data?.id}`}
														className='h-4 w-4'
													/>
												</div>
											) : null}
											<FormControl className=''>
												<Select
													onValueChange={(e) => field.onChange(e === 'on')}
													value={field.value ? 'on' : 'off'}
												>
													<SelectTrigger>
														<SelectValue />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value='off'>Off</SelectItem>
														<SelectItem value='on'>On</SelectItem>
													</SelectContent>
												</Select>
											</FormControl>
										</FormItem>
									)}
								/>

								<div className=' space-x-2'>
									<Button type='submit' disabled={isLoading}>
										{isLoading ? (
											<Icons.spinner className='h-4 w-4 animate-spin' />
										) : (
											'Update Website'
										)}
									</Button>
									<Button
										type='button'
										variant='outline'
										className=''
										onClick={() => setIsOpen(false)}
									>
										Cancel
									</Button>
								</div>
							</form>
						</Form>
					</motion.div>
				</Modal>
			) : null}
		</AnimatePresence>
	);
};
