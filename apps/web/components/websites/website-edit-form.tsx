'use client'

import { useRouter } from 'next/navigation'

import { useEffect, useState, useTransition } from 'react'

import { websiteFormSchema } from '@/lib/validations/website'
import { Form } from '@heimdall-logs/ui'
import { Input } from '@heimdall-logs/ui'
import { Button } from '@heimdall-logs/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { toast } from 'sonner'
import { useDebounce } from 'use-debounce'
import { toFormikValidationSchema } from 'zod-formik-adapter'

interface Props {
  toggleDialog: (open: boolean) => void
}

export const ZCreateWebsiteSchema = z.object({
  slug: z
    .string({
      required_error: "We're gonna use this as an identifier so it's required",
    })
    .min(1, "I don't think you can have a slug with 0 characters")
    .max(20, "I don't think you can have a slug with more than 20 characters")
    .transform((value) => value.toLowerCase())
    .transform((value) => value.replace(/\s/g, '_')),
  title: z
    .string()
    .min(1, 'We kinda hope you give us some kind of title here')
    .max(20, 'Can we make it a little shorter than 20 chars'),
  url: z
    .string({ required_error: 'Url field is required like every other fields' })
    .url('How do you plan to collect data without providing url?'),
  public: z.boolean().optional(),
  active: z.boolean().optional(),
})

export const EditWebsiteForm = (props: Props) => {
  const [slugUrl, _setSlugUrl] = useState<string>('')
  const [slugError, setSlugError] = useState<string | null>(null)
  const [_isLoading, startTransition] = useTransition()
  const { refresh } = useRouter()
  const _form = useForm<z.infer<typeof websiteFormSchema>>({
    resolver: zodResolver(websiteFormSchema),
    defaultValues: {
      url: '',
      id: '',
    },
  })

  const onSubmit = (values: z.infer<typeof websiteFormSchema>) => {
    startTransition(async () => {
      try {
        const res = await fetch('/api/website', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        })
        if (!res.ok) {
          if (res.status === 409) {
            toast.error('Uh oh!', {
              description:
                'This website already exists. Please try again with a different website ID or Website URL.',
            })
          }
          toast.error('Uh oh!', {
            description:
              'This website already exists. Please try again with a different website ID or Website URL.',
          })
        }
        props.toggleDialog(false)
        refresh()
      } catch (e: any) {
        toast('Uh oh!', {
          description: `An error occurred: ${e.message}`,
        })
      }
    })
  }

  const generateSlug = (url: string): string => {
    const strippedUrl = url
      .replace('https://', '')
      .replace('http://', '')
      .replace(/:\d+/, '')
    const allCom = url.split('.')
    return strippedUrl
      .replace(`.${allCom[allCom.length - 1]}`, '')
      .replace(/\./g, '_')
  }

  const [debouncedSlug] = useDebounce(slugUrl, 500)

  useEffect(() => {
    if (debouncedSlug.length > 0 && !slugError) {
      fetch(`/api/website/${slugUrl}/exists`).then(async (res) => {
        if (res.status === 200) {
          const exists = await res.json()
          setSlugError(exists === 1 ? 'Slug is already in use.' : null)
        }
      })
    }
  }, [debouncedSlug, slugError, slugUrl])

  return (
    <Form
      id="website-form"
      validateOnBlur
      initialValues={{
        title: '',
        url: '',
        slug: '',
      }}
      validationSchema={toFormikValidationSchema(ZCreateWebsiteSchema)}
      onSubmit={onSubmit}
    >
      {({
        isSubmitting,
        values,
        setFieldValue,
      }: {
        isSubmitting: boolean
        values: any
        setFieldValue: any
      }) => {
        return (
          <div className="flex flex-col gap-4">
            <Input
              id="title"
              name="title"
              type="text"
              label="Website Title"
              placeholder="Your Website Title"
              disabled={isSubmitting}
            />

            <Input
              id="url"
              name="url"
              type="text"
              label="Website URL"
              placeholder="https://example.com"
              disabled={isSubmitting}
              onChange={() => {
                const slug = generateSlug(values.url)
                setFieldValue('slug', slug)
              }}
            />

            <Input
              id="slug"
              name="slug"
              type="text"
              label="Your website @mxl-console"
              placeholder="site_name"
              disabled={isSubmitting}
            />

            <Button
              block
              form="website-form"
              htmlType="submit"
              size="medium"
              disabled={isSubmitting}
              loading={isSubmitting}
            >
              Add Website
            </Button>
          </div>
        )
      }}
    </Form>
  )
}
