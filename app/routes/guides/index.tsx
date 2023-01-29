import { LoaderFunction, MetaFunction } from "@remix-run/node"
import { Link, useLoaderData } from "@remix-run/react"
import { Card, Group, Title, Text, Grid } from "@mantine/core"
import { HyperLink } from "~/components/atoms/HyperLink"
import { IntroText } from "~/components/molecules/IntroText"
import { pageDataType } from "~/types"
import {
  determineColorByComplexity,
  determineColorByHardware,
} from "~/utils/utilities"
import styles from "~/styles/guidesStyles.css"
import {
  CardGroupLayout,
  LayoutData,
  LayoutListData,
  links as cardGroupLinks,
} from "~/components/molecules/CardGroupLayout"

export const meta: MetaFunction = () => {
  return {
    title: "Networks - Game of Nodes",
  }
}

export const links = () => {
  return [...cardGroupLinks(), { rel: "stylesheet", href: styles }]
}

export const loader: LoaderFunction = async () => {
  // let data = getKlever()
  // return data
  return null
}

export default function GuidesPage() {
  let loaderData = useLoaderData()

  const pageData: pageDataType = {
    title: "Guides and Links",
    text: [
      `At Game of Nodes, we provide comprehensive guides and walk-throughs for building and running validator nodes on different blockchain networks. Our guides are easy to follow and provide detailed instructions on setting up and maintaining your validators. We also provide robust and secure validators for a variety of cryptocurrency networks. Our validators are built with the latest technologies and are constantly monitored to ensure your network is running reliably and dependably.`,
    ],
  }

  type guidesDataType = {
    name: string
    image: string
    stats: {
      tokenRequirement: number
      tokenSymbol: string
      tokenCMCURL: string
      complexity: "easy" | "medium" | "hard"
      hardWareRequirement: "light" | "moderate" | "significant"
    }
    guides: {
      text: string
      value: string
      url: string
      color: "yellow"
    }[]
    url: string
    text: string
  }[]

  const guidesData: guidesDataType = [
    {
      name: "Klever",
      image: "/logos/klever.svg",
      stats: {
        tokenRequirement: 1500000,
        tokenSymbol: "klv",
        tokenCMCURL: "https://coinmarketcap.com/currencies/klever/",
        complexity: "medium",
        hardWareRequirement: "moderate",
      },
      guides: [
        {
          text: "Official Documentation:",
          value: "https://docs.klever.finance/",
          url: "https://docs.klever.finance/klever-blockchain-node-operations/how-to-run-a-node",
          color: "yellow",
        },
        {
          text: "Complete Guide:",
          value: "https://www.thekuberoom.com/",
          url: "https://www.thekuberoom.com/node-setup/",
          color: "yellow",
        },
      ],
      url: "https://klever.finance/",
      text: `Klever is a cutting-edge blockchain platform that is designed to meet the needs of developers and businesses. Our platform is built on a robust and secure infrastructure that is designed to support the development and deployment of decentralized applications and smart contracts.`,
    },
    {
      name: "Presearch",
      image: "/logos/presearch.svg",
      stats: {
        tokenRequirement: 4000,
        tokenSymbol: "pre",
        tokenCMCURL: "https://coinmarketcap.com/currencies/presearch/",
        complexity: "easy",
        hardWareRequirement: "light",
      },
      guides: [
        {
          text: "Official Documentation:",
          value: "https://docs.presearch.io/",
          url: "https://docs.presearch.io/nodes/setup",
          color: "yellow",
        },
      ],
      url: "https://presearch.io/",
      text: `Presearch is a community-powered, decentralized search engine that provides better results while protecting your privacy and rewarding you when you search.`,
    },
  ]

  return (
    <section className="GuidesPage">
      <IntroText data={pageData} />
      <Grid>
        {guidesData.map((item) => {
          const layout: LayoutListData = [
            {
              text: "Native Token :",
              value: item.stats.tokenSymbol.toUpperCase(),
              url: item.stats.tokenCMCURL,
              color: "yellow",
            },
            {
              text: "Minimum Node Requirement :",
              value: `${item.stats.tokenRequirement.toLocaleString()} ${item.stats.tokenSymbol.toUpperCase()}`,
            },
            {
              text: "Hardware :",
              value: item.stats.hardWareRequirement,
              color: determineColorByHardware(item.stats.hardWareRequirement),
            },
            {
              text: "Complexity :",
              value: item.stats.complexity,
              color: determineColorByComplexity(item.stats.complexity),
            },
          ]
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
                    <img src={item.image} />
                    <Title order={2}>{item.name}</Title>
                  </Group>
                </HyperLink>
                {layout.map((item: LayoutData) => {
                  return (
                    <CardGroupLayout
                      text={item.text}
                      url={item.url}
                      value={item.value}
                      color={item.color}
                    />
                  )
                })}
                {item.guides.map((guides) => {
                  return (
                    <CardGroupLayout
                      text={guides.text}
                      url={guides.url}
                      value={guides.value}
                      color={guides.color}
                    />
                  )
                })}
              </Card>
            </Grid.Col>
          )
        })}
      </Grid>
    </section>
  )
}
