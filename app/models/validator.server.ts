import { nodeList } from "~/utils/utilities"

export async function getKlever() {
  let kleverData: any = []
  await Promise.all(
    nodeList.map(async (item) => {
      try {
        let res = await fetch(item.ip)
        if (!res || res.status !== 200) {
          throw new Error(res.statusText)
        } else {
          let dataInner = await res.json()
          kleverData.push({
            data: dataInner.data,
            name: item.name,
            chain: item.chain,
          })
        }
      } catch (e) {
        kleverData.push({
          status: "Error",
          message: "Unable to access the node",
          name: item.name,
          chain: item.chain,
        })
        console.log(e)
      }
    })
  )
  return kleverData
}

export async function getPresearch() {
  let key = process.env.presearchAPIKey
  let res = await fetch(
    `https://nodes.presearch.com/api/nodes/status/${key}?stats=true`
  )
  if (!res || res.status !== 200) {
    throw new Error(res.statusText)
  }
  return await res.json()
}

// Unused currently
export async function getKleverByIP(url: string) {
  let res = await fetch(url)
  if (!res || res.status !== 200) {
    throw new Error(res.statusText)
  }
  return await res.json()
}
