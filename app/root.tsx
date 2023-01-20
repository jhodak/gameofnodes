import type { MetaFunction } from "@remix-run/node"
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react"
import { MantineProvider, Container } from "@mantine/core"
import { HeaderAction } from "~/components/mantine/Header"
import { StylesPlaceholder } from "@mantine/remix"
import { theme } from "./theme"
import type { LinksFunction } from "@remix-run/node" // or cloudflare/deno

export const links: LinksFunction = () => {
  return [
    {
      rel: "icon",
      href: "/crown.svg",
      type: "image/svg+xml",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/crown.svg",
      type: "image/svg+xml",
    },
    {
      rel: "mask-icon",
      href: "/crown.svg",
      type: "image/svg+xml",
      color: "#ffcd00",
    },
  ]
}

const navLinks = [
  {
    link: "/nodes",
    label: "Nodes",
  },
  {
    link: "/networks",
    label: "Networks",
  },
]

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Game of Nodes",
  description:
    "Game of Nodes provides the most robust and secure validators for cryptocurrency networks like Klever and Presearch. We build the infrastructure needed for reliable and trustworthy web3 applications for our customers.",
  viewport: "width=device-width,initial-scale=1",
})

export default function App() {
  return (
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      <html lang="en">
        <head>
          <StylesPlaceholder />
          <Meta />
          <Links />
        </head>
        <body>
          <HeaderAction button={false} links={navLinks} />
          <main>
            <Container size={1280}>
              <Outlet />
            </Container>
            <ScrollRestoration />
            <Scripts />
            <LiveReload />
          </main>
        </body>
      </html>
    </MantineProvider>
  )
}
