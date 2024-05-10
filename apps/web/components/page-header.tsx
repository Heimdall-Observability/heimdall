import Link from 'next/link'
import ReactMarkdown from 'react-markdown'

import { Button, IconExternalLink } from '@heimdall-logs/ui'

const PageHeader = ({
  title,
  description,
  docsUrl,
}: {
  title: string
  description?: string
  docsUrl?: string
}) => {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div className="space-y-1">
        <h3 className="text-lg text-foreground">
          <ReactMarkdown unwrapDisallowed disallowedElements={['p']}>
            {title}
          </ReactMarkdown>
        </h3>
        {description && (
          <div className="text-sm text-muted-foreground">
            <ReactMarkdown>{description}</ReactMarkdown>
          </div>
        )}
      </div>
      {docsUrl !== undefined && (
        <Button asChild type="default" icon={<IconExternalLink />}>
          <Link href={docsUrl} target="_blank" rel="noreferrer">
            Documentation
          </Link>
        </Button>
      )}
    </div>
  )
}

export { PageHeader }
