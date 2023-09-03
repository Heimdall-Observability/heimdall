import Link from 'next/link';

import ExpandingArrow from '@/components/expanding-arrow';

export default async function HomePage() {
	return (
		<>
			<div
				aria-hidden
				className='pointer-events-none absolute left-1/2 top-0 z-10 h-[400px] w-[1000px] -translate-x-1/2 -translate-y-1/2 opacity-[0.15]'
				style={{ backgroundImage: 'radial-gradient(#A4A4A3, transparent 50%)' }}
			/>
			<svg
				className='pointer-events-none absolute inset-0 h-full w-full stroke-gray-200 opacity-50 [mask-image:radial-gradient(100%_100%_at_top_center,white,transparent)]'
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
				href='/login'
				className='group mt-20 flex space-x-1 rounded-full text-primary hover:text-primary/90 border border-primary/50 bg-primary/10 px-10 pr-12 py-2 text-sm font-medium ring-0 transition-all hover:border-primary/80 hover:bg-primary/20 sm:mt-0'
			>
				<p>Get started here</p>
				<ExpandingArrow />
			</Link>
			<h1 className='bg-gradient-to-br from-black via-[#171717] to-[#0074a6] text-heading bg-clip-text pb-8 pt-4 text-center text-2xl font-semibold text-transparent md:text-4xl'>
				Open Source Monitoring, Privacy Focused.
			</h1>
			<h1 className='bg-gradient-to-br font-heading font-semibold md:text-4xl xl:text-5xl 2xl:text-6xl lg:text-5xl text-4xl from-[#0074a6] to-gray-200 bg-clip-text uppercase text-transparent dark:from-gray-200 dark:to-[#0074a6]'>
				Web Analytics
			</h1>
		</>
	);
}
