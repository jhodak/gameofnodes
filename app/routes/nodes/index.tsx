import { LoaderFunction, MetaFunction } from "@remix-run/node"
import { useLoaderData, useFetcher } from "@remix-run/react"
import { Title, Grid, Text, Card, Group } from "@mantine/core"
import { useEffect, useState } from "react"
import { getKlever, getPresearch } from "~/models/validator.server"
import { kleverOrder, determineColorPercentUp } from "~/utils/utilities"
import {
  KleverNodeCard,
  KleverListData,
} from "~/components/molecules/KleverNodeCard"
import { IntroText } from "~/components/molecules/IntroText"
import { pageDataType } from "~/types"
import { cache } from "~/utils/db.server"
import {
  PresearchNodeCard,
  PresearchListType,
} from "~/components/molecules/PresearchNodeCard"

export const meta: MetaFunction = () => {
  return {
    title: "Validator Status - Game of Nodes",
  }
}

export const links = () => {
  //return [{ rel: "stylesheet", href: styles }]
}

export const loader: LoaderFunction = async () => {
  let kleverData: KleverListData = await getKlever()
  let presearchData: PresearchListType | undefined
  if (cache.has("presearch")) {
    presearchData = await cache.get("presearch")
  } else {
    presearchData = await getPresearch()
    cache.set("presearch", presearchData, 60 * 20)
  }

  let data = { klever: kleverData, presearch: presearchData }
  return data
}

type loaderDataType = {
  klever: KleverListData[]
  presearch: { success: boolean; nodes: PresearchListType }
}

export default function NodesPage() {
  let loaderData: loaderDataType = useLoaderData()
  const [data, setData] = useState(loaderData)
  const [presearch, setPresearch] = useState<PresearchListType>(
    Object.values(loaderData.presearch.nodes)
  )
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
      setPresearch(Object.values(data.presearch.nodes))
    }
  }, [fetcher.data])

  const pageData: pageDataType = {
    title: "Validators and Nodes",
    text: [
      `At Game of Nodes, we are proud to provide reliable and secure validators for a variety of cryptocurrency networks. Our validators are built with the latest technologies and are constantly monitored to ensure your network is running securely and reliably. With our real-time monitoring system, you can view the status and details of your validator in real-time and get peace of mind that your validators are running smoothly.`,
    ],
  }

  return (
    <section className="NodesPage">
      <IntroText data={pageData} />
      {data.klever && (
        <Title order={2} align="center">
          Klever Nodes
        </Title>
      )}
      {data.klever && (
        <Grid justify="center" grow>
          {data.klever.map((item: KleverListData) => {
            if (item.chain === "Klever") {
              return (
                <Grid.Col
                  md={4}
                  sm={6}
                  xs={12}
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
      )}
      {data.presearch && (
        <Title
          order={2}
          align="center"
          style={{ marginTop: "4rem", marginBottom: "2rem" }}
        >
          Presearch Nodes
        </Title>
      )}
      {presearch[0].meta !== undefined && (
        <Grid justify="center" grow>
          {presearch.map((item) => {
            const { meta, status, period } = item
            return (
              <Grid.Col md={4} sm={6} xs={12} key={meta.description}>
                <PresearchNodeCard
                  meta={meta}
                  status={status}
                  period={period}
                />
              </Grid.Col>
            )
          })}
        </Grid>
      )}
    </section>
  )
}
