import { MantineColor, Text } from "@mantine/core"
import { Link } from "@remix-run/react"
import { CSSProperties } from "react"
import { inherits } from "util"

type links = {
  to?: string
  href?: string
  bold?: boolean
  onClick?: () => Function
  className?: string
  children: JSX.Element | string | number
  color?: MantineColor
}

export const HyperLink = (data: links) => {
  if (data.href) {
    return (
      <Text
        component="span"
        color={data.color}
        weight={data.bold ? "700" : "500"}
      >
        <a
          style={{ color: "inherit", textDecoration: "none" }}
          className={data.className}
          href={data.href}
          rel="noreferrer"
          target="_blank"
        >
          {data.children}
        </a>
      </Text>
    )
  }
  if (data.to) {
    return (
      <Text
        component="span"
        color={data.color}
        weight={data.bold ? "700" : "500"}
      >
        <Link
          style={{ color: "inherit", textDecoration: "none" }}
          className={data.className}
          to={data.to}
          prefetch="intent"
        >
          <>{data.children}</>
        </Link>
      </Text>
    )
  } else {
    return null
  }
}
