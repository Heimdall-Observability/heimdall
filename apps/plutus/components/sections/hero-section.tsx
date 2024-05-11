'use client'

import { NextRouter } from 'next/router'

import type { ElementType, ReactNode } from 'react'

import { Grid } from '@/components/grid'
import { type ImageBuilder, getImgProps } from '@/lib/images'
import type { TransformerOption } from '@cld-apis/types'
import clsx from 'clsx'
import { type HTMLMotionProps, motion, useReducedMotion } from 'framer-motion'

import { ArrowButton, ArrowLink } from '../arrow-button'
import { H2, H5 } from '../typography'

export type HeroSectionProps = {
  title: string | ReactNode
  arrowClickAction?: () => void
  arrowUrl?: NextRouter | URL
  subtitle?: string | ReactNode
  action?: ReactNode
  as?: ElementType
} & (
  | {
      imageProps?: HTMLMotionProps<'img'>
      imageSize?: 'medium' | 'large' | 'giant'
      image?: never
      imageBuilder?: never
      imageTransformations?: never
    }
  | {
      imageProps?: never
      imageSize?: never
      image?: never
      imageBuilder?: never
      imageTransformations?: never
    }
  | {
      imageProps?: never
      imageSize?: 'medium' | 'large' | 'giant'
      image: ReactNode
      imageBuilder?: never
      imageTransformations?: never
    }
  | {
      imageProps?: never
      imageSize?: 'medium' | 'large' | 'giant'
      image?: never
      imageBuilder: ImageBuilder
      imageTransformations?: TransformerOption
    }
) &
  (
    | {
        arrowUrl: string
        arrowLabel: string
        arrowDirection?:
          | 'down'
          | 'left'
          | 'right'
          | 'up'
          | 'top-right'
          | undefined
      }
    | {
        arrowUrl?: never
        arrowLabel?: never
        arrowDirection?: never
      }
    | {
        arrowClickAction: () => void
        arrowLabel: string
        arrowDirection?:
          | 'down'
          | 'left'
          | 'right'
          | 'up'
          | 'top-right'
          | undefined
      }
  )

function getHeroImageProps(
  imageBuilder: ImageBuilder,
  transformations?: TransformerOption,
) {
  return getImgProps(imageBuilder, {
    widths: [256, 550, 700, 900, 1300, 1800],
    sizes: [
      '(max-width: 1023px) 80vw',
      '(min-width: 1024px) and (max-width: 1279px) 50vw',
      '(min-width: 1280px) 900px',
    ],
    transformations,
  })
}

function HeroSection({
  action,
  title,
  subtitle,
  arrowUrl,
  arrowLabel,
  arrowDirection = 'down',
  arrowClickAction,
  image,
  imageProps,
  imageBuilder,
  imageSize = 'large',
  as = 'header',
}: HeroSectionProps) {
  const hasImage = Boolean(image ?? imageProps ?? imageBuilder)
  const shouldReduceMotion = useReducedMotion()

  const childVariants = {
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <Grid
      as={as}
      className={clsx(
        'mb-4 mt-4 flex h-auto items-center pb-0 pt-0 lg:mb-24 lg:mt-24 lg:min-h-[40rem]',
        {
          'lg:mb-64': arrowLabel,
          'lg:mb-0': !arrowLabel,
        },
      )}
    >
      {hasImage ? (
        <div
          className={clsx('col-span-full mb-12 lg:mb-0', {
            'px-10 lg:col-span-5 lg:col-start-7': imageSize === 'medium',
            'flex items-start justify-end lg:col-span-6 lg:col-start-6 lg:pl-10':
              imageSize === 'large',
            'lg:-mr-5vw flex items-center justify-center lg:col-span-7 lg:col-start-6 lg:-mt-24 lg:px-0':
              imageSize === 'giant',
          })}
        >
          {imageProps ? (
            <motion.img
              {...imageProps}
              className={clsx(
                'h-auto w-full object-contain',
                {
                  'max-h-50vh': imageSize === 'medium',
                  'max-h-75vh': imageSize === 'giant',
                },
                imageProps.className,
              )}
              initial={{ scale: shouldReduceMotion ? 1 : 1.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.75 }}
            />
          ) : imageBuilder ? (
            <motion.img
              className={clsx('h-auto w-full object-contain', {
                'max-h-50vh': imageSize === 'medium',
                'max-h-75vh': imageSize === 'giant',
              })}
              {...getHeroImageProps(imageBuilder)}
              initial={{ scale: shouldReduceMotion ? 1 : 1.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.75 }}
            />
          ) : (
            image
          )}
        </div>
      ) : null}

      <div
        className={clsx(
          'pt:4 col-span-full lg:col-start-1 lg:row-start-1 lg:flex lg:h-fit lg:flex-col',
          {
            'lg:col-span-5': hasImage,
            'lg:col-span-7': !hasImage,
          },
        )}
      >
        <motion.div
          className="flex flex-auto flex-col"
          initial="initial"
          animate="visible"
          variants={{
            initial: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
          }}
        >
          <motion.div variants={childVariants}>
            <H2 as="h2">{title}</H2>
          </motion.div>

          {subtitle ? (
            <motion.div variants={childVariants}>
              <H5 as="p" variant="secondary" className="mt-4 font-normal">
                {subtitle}
              </H5>
            </motion.div>
          ) : null}
          {action ? (
            <motion.div
              variants={childVariants}
              className="mt-4 flex flex-col space-y-4"
            >
              {action}
            </motion.div>
          ) : null}
        </motion.div>
        {arrowUrl ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="block pt-12"
          >
            <ArrowLink
              to={arrowUrl}
              direction={arrowDirection}
              textSize="small"
            >
              {arrowLabel}
            </ArrowLink>
          </motion.div>
        ) : null}
        {arrowClickAction ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="block pt-12"
          >
            <ArrowButton
              onClick={arrowClickAction}
              direction={arrowDirection}
              textSize="small"
            >
              {arrowLabel}
            </ArrowButton>
          </motion.div>
        ) : null}
      </div>
    </Grid>
  )
}

export { HeroSection, getHeroImageProps }
