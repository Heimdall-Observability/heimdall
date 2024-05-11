'use client'

import type { TransformerOption } from '@cld-apis/types'
import { buildImageUrl, setConfig } from 'cloudinary-build-url'

setConfig({
  cloudName: 'mashafrancis',
})

type ImageBuilder = {
  (transformations?: TransformerOption): string
  alt: string
  id: string
}

const createImages = <
  ImageType extends Record<string, { id: string; alt: string }>,
>(
  images: ImageType,
) => {
  const imageBuilders: Record<string, ImageBuilder> = {}
  for (const [name, { id, alt }] of Object.entries(images)) {
    imageBuilders[name] = getImageBuilder(id, alt)
  }
  return imageBuilders as { [Name in keyof ImageType]: ImageBuilder }
}

function getImageBuilder(id: string, alt = '...'): ImageBuilder {
  function imageBuilder(transformations?: TransformerOption) {
    return buildImageUrl(id, { transformations })
  }

  imageBuilder.alt = alt
  imageBuilder.id = id
  return imageBuilder
}

const images = createImages({
  home: {
    id: 'heimdall/illustrations/home',
    alt: 'Sanctissima Home.',
  },
  me: {
    id: 'sanctissima/illustrations/home',
    alt: 'Sanctissima Profile',
  },
  notFound: {
    id: 'heimdall/illustrations/404',
    alt: 'Not Found.',
  },
  serverError: {
    id: 'heimdall/illustrations/500',
    alt: 'Server Error.',
  },
  online: {
    id: 'sanctissima/illustrations/home',
    alt: 'Online.',
  },
})

const heimdallImages = {
  home: images.home,
  notFound: images.notFound,
  serverError: images.serverError,
  online: images.online,
}

const getImgProps = (
  imageBuilder: ImageBuilder,
  {
    widths,
    sizes,
    transformations,
  }: {
    widths: Array<number>
    sizes: Array<string>
    transformations?: TransformerOption
  },
) => {
  const averageSize = Math.ceil(widths.reduce((a, s) => a + s) / widths.length)

  return {
    alt: imageBuilder.alt,
    src: imageBuilder({
      quality: 'auto',
      format: 'auto',
      ...transformations,
      resize: { width: averageSize, ...transformations?.resize },
    }),
    srcSet: widths
      .map((width) =>
        [
          imageBuilder({
            quality: 'auto',
            format: 'auto',
            ...transformations,
            resize: { width, ...transformations?.resize },
          }),
          `${width}w`,
        ].join(' '),
      )
      .join(', '),
    sizes: sizes.join(', '),
  }
}

const getSocialImageWithPreTitle = ({
  origin,
  title,
  preTitle,
  featuredImage: img,
  url,
}: {
  origin: string
  title: string
  preTitle: string
  featuredImage: string
  url: string
}) => {
  const params = new URLSearchParams({
    type: '2',
    title,
    preTitle,
    img,
    url,
  })
  return `${origin}/img/social?${params.toString()}`
}

const getGenericSocialImage = ({
  origin,
  words,
  featuredImage: img,
  url,
}: {
  origin: string
  words: string
  featuredImage: string
  url: string
}) => {
  const params = new URLSearchParams({
    type: '1',
    words,
    img,
    url,
  })
  return `${origin}/img/social?${params.toString()}`
}

export {
  images,
  getImgProps,
  getImageBuilder,
  getGenericSocialImage,
  getSocialImageWithPreTitle,
  heimdallImages,
}
export type { ImageBuilder }
