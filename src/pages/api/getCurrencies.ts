import { NextApiRequest, NextApiResponse } from 'next'
import { getCmcListingsLatest } from './_getCmcListingsLatest'

export type CoinMarketApiResponse = any | string // our API wrapper error

export default function requestHandler(
  req: NextApiRequest,
  res: NextApiResponse<CoinMarketApiResponse>
): void {
  if (undefined) {
    res.status(400).json('"id" param is missing or invalid')
    return
  }

  void getCmcListingsLatest({
    start: 1,
    limit: 5,
    sort: 'volume_24h',
    sort_dir: 'desc',
    cryptocurrency_type: 'coins',
  }).then(({ json, status }) => res.status(status).json(json))
}
