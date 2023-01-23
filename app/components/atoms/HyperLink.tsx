import { Card } from "@mantine/core"
import { Link } from "@remix-run/react"
import { Children } from "react"

type links = {
  to?: string
  href?: string
  onClick?: Function
  className?: string
  children: string | JSX.Element
  style?: {}
}

export const HyperLink = (data: links) => {
  if (data.href) {
    return (
      <a
        style={data.style}
        className={data.className}
        href={data.href}
        rel="noreferrer"
        target="_blank"
      >
        {data.children}
      </a>
    )
  }
  if (data.to) {
    return (
      <Link style={data.style} className={data.className} to={data.to}>
        <>{data.children}</>
      </Link>
    )
  } else {
    return null
  }
}
