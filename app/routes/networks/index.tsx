import { LoaderFunction, MetaFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { Card, Group, Title, Text } from "@mantine/core"
import { HyperLink } from "~/components/atoms/HyperLink"
import { IntroText } from "~/components/molecules/IntroText"
import { pageDataType } from "~/types"

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

export default function NetworksPage() {
  let loaderData = useLoaderData()

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
  }[]

  const networkData: networkDataType = [
    {
      name: "Klever",
      image: "/logos/klever.svg",
      url: "https://klever.finance/",
      text: `Klever is a cutting-edge blockchain platform that is designed to meet the needs of developers and businesses. Our platform is built on a robust and secure infrastructure that is designed to support the development and deployment of decentralized applications and smart contracts.`,
    },
    {
      name: "Presearch",
      image: "/logos/presearch.svg",
      url: "https://presearch.io/",
      text: `Presearch is a community-powered, decentralized search engine that provides better results while protecting your privacy and rewarding you when you search.`,
    },
  ]

  return (
    <section className="NetworkPage">
      <IntroText data={pageData} />
      {networkData.map((item) => {
        return (
          <Card style={{ marginTop: "2rem" }} key={item.name}>
            <Group position="apart" noWrap spacing="lg">
              <HyperLink href={item.url}>
                <img style={{ width: "64px" }} src={item.image} />
              </HyperLink>
              <div>
                <Title order={2}>
                  <HyperLink
                    style={{ color: "inherit", textDecoration: "inherit" }}
                    href={item.url}
                  >
                    {item.name}
                  </HyperLink>
                </Title>
                <Text>{item.text}</Text>
              </div>
            </Group>
          </Card>
        )
      })}
    </section>
  )
}
