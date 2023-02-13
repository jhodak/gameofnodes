import { LoaderFunction, MetaFunction } from "@remix-run/node"
import { useLoaderData, useFetcher } from "@remix-run/react"
import { Title, Grid } from "@mantine/core"
import { useEffect, useState } from "react"
import { getKlever, getPresearch } from "~/models/validator.server"
import { kleverOrder } from "~/utils/utilities"
import {
  KleverNodeCard,
  KleverListData,
  links as kleverNodeLinks,
} from "~/components/molecules/KleverNodeCard"
import { IntroText } from "~/components/molecules/IntroText"
import { pageDataType } from "~/types"
import { cache } from "~/utils/db.server"
import {
  PresearchNodeCard,
  PresearchListType,
  links as presearchNodeLinks,
} from "~/components/molecules/PresearchNodeCard"
import styles from "~/styles/nodesStyles.css"

export const meta: MetaFunction = () => {
  return {
    title: "Validator Status - Game of Nodes",
  }
}

export const links = () => {
  return [
    ...presearchNodeLinks(),
    ...kleverNodeLinks(),
    { rel: "stylesheet", href: styles },
  ]
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

  // set data into state usable by the page
  const [data, setData] = useState(loaderData)
  const fetcher = useFetcher()

  // every interval goes and grabs potentially new data
  useEffect(() => {
    const interval = setInterval(() => {
      if (document.visibilityState === "visible") {
        fetcher.load("/nodes?index")
      }
    }, 3 * 1000)
    return () => clearInterval(interval)
  }, [])

  // updates the state data when it changes to re-render page with new data
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
            if (item.chain === "Klever" && item.data) {
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
      {data.presearch &&
        Object.values(loaderData.presearch.nodes) !== undefined && (
          <Title order={2} align="center">
            Presearch Nodes
          </Title>
        )}
      {Object.values(loaderData.presearch.nodes) !== undefined && (
        <Grid justify="center" grow>
          {Object.values(loaderData.presearch.nodes).map((item) => {
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
