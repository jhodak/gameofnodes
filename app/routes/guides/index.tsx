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
// import { useEffect, useState } from "react"
// import { getKlever } from "~/models/validator.server"
// import {
//   determineColor,
//   determineColorPeerType,
//   determineColorPercent,
//   kleverOrder,
// } from "~/utils/utilities"
// import { KleverNodeCard } from "~/components/molecules/KleverNodeCard"

export const meta: MetaFunction = () => {
  return {
    title: "Networks - Game of Nodes",
  }
}

export const links = () => {
  //return [{ rel: "stylesheet", href: styles }]
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
      name: string
      displayURL: string
      url: string
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
          name: "Official Documentation:",
          displayURL: "https://docs.klever.finance/",
          url: "https://docs.klever.finance/klever-blockchain-node-operations/how-to-run-a-node",
        },
        {
          name: "Complete Guide:",
          displayURL: "https://www.thekuberoom.com/",
          url: "https://www.thekuberoom.com/node-setup/",
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
          name: "Official Documentation:",
          displayURL: "https://docs.presearch.io/",
          url: "https://docs.presearch.io/nodes/setup",
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
          return (
            <Grid.Col md={6} sm={12} xs={12} key={item.name}>
              <Card style={{ marginTop: "2rem" }}>
                <HyperLink
                  href={item.url}
                  style={{
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  <Group position="left" noWrap spacing="xs">
                    <img
                      style={{ width: "32px", marginRight: "1rem" }}
                      src={item.image}
                    />
                    <Title order={2}>{item.name}</Title>
                  </Group>
                </HyperLink>
                <Group position="apart">
                  <Text>Native Token:</Text>
                  <Text>
                    <HyperLink href={item.stats.tokenCMCURL} color="yellow">
                      {item.stats.tokenSymbol.toUpperCase()}
                    </HyperLink>
                  </Text>
                </Group>
                <Group position="apart">
                  <Text>Minimum Node Requirement:</Text>
                  <Text>
                    {`${item.stats.tokenRequirement.toLocaleString()} ${item.stats.tokenSymbol.toUpperCase()}`}
                  </Text>
                </Group>
                <Group position="apart">
                  <Text>Hardware:</Text>
                  <Text
                    color={determineColorByHardware(
                      item.stats.hardWareRequirement
                    )}
                    style={{ textTransform: "capitalize" }}
                  >
                    {item.stats.hardWareRequirement}
                  </Text>
                </Group>
                <Group position="apart">
                  <Text>Complexity:</Text>
                  <Text
                    color={determineColorByComplexity(item.stats.complexity)}
                    style={{ textTransform: "capitalize" }}
                  >
                    {item.stats.complexity}
                  </Text>
                </Group>
                {item.guides.map((guides) => {
                  return (
                    <Group position="apart" key={guides.url}>
                      <Text>{guides.name}</Text>
                      <Text color="yellow">
                        <HyperLink href={guides.url}>
                          {guides.displayURL}
                        </HyperLink>
                      </Text>
                    </Group>
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
