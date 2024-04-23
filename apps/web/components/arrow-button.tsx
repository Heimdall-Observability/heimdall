'use client';

import Link, { type LinkProps } from 'next/link';

import { ComponentProps, ReactNode } from 'react';

import { ArrowIcon } from '@/components/icons';
import { ElementState, useElementState } from '@/hooks/use-element-state';
import { cn } from '@/lib/utils';
import { Variant, motion, useReducedMotion } from 'framer-motion';

type ArrowIconProps = ComponentProps<typeof ArrowIcon>;

const MotionLink = motion(Link);

type ArrowLinkProps = {
	direction?: ArrowIconProps['direction'];
} & (
	| { href?: string; to?: never }
	| {
			href?: never;
			to: LinkProps['href'];
	  }
) &
	ArrowButtonBaseProps & { prefetch?: 'intent' | 'render' | 'none' };

const arrowVariants: Record<
	ArrowIconProps['direction'],
	Record<ElementState, Variant>
> = {
	down: {
		initial: { y: 0 },
		hover: { y: 4 },
		focus: {
			y: [0, 4, 0],
			transition: { repeat: Infinity },
		},
		active: { y: 12 },
	},
	up: {
		initial: { y: 0 },
		hover: { y: -4 },
		focus: {
			y: [0, -4, 0],
			transition: { repeat: Infinity },
		},
		active: { y: -12 },
	},
	left: {
		initial: { x: 0 },
		hover: { x: -4 },
		focus: {
			x: [0, -4, 0],
			transition: { repeat: Infinity },
		},
		active: { x: -12 },
	},
	right: {
		initial: { x: 0 },
		hover: { x: 4 },
		focus: {
			x: [0, 4, 0],
			transition: { repeat: Infinity },
		},
		active: { x: 12 },
	},
	'top-right': {
		initial: { x: 0, y: 0 },
		hover: { x: 4, y: -4 },
		focus: {
			x: [0, 4, 0],
			y: [0, -4, 0],
			transition: { repeat: Infinity },
		},
		active: { x: 12, y: -12 },
	},
};

type ArrowButtonBaseProps = {
	direction?: ArrowIconProps['direction'];
	children?: ReactNode | ReactNode[];
	className?: string;
	textSize?: 'small' | 'medium';
};

function BackLink({
	to,
	className,
	children,
}: {
	to: LinkProps['href'];
} & Pick<ArrowLinkProps, 'className' | 'children'>) {
	const [ref, state] = useElementState();
	const shouldReduceMotion = useReducedMotion();
	return (
		<MotionLink
			href={to}
			className={cn(
				'flex items-center space-x-1 text-muted-foreground focus:outline-none',
				className
			)}
			ref={ref}
			animate={state}
			transition={shouldReduceMotion ? { duration: 0 } : {}}
		>
			<motion.span
				variants={shouldReduceMotion ? {} : arrowVariants.left}
				transition={shouldReduceMotion ? { duration: 0 } : {}}
			>
				<ArrowIcon direction='left' />
			</motion.span>
			<span className='text-sm'>{children}</span>
		</MotionLink>
	);
}

function NextLink({
	to,
	className,
	children,
}: {
	to: LinkProps['href'];
} & Pick<ArrowLinkProps, 'className' | 'children'>) {
	const [ref, state] = useElementState();
	const shouldReduceMotion = useReducedMotion();
	return (
		<MotionLink
			href={to}
			className={cn(
				'flex items-center space-x-1 text-muted-foreground focus:outline-none',
				className
			)}
			ref={ref}
			animate={state}
			transition={shouldReduceMotion ? { duration: 0 } : {}}
		>
			<span className='text-sm'>{children}</span>
			<motion.span
				variants={shouldReduceMotion ? {} : arrowVariants.right}
				transition={shouldReduceMotion ? { duration: 0 } : {}}
			>
				<ArrowIcon direction='right' />
			</motion.span>
		</MotionLink>
	);
}

export { BackLink, NextLink };
