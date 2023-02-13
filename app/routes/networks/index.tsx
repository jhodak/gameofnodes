import { LoaderFunction, MetaFunction } from "@remix-run/node"
import { useFetcher, useLoaderData } from "@remix-run/react"
import { Card, Group, Title, Text, Grid } from "@mantine/core"
import { HyperLink } from "~/components/atoms/HyperLink"
import { IntroText } from "~/components/molecules/IntroText"
import { pageDataType } from "~/types"
import styles from "~/styles/networksStyles.css"
import { getCoinGeckoData } from "~/models/coingecko.server"
import { cache } from "~/utils/db.server"
import { useEffect, useState } from "react"
import {
  CardGroupLayout,
  links as cardGroupLinks,
} from "~/components/molecules/CardGroupLayout"

export const meta: MetaFunction = () => {
  return {
    title: "Networks - Game of Nodes",
    description:
      "Get the latest on Presearch & Klever crypto networks. Learn about the benefits of running nodes, stay updated on developments & join the crypto community.",
  }
}

export const links = () => {
  return [...cardGroupLinks(), { rel: "stylesheet", href: styles }]
}

export const loader: LoaderFunction = async () => {
  let coinGeckoData: any | undefined
  if (cache.has("coinGeckoData")) {
    coinGeckoData = await cache.get("coinGeckoData")
  } else {
    coinGeckoData = await getCoinGeckoData()
    cache.set("coinGeckoData", coinGeckoData, 60 * 1)
  }

  let data = coinGeckoData
  return data
}

type chains = "klever" | "presearch"

type loaderDataType = {
  [key in chains]: {
    usd: number
    usd_market_cap: number
    usd_24h_change: number
  }
}

export default function NetworksPage() {
  // load initial data from initial page load
  let loaderData: loaderDataType = useLoaderData()

  // set data into state usable by the page
  const [data, setData] = useState(loaderData)
  const fetcher = useFetcher()

  // every interval goes and grabs potentially new data
  useEffect(() => {
    const interval = setInterval(() => {
      if (document.visibilityState === "visible") {
        fetcher.load("/networks?index")
      }
    }, 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  // updates the state data when it changes to re-render page with new data
  useEffect(() => {
    if (fetcher.data) {
      setData(fetcher.data)
    }
  }, [fetcher.data])

  const pageData: pageDataType = {
    title: "Networks",
    text: [
      `At Game of Nodes, we are proud to offer robust and secure validators for cryptocurrency networks like Klever.finance and Presearch.io. We understand the importance of running reliable and trustworthy validators and we are constantly exploring new and promising networks to support. Our validators are built with the latest technologies and are constantly monitored to ensure your network is running securely and dependably.`,
    ],
  }

  type networkDataType = {
    name: string
    image: string
    url: string
    text: string
    price: number | string // sometimes we manipulate it with toFixed() which converts to a string
    marketCap: number
    dayChange: number
  }[]

  const networkData: networkDataType = [
    {
      name: "Klever",
      image: "/logos/klever.svg",
      url: "https://klever.finance/",
      text: `Klever is a cutting-edge blockchain platform that is designed to meet the needs of developers and businesses. Our platform is built on a robust and secure infrastructure that is designed to support the development and deployment of decentralized applications and smart contracts.`,
      price: data.klever.usd.toFixed(4),
      marketCap: Math.round(data.klever.usd_market_cap),
      dayChange: data.klever.usd_24h_change,
    },
    {
      name: "Presearch",
      image: "/logos/presearch.svg",
      url: "https://presearch.io/",
      text: `Presearch is a community-powered, decentralized search engine that provides better results while protecting your privacy and rewarding you when you search. Presearch is building a complete ecosystem to provide the world with a search engine that is powered by the community, for the community.`,
      price: data.presearch.usd.toFixed(3),
      marketCap: Math.round(data.presearch.usd_market_cap),
      dayChange: data.presearch.usd_24h_change,
    },
  ]

  return (
    <section className="NetworkPage">
      <IntroText data={pageData} />
      <Grid>
        {networkData.map((item) => {
          return (
            <Grid.Col md={6} sm={12} xs={12} key={item.name}>
              <Card className="card">
                <HyperLink href={item.url}>
                  <Group
                    className="titleLink"
                    position="left"
                    noWrap
                    spacing="xs"
                  >
                    <img src={item.image} alt={`${item.name} Logo`} />
                    <Title order={2}>{item.name}</Title>
                  </Group>
                </HyperLink>

                <div>
                  <Text component="p" className="description">
                    {item.text}
                  </Text>
                </div>
                <CardGroupLayout
                  text="Value"
                  color={item.dayChange > 0 ? "green" : "red"}
                  value={`$ ${item.price}`}
                />
                <CardGroupLayout
                  text="24hr Change:"
                  color={item.dayChange > 0 ? "green" : "red"}
                  value={`${item.dayChange.toFixed(2)} %`}
                />
                <CardGroupLayout
                  text="Market Cap:"
                  value={`$ ${item.marketCap.toLocaleString()}`}
                />
                <CardGroupLayout
                  text="Powered by:"
                  value="CoinGecko"
                  url="https://www.coingecko.com/"
                />
              </Card>
            </Grid.Col>
          )
        })}
      </Grid>
    </section>
  )
}
