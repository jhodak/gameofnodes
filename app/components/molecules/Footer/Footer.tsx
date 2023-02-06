import { Group, Text, Footer } from "@mantine/core"
import styles from "./styles.css"

export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}

export default function FooterLayout() {
  let year = new Date().getFullYear
  return (
    <Footer className="footer" height="58">
      <Group position="apart">
        <Text>{`Game of Nodes ©${new Date().getFullYear()}`}</Text>
        <Text>Powered by: Coal and Sunshine</Text>
      </Group>
    </Footer>
  )
}
