import { NextApiRequest, NextApiResponse } from 'next'
import { getCmcInfo } from './_getCmcInfo'
import { getCmcListingsLatest } from './_getCmcListingsLatest'
import { parseQueryParam } from './_helpers'

const PAGE_SIZE = 20 // TODO replace to 20

type GetCurrenciesItem = {
  id: number
  name: string
  symbol: string
  logo: string
  price: number
  volume_24h: number
  percent_change_24h: number
}

export type GetCurrenciesResponse =
  | {
      nextPage: number | null
      items: GetCurrenciesItem[]
    }
  | string // our API wrapper error

async function getCurrencies(
  req: NextApiRequest,
  res: NextApiResponse<GetCurrenciesResponse>
): Promise<void> {
  const pageAsString = parseQueryParam('page', req.query)
  const page = pageAsString ? parseInt(pageAsString, 10) : undefined

  if (page === undefined || isNaN(page)) {
    res.status(400).json('"page" param is missing or invalid')
    return
  }

  const listingResponse = await getCmcListingsLatest({
    start: page * PAGE_SIZE - PAGE_SIZE + 1,
    limit: PAGE_SIZE,
    sort: 'volume_24h', // TODO
    sort_dir: 'desc', // TODO
    cryptocurrency_type: 'coins',
  })

  if (listingResponse.status !== 200 || !('data' in listingResponse.json)) {
    res
      .status(listingResponse.status === 200 ? 400 : listingResponse.status)
      .json(listingResponse.json.status.error_message ?? 'Api error')
    return
  }

  const infoResponse = await getCmcInfo({
    id: listingResponse.json.data.map((item) => item.id),
  })

  if (infoResponse.status !== 200 || !('data' in infoResponse.json)) {
    res
      .status(infoResponse.status === 200 ? 400 : infoResponse.status)
      .json(infoResponse.json.status.error_message ?? 'Api error')
    return
  }

  const combinedResponse = listingResponse.json.data.flatMap(
    (item): GetCurrenciesItem[] => {
      const quote = Object.values(item.quote)[0]
      const info =
        'data' in infoResponse.json
          ? infoResponse.json.data[item.id]
          : undefined
      return quote && info
        ? [
            {
              id: item.id,
              name: item.name,
              symbol: item.symbol,
              logo: info.logo,
              price: quote.price,
              volume_24h: quote.volume_24h,
              percent_change_24h: quote.percent_change_24h,
            },
          ]
        : []
    }
  )

  const isLastPage = listingResponse.json.data.length > PAGE_SIZE // TODO check if working

  res.status(200).json({
    nextPage: isLastPage ? null : page + 1,
    items: combinedResponse,
  })
}

export default function requestHandler(
  req: NextApiRequest,
  res: NextApiResponse<GetCurrenciesResponse>
): void {
  void getCurrencies(req, res)
}
