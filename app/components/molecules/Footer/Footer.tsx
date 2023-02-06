import { Footer, Text, Grid, Container } from "@mantine/core"
import styles from "./styles.css"

export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}

export default function FooterLayout() {
  let year = new Date().getFullYear
  return (
    <Footer className="footer" height="58">
      <Container fluid>
        <Grid>
          <Grid.Col md={4} sm={0}></Grid.Col>
          <Grid.Col md={4} sm={12}>
            <Text
              align="center"
              component="p"
            >{`©${new Date().getFullYear()} Game of Nodes`}</Text>
          </Grid.Col>
          <Grid.Col md={4} sm={12}>
            <Text component="p">Powered by: Coal and Sunshine</Text>
          </Grid.Col>
        </Grid>
      </Container>
    </Footer>
  )
}
