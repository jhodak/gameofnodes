import { nodeList } from "~/utils/utilities"

export async function getKlever() {
  let kleverData: any = []
  await Promise.all(
    nodeList.map(async (item) => {
      let res = await fetch(item.ip)
      let dataInner = await res.json()
      kleverData.push({
        data: dataInner.data,
        name: item.name,
        chain: item.chain,
      })
    })
  )
  return kleverData
}

export async function getPresearch() {
  let key = process.env.presearchAPIKey
  let res = await fetch(
    `https://nodes.presearch.com/api/nodes/status/${key}?stats=true`
  )
  let data = res.json()
  return data
}

export async function getKleverByIP(url: string) {
  let res = await fetch(url)
  let data = res.json()
  return data
}
