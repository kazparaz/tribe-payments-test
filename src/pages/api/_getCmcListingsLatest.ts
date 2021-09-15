import {
  CMC_PRO_API_KEY,
  CmcApiError,
  CoinMarketApiStatus,
  queryParamsToString,
} from './_helpers'

// https://coinmarketcap.com/api/documentation/v1/#operation/getV1CryptocurrencyListingsLatest

type CmcListingsLatestQueryParams = {
  start?: number
  limit?: number
  sort?: 'name' | 'price' | 'volume_24h' | 'percent_change_24h' // some of the sort params
  sort_dir?: 'asc' | 'desc'
  cryptocurrency_type: 'all' | 'coins' | 'tokens'
}

// Not all properties typed
type CmcListingsLatestSuccess = {
  data: {
    id: string // The unique CoinMarketCap ID for this cryptocurrency.
    name: string // The name of this cryptocurrency.
    symbol: string // The ticker symbol for this cryptocurrency.
    slug: string // The web URL friendly shorthand version of this cryptocurrency name.
    cmc_rank: number // The cryptocurrency's CoinMarketCap rank by market cap.
    num_market_pairs: number // The number of active trading pairs available for this cryptocurrency across supported exchanges.
    circulating_supply: number // The approximate number of coins circulating for this cryptocurrency.
    total_supply: number // The approximate total amount of coins in existence right now (minus any coins that have been verifiably burned).
    market_cap_by_total_supply?: number // The market cap by total supply.
    max_supply: number // The expected maximum limit of coins ever to be available for this cryptocurrency.
    quote: Record<
      string,
      {
        price: number
        volume_24h: number
        percent_change_24h: number
      }
    >
  }[]
  status: CoinMarketApiStatus
}

export function getCmcListingsLatest(
  queryParams: CmcListingsLatestQueryParams
): Promise<{ json: CmcApiError | CmcListingsLatestSuccess; status: number }> {
  const queryString = queryParamsToString(queryParams)
  return fetch(
    `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?${queryString}`,
    {
      headers: {
        Accept: 'application/json',
        'Accept-Encoding': 'deflate, gzip',
        'X-CMC_PRO_API_KEY': CMC_PRO_API_KEY,
      },
    }
  ).then((r) =>
    r.json().then((json: CmcApiError | CmcListingsLatestSuccess) => ({
      json,
      status: r.status,
    }))
  )
}
