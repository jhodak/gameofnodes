import { Title, Text } from "@mantine/core"

type introText = {
  data: {
    title?: string
    text?: string[]
  }
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
        text.map((item) => {
          return (
            <Text component="p" fz="lg">
              {item}
            </Text>
          )
        })}
    </>
  )
}
