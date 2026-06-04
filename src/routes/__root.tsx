import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools'
import type { QueryClient } from '@tanstack/react-query'

import { Header } from '#/components/header'
import { themeInitScript } from '#/components/theme-toggle'
import appCss from '../styles.css?url'

export interface RouterContext {
  queryClient: QueryClient
}

const siteName = 'Hacker News'
const siteTitle = 'Hacker News — Top Stories'
const siteDescription =
  'A fast Hacker News reader built with TanStack Start. Browse the top, new, and best stories from Hacker News.'
const siteUrl = 'http://localhost:3000/'
const siteImage = '/logo512.png'

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: siteTitle,
      },
      {
        name: 'description',
        content: siteDescription,
      },
      // Open Graph
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: siteName },
      { property: 'og:title', content: siteTitle },
      { property: 'og:description', content: siteDescription },
      { property: 'og:image', content: siteImage },
      { property: 'og:url', content: siteUrl },
      // Twitter / X
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: siteTitle },
      { name: 'twitter:description', content: siteDescription },
      { name: 'twitter:image', content: siteImage },
      { name: 'twitter:url', content: siteUrl },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      { rel: 'icon', href: '/favicon.ico', sizes: '48x48' },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '192x192',
        href: '/logo192.png',
      },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/logo192.png' },
      { rel: 'manifest', href: '/manifest.json' },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  const { queryClient } = Route.useRouteContext()

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          // Set the theme class before paint to avoid a flash of the wrong theme.
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
        <HeadContent />
      </head>
      <body>
        <Header />
        {children}
        <TanStackDevtools
          config={{ position: 'bottom-right' }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
            {
              name: 'Tanstack Query',
              render: <ReactQueryDevtoolsPanel client={queryClient} />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
