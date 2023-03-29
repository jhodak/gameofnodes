import { coinGeckoList } from "~/utils/utilities"

export async function getCoinGeckoData() {
  try {
    let res = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coinGeckoList.coins.toString()}&vs_currencies=${coinGeckoList.currency.toString()}&include_24hr_change=true&include_market_cap=true`
    )
    if (!res || res.status !== 200) {
      throw new Error(res.statusText)
    }

    return await res.json()
  } catch (e) {
    console.log(e)
    return {
      klever: {
        usd: 0.0,
        usd_market_cap: 0.0,
        usd_24h_change: 0.0,
      },
      presearch: {
        usd: 0.0,
        usd_market_cap: 0.0,
        usd_24h_change: 0.0,
      },
    }
  }
}
