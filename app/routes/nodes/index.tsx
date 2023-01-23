import { LoaderFunction, MetaFunction } from "@remix-run/node"
import { useLoaderData, useFetcher } from "@remix-run/react"
import { Group, Text, Card, Title, Grid } from "@mantine/core"
import { useEffect, useState } from "react"
import { getKlever } from "~/models/validator.server"
import {
  determineColor,
  determineColorPeerType,
  determineColorPercent,
  kleverOrder,
} from "~/utils/utilities"
import { KleverNodeCard } from "~/components/molecules/KleverNodeCard"
import { IntroText } from "~/components/molecules/IntroText"
import { pageDataType } from "~/types"

export const meta: MetaFunction = () => {
  return {
    title: "Validator Status - Game of Nodes",
  }
}

export const links = () => {
  //return [{ rel: "stylesheet", href: styles }]
}

export const loader: LoaderFunction = async () => {
  let data = getKlever()
  return data
}

export default function NodesPage() {
  let loaderData = useLoaderData()
  const [data, setData] = useState(loaderData)
  const fetcher = useFetcher()

  useEffect(() => {
    const interval = setInterval(() => {
      if (document.visibilityState === "visible") {
        fetcher.load("/nodes?index")
      }
    }, 3 * 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (fetcher.data) {
      setData(fetcher.data)
    }
  }, [fetcher.data])

  const pageData: pageDataType = {
    title: "Validators and Nodes",
    text: [
      `At Game of Nodes, we are proud to provide reliable and secure validators for a variety of cryptocurrency networks. Our validators are built with the latest technologies and are constantly monitored to ensure your network is running securely and reliably. With our real-time monitoring system, you can view the status and details of your validator in real-time and get peace of mind that your validators are running smoothly.`,
    ],
  }

  return (
    <section className="NodeList">
      <IntroText data={pageData} />
      <Grid justify="center" grow>
        {data &&
          data.map((item: any) => {
            if (item.chain === "Klever") {
              return (
                <Grid.Col
                  span={4}
                  key={item.name}
                  order={kleverOrder(item.name)}
                >
                  <KleverNodeCard
                    metrics={item.data.metrics}
                    name={item.name}
                    key={item.name}
                  />
                </Grid.Col>
              )
            }
          })}
      </Grid>
    </section>
  )
}
