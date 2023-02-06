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
import HeaderMenu, { links as HeaderLinks } from "~/components/mantine/Header"
import { StylesPlaceholder } from "@mantine/remix"
import { theme } from "./theme"
import type { LinksFunction } from "@remix-run/node" // or cloudflare/deno
import FooterLayout, {
  links as FooterLinks,
} from "./components/molecules/Footer"
import styles from "~/styles/rootStyles.css"

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
    ...HeaderLinks(),
    ...FooterLinks(),
    { rel: "stylesheet", href: styles },
  ]
}

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Game of Nodes",
  description:
    "Game of Nodes provides the most robust and secure validators for cryptocurrency networks like Klever and Presearch. We build the infrastructure needed for reliable and trustworthy web3 applications for our customers.",
  viewport: "width=device-width,initial-scale=1",
})

const navLinks = [
  {
    link: "/nodes",
    label: "Nodes",
  },
  {
    link: "/networks",
    label: "Networks",
  },
  { link: "/guides", label: "Guides" },
]

export default function App() {
  return (
    <html lang="en">
      <MantineProvider
        theme={theme}
        withCSSVariables
        withGlobalStyles
        withNormalizeCSS
      >
        <head>
          <Meta />
          <Links />
          <StylesPlaceholder />
        </head>
        <body>
          <HeaderMenu links={navLinks} button={false} />
          <main>
            <Container size={1280}>
              <Outlet />
            </Container>
            <ScrollRestoration />
            <Scripts />
            <LiveReload />
          </main>
          <FooterLayout />
        </body>
      </MantineProvider>
    </html>
  )
}
