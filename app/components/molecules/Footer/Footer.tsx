import { Group, Text } from "@mantine/core"
import styles from "./styles.css"

export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}

export default function Footer() {
  let year = new Date().getFullYear
  return (
    <footer>
      <Group position="apart">
        <Text>{`Game of Nodes ©${new Date().getFullYear()}`}</Text>
        <Text>Powered by: Coal and Sunshine</Text>
      </Group>
    </footer>
  )
}
