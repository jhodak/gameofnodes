import { Card, Title } from "@mantine/core"
import { determineColorPercentUp } from "~/utils/utilities"
import {
  CardGroupLayout,
  LayoutData,
  links as cardGroupLinks,
} from "../CardGroupLayout"
import styles from "./styles.css"

export const links = () => {
  return [...cardGroupLinks(), { rel: "stylesheet", href: styles }]
}

export type PresearchListType = {
  meta: {
    description: string
    url: string
    server_description: string | null
    server_url: string | null
    gateway_pool: string
    remote_addr: string
    version: string
  }
  status: {
    connected: boolean
    blocked: boolean
    in_current_state_since: string
    minutes_in_current_state: number
  }
  period: {
    avg_latency_ms: number
    avg_latency_score: number
    avg_reliability_score: number
    avg_staked_capacity_percent: number
    avg_success_rate: number
    avg_success_rate_score: number
    avg_uptime_score: number
    avg_utilization_percent: number
    connections: {
      num_connections: number
      most_recent_connection: string
    }
    disconnections: {
      num_disconnections: number
      most_recent_disconnection: string
    }
    period_end_date: string
    period_seconds: number
    period_start_date: string
    rewardable_requests: number
    successful_requests: number
    total_pre_earned: number
    total_requests: number
    total_uptime_seconds: number
    uptime_percentage: number
  }
}[]

export type PresearchItemType = {
  meta: {
    description: string
    url: string
    server_description: string | null
    server_url: string | null
    gateway_pool: string
    remote_addr: string
    version: string
  }
  status: {
    connected: boolean
    blocked: boolean
    in_current_state_since: string
    minutes_in_current_state: number
  }
  period: {
    avg_latency_ms: number
    avg_latency_score: number
    avg_reliability_score: number
    avg_staked_capacity_percent: number
    avg_success_rate: number
    avg_success_rate_score: number
    avg_uptime_score: number
    avg_utilization_percent: number
    connections: {
      num_connections: number
      most_recent_connection: string
    }
    disconnections: {
      num_disconnections: number
      most_recent_disconnection: string
    }
    period_end_date: string
    period_seconds: number
    period_start_date: string
    rewardable_requests: number
    successful_requests: number
    total_pre_earned: number
    total_requests: number
    total_uptime_seconds: number
    uptime_percentage: number
  }
}

export const PresearchNodeCard = (data: PresearchItemType) => {
  const layout = [
    {
      text: "Status :",
      value: data.status.connected ? "Connected" : "Disconnected",
      color: data.status.connected ? "green" : "red",
    },
    { text: "Server Pool :", value: data.meta.gateway_pool },
    {
      text: "Uptime :",
      value: data.period.uptime_percentage,
      color: determineColorPercentUp(data.period.uptime_percentage),
    },
    { text: "Successful Requests:", value: data.period.successful_requests },
    {
      text: "Pre Earned:",
      value: data.period.total_pre_earned.toFixed(2),
    },
  ]
  return (
    <Card className="presearchNodeCard">
      <Title order={3} align="center">
        {data.meta.description}
      </Title>
      {layout.map((item: LayoutData) => {
        return (
          <CardGroupLayout
            key={item.text}
            text={item.text}
            url={item.url}
            value={item.value}
            color={item.color}
          />
        )
      })}
    </Card>
  )
}
