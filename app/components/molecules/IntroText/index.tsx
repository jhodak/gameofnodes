import { Title, Text } from "@mantine/core"
import { pageDataType } from "~/types"

type introText = {
  data: pageDataType
}

export const IntroText = (data: introText) => {
  const { title, text } = data.data
  return (
    <>
      {title && (
        <Title order={1} align="center" style={{ marginBottom: "5rem" }}>
          {title}
        </Title>
      )}
      {text &&
        text.map((item, index) => {
          return (
            <Text component="p" fz="lg" key={index}>
              {item}
            </Text>
          )
        })}
    </>
  )
}
