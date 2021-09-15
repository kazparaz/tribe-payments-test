import { NextApiRequest } from 'next'

export type CoinMarketApiStatus = {
  credit_count: number
  elapsed: number
  error_code: number
  error_message: string | null
  timestamp: string
}

export type CmcApiError = {
  status: CoinMarketApiStatus
}

export const CMC_PRO_API_KEY = 'f519c4c4-a383-4bf9-846f-4ac26a85d562'

export function queryParamsToString(
  params: Record<string, string | number>
): string {
  return Object.entries(params)
    .map((entry) => entry.join('='))
    .join('&')
}

export function parseQueryParam(
  paramName: string,
  query: NextApiRequest['query']
): string | undefined {
  const value = query[paramName]
  return typeof value === 'string' ? value : undefined
}
