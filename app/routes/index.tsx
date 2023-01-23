import type { LinksFunction } from "@remix-run/node"
import { IntroText } from "~/components/molecules/IntroText"
import { pageDataType } from "~/types"

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

const pageData: pageDataType = {
  title: "Game of Nodes",
  text: [
    "At Game of Nodes, we are committed to providing the highest quality validators for cryptocurrency networks. We understand the importance of running secure and reliable validators and we take our role in the cryptocurrency community seriously. Our validators are built with the latest technologies and constantly monitored to ensure the security and reliability of your network.",
    "We provide detailed reports of our validators to ensure full transparency for our customers. Our team of experienced professionals are always available to answer your questions and provide guidance on setting up and maintaining your validator. With Game of Nodes, you can rest assured that your cryptocurrency network is running securely and reliably.",
  ],
}

export default function Index() {
  return (
    <>
      <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
        <IntroText data={pageData} />
      </div>
    </>
  )
}
