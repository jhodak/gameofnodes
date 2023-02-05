import { Group, Text } from "@mantine/core"
import { HyperLink } from "~/components/atoms/HyperLink"
import styles from "./styles.css"

export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}

export type LayoutListData = LayoutData[]

export type LayoutData = {
  text: string
  url?: string
  color?: string
  value: string | number
}

export const CardGroupLayout = (data: LayoutData) => {
  return (
    <Group
      className="cardGroupLayout"
      position={"apart"}
      noWrap
      key={data.text}
    >
      <Text className="title">{data.text}</Text>
      {data.url ? (
        <HyperLink className="text" href={data.url} color="yellow">
          {typeof data.value === "string" ? data.value : data.value.toFixed(2)}
        </HyperLink>
      ) : (
        <Text className="text" color={data.color || undefined}>
          {typeof data.value === "string" ? data.value : data.value.toFixed(2)}
        </Text>
      )}
    </Group>
  )
}
