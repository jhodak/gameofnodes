import { LoaderFunction, MetaFunction } from "@remix-run/node"
import { useFetcher, useLoaderData } from "@remix-run/react"
import { Card, Group, Title, Text, Grid } from "@mantine/core"
import { HyperLink } from "~/components/atoms/HyperLink"
import { IntroText } from "~/components/molecules/IntroText"
import { pageDataType } from "~/types"
import styles from "~/styles/networksStyles.css"
import { getCoinCapData } from "~/models/coincap.server"
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
  let coinCapData: any | undefined
  if (cache.has("coinCapData")) {
    coinCapData = await cache.get("coinCapData")
  } else {
    coinCapData = await getCoinCapData()
    cache.set("coinCapData", coinCapData, 10 * 1)
  }

  let data = coinCapData
  return data
}

type chains = "klever" | "presearch"

type loaderDataType = {
  id: string
  rank: string
  symbol: string
  name: string
  supply: string
  marketCapUsd: string
  priceUsd: string
  changePercent24Hr: string
}[]

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
    }, 10 * 1000)
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
    marketCap: number | string
    dayChange: number | string
  }[]

  const klever = data[0]
  const presearch = data[1]

  const networkData: networkDataType = [
    {
      name: "Klever",
      image: "/logos/klever.svg",
      url: "https://klever.finance/",
      text: `Klever is a cutting-edge blockchain platform that is designed to meet the needs of developers and businesses. Our platform is built on a robust and secure infrastructure that is designed to support the development and deployment of decentralized applications and smart contracts.`,
      price: parseFloat(klever.priceUsd).toFixed(4),
      marketCap: Math.round(parseFloat(klever.marketCapUsd)),
      dayChange: parseFloat(klever.changePercent24Hr).toFixed(2),
    },
    {
      name: "Presearch",
      image: "/logos/presearch.svg",
      url: "https://presearch.io/",
      text: `Presearch is a community-powered, decentralized search engine that provides better results while protecting your privacy and rewarding you when you search. Presearch is building a complete ecosystem to provide the world with a search engine that is powered by the community, for the community.`,
      price: parseFloat(presearch.priceUsd).toFixed(3),
      marketCap: Math.round(parseFloat(presearch.marketCapUsd)),
      dayChange: parseFloat(presearch.changePercent24Hr).toFixed(2),
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
                  value={`${item.dayChange} %`}
                />
                <CardGroupLayout
                  text="Market Cap:"
                  value={`$ ${item.marketCap.toLocaleString()}`}
                />
                <CardGroupLayout
                  text="Powered by:"
                  value="CoinCap"
                  url="https://www.coincap.io/"
                />
              </Card>
            </Grid.Col>
          )
        })}
      </Grid>
    </section>
  )
}
