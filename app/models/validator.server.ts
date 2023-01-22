import { nodeList } from "~/utils/utilities"

type KleverValidator = {
  any: any
}

export async function getKlever() {
  let result
  let promises: any = []
  // let res = await fetch(nodeList[0].ip)
  // data.push({ ...res.json(), name: nodeList[0].name, chain: nodeList[0].chain })
  await Promise.all(
    nodeList.map(async (item) => {
      let res = await fetch(item.ip)
      let dataInner = await res.json()
      promises.push({
        data: dataInner.data,
        name: item.name,
        chain: item.chain,
      })
    })
  )
  result = await Promise.all(promises)
  return result
}

export async function getKleverByIP(url: string) {
  let res = await fetch(url)
  let data = res.json()
  return data
}
