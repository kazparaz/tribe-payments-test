import { GetCurrenciesResponse } from './pages/api/getCurrencies'

export const api = {
  getCurrencies: (page: number) => async (): Promise<GetCurrenciesResponse> =>
    fetch(`/api/getCurrencies?page=${page}`).then(
      (r): Promise<GetCurrenciesResponse> => r.json()
    ),
}
