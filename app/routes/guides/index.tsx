import { LoaderFunction, MetaFunction } from "@remix-run/node"
import { Link, useLoaderData } from "@remix-run/react"
import { Card, Group, Title, Text, Grid } from "@mantine/core"
import { HyperLink } from "~/components/atoms/HyperLink"
import { IntroText } from "~/components/molecules/IntroText"
import { pageDataType } from "~/types"
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
      complexity: "easy" | "medium" | "hard"
      hardWareRequirement: "light" | "moderate" | "significant"
    }
    guides: {
      name: string
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
        complexity: "medium",
        hardWareRequirement: "moderate",
      },
      guides: [{ name: "Official Guide", url: "https://presearch.io" }],
      url: "https://klever.finance/",
      text: `Klever is a cutting-edge blockchain platform that is designed to meet the needs of developers and businesses. Our platform is built on a robust and secure infrastructure that is designed to support the development and deployment of decentralized applications and smart contracts.`,
    },
    {
      name: "Presearch",
      image: "/logos/presearch.svg",
      stats: {
        tokenRequirement: 4000,
        complexity: "easy",
        hardWareRequirement: "light",
      },
      guides: [{ name: "Official Guide", url: "https://presearch.io" }],
      url: "https://presearch.io/",
      text: `Presearch is a community-powered, decentralized search engine that provides better results while protecting your privacy and rewarding you when you search.`,
    },
  ]

  return (
    <section className="NetworkList">
      <IntroText data={pageData} />
      <Grid>
        {guidesData.map((item) => {
          return (
            <Grid.Col span={6}>
              <Card style={{ marginTop: "2rem" }}>
                <HyperLink
                  href={item.url}
                  style={{
                    color: "inherit",
                    textDecoration: "none",
                    display: "flex",
                    flexWrap: "nowrap",
                    alignItems: "center",
                    justifyItems: "end",
                    width: "100%",
                  }}
                >
                  <Group position="left" noWrap spacing="xs">
                    <>
                      <img
                        style={{ width: "32px", marginRight: "1rem" }}
                        src={item.image}
                      />
                      <Title order={2}>{item.name}</Title>
                    </>
                  </Group>
                </HyperLink>
                <div>
                  <Text>{item.text}</Text>
                </div>
              </Card>
            </Grid.Col>
          )
        })}
      </Grid>
    </section>
  )
}
