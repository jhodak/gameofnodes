import { Card, Group, Title, Text } from "@mantine/core"
import { determineColorPercentUp } from "~/utils/utilities"

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
  return (
    <Card>
      <Title order={3} align="center">
        {data.meta.description}
      </Title>
      <Group position="apart">
        <Text weight={700}>Status:</Text>
        <Text color={data.status.connected ? "green" : "red"}>
          {data.status.connected ? "Connected" : "Disconnected"}
        </Text>
      </Group>
      <Group position="apart">
        <Text weight={700}>Server Pool:</Text>
        <Text>{data.meta.gateway_pool}</Text>
      </Group>
      <Group position="apart">
        <Text weight={700}>Uptime:</Text>
        <Text color={determineColorPercentUp(data.period.uptime_percentage)}>
          {data.period.uptime_percentage}
        </Text>
      </Group>
      <Group position="apart">
        <Text weight={700}>Successful Requests:</Text>
        <Text>{data.period.successful_requests}</Text>
      </Group>
      <Group position="apart">
        <Text weight={700}>Pre Earned:</Text>
        <Text>{data.period.total_pre_earned.toFixed(2)}</Text>
      </Group>
    </Card>
  )
}
