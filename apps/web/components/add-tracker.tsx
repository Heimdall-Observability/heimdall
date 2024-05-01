'use client'

import { useEffect, useState } from 'react'

import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useTheme } from 'next-themes'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import {
  gruvboxLight as darkTheme,
  a11yDark as lightTheme,
} from 'react-syntax-highlighter/dist/esm/styles/prism'

import { CopyToClipboard } from './copy-to-clipboard'
import { Icons } from './icons'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

const snippets = [
  {
    name: 'nextjs/app-tsx',
    getCode: (id: string) => `import Heimdall from "@heimdall-logs/tracker/react";
export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <html lang="en">
        <body>
          {children}
          <Heimdall
            config={{
                id: "${id}"
            }}
          />
        </body>
      </html>
    );
}
  `,
    icon: Icons.typescript,
    fileName: 'app/layout.tsx',
    description: 'Copy the following code in  main layout file:',
  },
  {
    name: 'nextjs/app-jsx',
    getCode: (id: string) => `import Heimdall from "@heimdall-logs/tracker/react";
export default function RootLayout({
    children,
  }) {
    return (
      <html lang="en">
        <body>
          {children}
          <Heimdall
            config={{
              id: "${id}"
            }}
          />
        </body>
      </html>
  );
}
  `,
    icon: Icons.javascript,
    fileName: 'app/layout.js',
    description: 'Copy the following code in  main layout file:',
  },
  {
    name: 'nextjs-tsx',
    getCode: (id: string) => `import Heimdall from "@heimdall-logs/tracker/react";
export default function App({ Component, pageProps }: AppProps) {
   return (
    <>
      <Component {...pageProps} />
      <Heimdall
        config={{
            id: "${id}",
        }}
      />
    </>
  );
}
`,
    icon: Icons.typescript,
    fileName: 'pages/_app.tsx',
    description: 'Copy the following code in your main app file:',
  },
  {
    name: 'nextjs-jsx',
    getCode: (id: string) => `import Heimdall from "@heimdall-logs/tracker/react"
export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Heimdall config={{
        id: "${id}"
      }} />
    </>
  );
}
  `,
    icon: Icons.javascript,
    fileName: 'pages/_app.js',
    description: 'Copy the following code in your main app file',
  },
  {
    name: 'other-frameworks-jsx',
    getCode: (id: string) => `import {heimdall} from "@heimdall-logs/tracker"

heimdall.record({
    id: "${id}"
})
  `,
    icon: Icons.javascript,
    fileName: 'main.js',
    description: 'Call record function in your main/entry file',
  },
  {
    name: 'other-frameworks-tsx',
    getCode: (id: string) => `import {heimdall} from "@heimdall-logs/tracker"

heimdall.record({
    id: "${id}"
})
    `,
    icon: Icons.typescript,
    fileName: 'main.ts',
    description: 'Call record function in your main/entry file',
  },
  {
    name: 'cdn',
    getCode: (id: string) => `<head>
     <script src='https://cdn.jsdelivr.net/npm/@heimdall-logs/tracker@latest/dist/index.global.js' data-id='${id}'></script><title/>
</head>
  `,
    icon: Icons.htmlLogo,
    fileName: 'index.html',
    lang: 'html',
    description: 'simply copy the following code into your script tag',
    hideLangSelector: true,
  },
  {
    name: 'wordpress',
    getCode: (id: string) => `
  We're not live on wordpress plugin store just yet
  but you can download the plugin from github and install it manually in your wordpress site.
  you can find the plugin here:
  https://github.com/heimdall/heimdall-wordpress-plugin
  Then you can update the plugin settings with your website id.
  id: ${id}
  `,
    icon: Icons.wordpress,
    lang: 'text',
    fileName: 'wordpress-plugin',
    description:
      'Download the plugin from github and install it manually in your wordpress site.',
    hideLangSelector: true,
  },
]

export const AddTracker = ({
  websiteId,
  show,
}: {
  websiteId: string
  show: boolean
}) => {
  const [isOpen, setIsOpen] = useState(show)
  const [selected, setSelected] = useState(snippets[0])
  const [selectedFramework, setSelectedFramework] = useState('nextjs')
  const [selectedLang, setSelectedLang] = useState('tsx')

  useEffect(() => {
    function changeLang() {
      const snippet = snippets.find(
        (snippet) => snippet.name === selectedFramework,
      )
      if (!snippet) {
        setSelected(
          // biome-ignore lint/style/noNonNullAssertion: <explanation>
          snippets.find(
            (snippet) =>
              snippet.name === `${selectedFramework}-${selectedLang}`,
          )!,
        )
      } else {
        setSelected(snippet)
      }
    }

    changeLang()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLang, selectedFramework])
  const { theme } = useTheme()
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen && !isMobile}>
      <DialogContent className="sm:max-w-fit bg-card">
        <div className=" flex items-center justify-between py-2">
          <p className="font-medium">
            Follow the steps below to add heimdall to your website
          </p>
        </div>
        <div className="py-2">
          <div className="group relative flex items-center">
            <span className="relative z-10 flex h-4 w-4 items-center justify-center rounded-full border p-4 dark:border-muted-foreground/40">
              1
            </span>
            <span className="flex min-w-0 flex-col">
              <span className="text-sm font-mono tracking-wide">
                <SyntaxHighlighter
                  language="bash"
                  style={theme === 'dark' ? lightTheme : darkTheme}
                  wrapLines
                  className="font-mono"
                  customStyle={{
                    background: 'none',
                    fontSize: '0.8rem',
                    border: 'none',
                  }}
                >
                  pnpm add @heimdall-logs/tracker
                </SyntaxHighlighter>
              </span>
            </span>
            <span>
              <CopyToClipboard text="pnpm add @heimdall-logs/tracker" />
            </span>
          </div>
        </div>
        <div className="group relative flex items-start gap-2">
          <span className="relative z-10 flex h-4 w-4 items-center justify-center rounded-full border p-4 dark:border-muted-foreground/40">
            2
          </span>
          <div className=" bg-gradient-br relative flex h-max md:w-[500px] w-fit flex-col rounded-md border from-gray-100 to-gray-300 pb-6 animate-in dark:border-muted-foreground/40 dark:from-black dark:to-muted">
            <div className=" flex  items-center justify-between space-y-2 border-b p-4 md:py-2">
              <div className=" flex items-center gap-2">
                <selected.icon />
                <p className=" text-xs ">{selected.fileName}</p>
              </div>
              <div className=" flex w-max items-center gap-2">
                <Select
                  defaultValue="nextjs"
                  onValueChange={(value) => setSelectedFramework(value)}
                >
                  <SelectTrigger className=" text-xs ">
                    <SelectValue placeholder="select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nextjs" className=" text-xs">
                      Next JS
                    </SelectItem>
                    <SelectItem value="nextjs/app" className=" text-xs">
                      Next App Route
                    </SelectItem>
                    <SelectItem value="other-frameworks" className=" text-xs">
                      Other Frameworks
                    </SelectItem>
                    <SelectItem value="wordpress" className=" text-xs">
                      Wordpress
                    </SelectItem>
                    <SelectItem value="cdn" className=" text-xs">
                      CDN
                    </SelectItem>
                  </SelectContent>
                </Select>
                {!selected.hideLangSelector && (
                  <Select
                    defaultValue="tsx"
                    onValueChange={(value) => setSelectedLang(value)}
                  >
                    <SelectTrigger className=" w-max text-xs">
                      <SelectValue placeholder="select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tsx" className=" text-xs">
                        Typescript
                      </SelectItem>
                      <SelectItem value="jsx" className=" text-xs">
                        Javascript
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
                <CopyToClipboard text={selected.getCode(websiteId)} />
              </div>
            </div>
            <SyntaxHighlighter
              language={selected.lang ?? 'jsx'}
              style={theme === 'dark' ? lightTheme : darkTheme}
              wrapLines
              showLineNumbers
              className="font-mono"
              customStyle={{
                background: 'none',
                fontSize: '0.8rem',
                border: 'none',
              }}
            >
              {selected.getCode(websiteId)}
            </SyntaxHighlighter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
