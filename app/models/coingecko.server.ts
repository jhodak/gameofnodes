import { coinGeckoList } from "~/utils/utilities"

export async function getCoinGeckoData() {
  let res = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${coinGeckoList.coins.toString()}&vs_currencies=${coinGeckoList.currency.toString()}&include_24hr_change=true&include_market_cap=true`
  )
  if (!res || res.status !== 200) {
    throw new Error(res.statusText)
  }

  return await res.json()
}
