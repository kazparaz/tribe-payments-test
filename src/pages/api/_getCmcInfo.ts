import {
  CMC_PRO_API_KEY,
  CmcResponseError,
  CmcResponseStatus,
  queryParamsToString,
} from './_helpers'

// https://coinmarketcap.com/api/documentation/v1/#operation/getV1CryptocurrencyInfo

type CmcInfoQueryParams = {
  id: number[]
}

// Not all properties typed
type CmcInfoResponseSuccess = {
  data: Record<
    string,
    | {
        id: string // The unique CoinMarketCap ID for this cryptocurrency.
        name: string // The name of this cryptocurrency.
        symbol: string // The ticker symbol for this cryptocurrency.
        slug: string // The web URL friendly shorthand version of this cryptocurrency name.
        category: 'coin' | 'token' // The category for this cryptocurrency.
        logo: string // Link to a CoinMarketCap hosted logo png for this cryptocurrency.
      }
    | undefined
  >
  status: CmcResponseStatus
}

export function getCmcInfo(queryParams: CmcInfoQueryParams): Promise<{
  json: CmcResponseError | CmcInfoResponseSuccess
  status: number
}> {
  const queryString = queryParamsToString({
    id: queryParams.id.join(','),
  })
  return fetch(
    `https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?${queryString}`,
    {
      headers: {
        Accept: 'application/json',
        'Accept-Encoding': 'deflate, gzip',
        'X-CMC_PRO_API_KEY': CMC_PRO_API_KEY,
      },
    }
  ).then((r) =>
    r.json().then((json: CmcResponseError | CmcInfoResponseSuccess) => ({
      json,
      status: r.status,
    }))
  )
}
