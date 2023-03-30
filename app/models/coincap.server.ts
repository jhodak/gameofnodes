import { coinList } from "~/utils/utilities"

export async function getCoinCapData() {
  try {
    let res = await fetch(
      `https://api.coincap.io/v2/assets?ids=${coinList.coins.toString()}`
    )
    if (!res || res.status !== 200) {
      throw new Error(res.statusText)
    }
    let data = await res.json()
    return data.data
  } catch (e) {
    console.log(e)
    return {
      data: [
        {
          id: "klever",
          priceUsd: "0.00",
          changePercent24Hr: "0.00",
          marketCapUsd: "0.00",
        },
        {
          id: "presearch",
          priceUsd: "0.00",
          changePercent24Hr: "0.00",
          marketCapUsd: "0.00",
        },
      ],
    }
  }
}
