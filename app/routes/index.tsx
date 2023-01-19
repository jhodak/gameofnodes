import type { LinksFunction } from "@remix-run/node" // or cloudflare/deno
import { Text, Title } from "@mantine/core"

export const links: LinksFunction = () => {
  return [
    {
      rel: "icon",
      href: "/crown.svg",
      type: "image/svg+xml",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/crown.svg",
      type: "image/svg+xml",
    },
    {
      rel: "mask-icon",
      href: "/crown.svg",
      type: "image/svg+xml",
      color: "#ffcd00",
    },
  ]
}

export default function Index() {
  return (
    <>
      <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
        <Title order={1}>Welcome to Game of Nodes</Title>
        <Text fz="md" component="p">
          At Game of Nodes, we are committed to providing the highest quality
          validators for cryptocurrency networks. We understand the importance
          of running secure and reliable validators and we take our role in the
          cryptocurrency community seriously. Our validators are built with the
          latest technologies and constantly monitored to ensure the security
          and reliability of your network.
        </Text>

        <Text fz="md" component="p">
          We provide detailed reports of our validators to ensure full
          transparency for our customers. Our team of experienced professionals
          are always available to answer your questions and provide guidance on
          setting up and maintaining your validator. With Game of Nodes, you can
          rest assured that your cryptocurrency network is running securely and
          reliably.
        </Text>
        <img src="/Dalle-computer-chips.png" />
      </div>
    </>
  )
}
