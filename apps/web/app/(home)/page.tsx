import Link from 'next/link';

import ExpandingArrow from '@/components/expanding-arrow';
import { H3, H5 } from '@/components/typography';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const features = [
	{
		title: '93 regions',
		description:
			'Monitor your API from anywhere in the world. From all AWS regions and Vercel edge locations.',
	},
	{
		title: 'Custom timeouts',
		description:
			'Set custom timeouts for your API. If your API takes longer than the timeout to respond, it will be marked as failed.',
	},
	{
		title: 'Detect Problems early',
		description:
			'Define thresholds to get notified early in case your API performance degrades.',
	},
];

export default async function HomePage() {
	return (
		<>
			<section className='space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32'>
				<div className='container flex max-w-[64rem] flex-col items-center gap-4 text-center'>
					<div
						aria-hidden
						className='pointer-events-none absolute left-1/2 top-0 z-10 h-[400px] w-[1000px] -translate-x-1/2 -translate-y-1/2 opacity-[0.15]'
						style={{
							backgroundImage: 'radial-gradient(#A4A4A3, transparent 50%)',
						}}
					/>
					<svg
						className='pointer-events-none absolute inset-0 h-full z-[-1] w-full stroke-gray-200 opacity-50 [mask-image:radial-gradient(100%_100%_at_top_center,white,transparent)]'
						aria-hidden
					>
						<defs>
							<pattern
								id='83fd4e5a-9d52-42fc-97b6-718e5d7ee527'
								width={100}
								height={100}
								x='50%'
								y={-1}
								patternUnits='userSpaceOnUse'
							>
								<path d='M100 200V.5M.5 .5H200' fill='none' />
							</pattern>
						</defs>
						<svg x='50%' y={-1} className='overflow-visible fill-gray-50'>
							<path
								d='M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z'
								strokeWidth={0.5}
							/>
						</svg>
						<rect
							width='100%'
							height='100%'
							strokeWidth={0}
							fill='url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)'
						/>
					</svg>
					<Link
						href='/playground'
						className='rounded-2xl bg-primary/10 px-4 py-1.5 pr-8 text-sm font-medium group flex space-x-1 hover:text-primary/90 text-primary transition-all ring-0 sm:mt-0'
						// className='group px-4 py-1.5 pr-8 mt-20 flex space-x-1 rounded-full text-primary hover:text-primary/90 border border-primary/50 bg-primary/10 text-sm font-medium ring-0 transition-all hover:border-primary/80 hover:bg-primary/20 sm:mt-0'
					>
						<p>Check our live demo</p>
						<ExpandingArrow />
					</Link>
					<h1 className='font-heading text-2xl sm:text-2xl md:text-4xl lg:text-6xl'>
						Web analytics to grow smarter
					</h1>
					<p className='max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8'>
						Heimdall is a privacy-focused web analytics tool that helps you
						understand your visitors and grow your business with web and API's
						performance.
					</p>
					<div className='space-x-4 mt-8'>
						<Link
							href={'/login'}
							className={cn(
								buttonVariants({
									size: 'lg',
								})
							)}
						>
							{'Get Started'}
						</Link>
						<Link
							href='/play'
							className={cn(
								buttonVariants({
									variant: 'outline',
									size: 'lg',
								})
							)}
						>
							Playground
						</Link>
					</div>
				</div>
			</section>

			<section
				id='features'
				className='container space-y-6 bg-white/10 py-8 lg:rounded-xl bg-slate-50 dark:bg-transparent lg:py-24'
			>
				<div className='container flex max-w-[64rem] flex-col items-center gap-4 text-center'>
					<div className='bg-primary/10 text-primary rounded-2xl px-4 py-1.5 text-sm font-medium'>
						Monitoring and Reporting
					</div>
					<H3>
						Gain a global perspective on your API's performance with real-time
						monitoring
					</H3>
					<p className='max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8'>
						Synthetic monitoring for your APIs. Check the latency of your APIs
						from around the world.
					</p>
				</div>
				<div className='mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3'>
					{features.map((feature) => (
						<div
							key={feature.title}
							className='bg-background relative overflow-hidden rounded-lg border p-2'
						>
							<div className='flex h-[140px] flex-col justify-between rounded-md p-6'>
								<div className='space-y-2'>
									<h3 className='font-bold'>{feature.title}</h3>
									<p className='text-muted-foreground text-sm'>
										{feature.description}
									</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</section>
		</>
	);
}
