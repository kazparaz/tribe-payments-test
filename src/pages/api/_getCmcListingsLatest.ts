import {
  CMC_PRO_API_KEY,
  CmcResponseError,
  CmcResponseStatus,
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
type CmcListingsLatestResponseSuccess = {
  data: {
    id: number // The unique CoinMarketCap ID for this cryptocurrency.
    name: string // The name of this cryptocurrency.
    symbol: string // The ticker symbol for this cryptocurrency.
    slug: string // The web URL friendly shorthand version of this cryptocurrency name.
    quote: Record<
      string,
      {
        price: number
        volume_24h: number
        percent_change_24h: number
      }
    >
  }[]
  status: CmcResponseStatus
}

export function getCmcListingsLatest(
  queryParams: CmcListingsLatestQueryParams
): Promise<{
  json: CmcResponseError | CmcListingsLatestResponseSuccess
  status: number
}> {
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
    r
      .json()
      .then((json: CmcResponseError | CmcListingsLatestResponseSuccess) => ({
        json,
        status: r.status,
      }))
  )
}
