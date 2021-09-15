import { useHookstate } from '@hookstate/core'
import React, { useEffect } from 'react'
import { api } from '../api'
import { useBreakpoint } from '../hooks'
import { GetCurrenciesResponse } from '../pages/api/getCurrencies'
import { breakpoints, colors } from '../styles/variables'

export const CryptoTable = (): JSX.Element => {
  const { isTablet, isDesktop } = useBreakpoint()

  const currencies = useHookstate<GetCurrenciesResponse | undefined>(undefined)

  useEffect(() => {
    currencies.set(api.getCurrencies(1))
  }, [])

  return (
    <>
      <table>
        <thead>
          <tr>
            <th className='icon' />
            <th className='name'>Crypto</th>
            {(isDesktop || isTablet) && <th className='price'>Price</th>}
            {isDesktop && <th className='volume'>Volume 24h</th>}
            <th className='change'>Change</th>
          </tr>
        </thead>

        <tbody>
          {!currencies.promised &&
            typeof currencies.value === 'object' &&
            currencies.value.items.map((item) => {
              const changeDirection =
                item.percent_change_24h > 0
                  ? 'up'
                  : item.percent_change_24h < 0
                  ? 'down'
                  : 'none'
              return (
                <tr key={item.id}>
                  <td className='icon'>
                    <img
                      src={item.logo}
                      alt={`${item.name} logo`}
                      width={32}
                      height={32}
                    />
                  </td>
                  <td className='name'>
                    {item.name} ({item.symbol})
                  </td>
                  {(isDesktop || isTablet) && (
                    <td className='price'>
                      {item.price.toFixed(4)} {item.currency}
                    </td>
                  )}
                  {isDesktop && <td className='volume'>{item.volume_24h}</td>}
                  <td className='change'>
                    <span className={`changeDirection ${changeDirection}`}>
                      {
                        {
                          up: '🠕',
                          down: '🠗',
                          none: '',
                        }[changeDirection]
                      }
                    </span>
                    {item.percent_change_24h.toFixed(3)}%
                  </td>
                </tr>
              )
            })}
        </tbody>
      </table>

      <style jsx>{`
        table {
          width: 100%;
          padding: 20px;
          text-align: left;
          border-spacing: 10px;
          border-collapse: separate;
        }

        th {
          padding: 0 0 10px;
        }

        td {
          padding: 0;
          max-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .icon {
          width: 32px;
          min-width: 32px;
        }

        .name {
          width: 30%;
        }

        td.name {
          color: ${colors.purple};
        }

        .price {
          width: 25%;
        }

        .volume {
          width: 30%;
        }

        .changeDirection {
          padding-right: 5px;
        }

        .changeDirection.none {
          display: none;
        }

        .changeDirection.up {
          color: ${colors.green};
        }

        .changeDirection.down {
          color: ${colors.red};
        }

        @media (max-width: ${breakpoints.tablet}px) {
          .name {
            width: 50%;
          }

          .price {
            width: 35%;
          }
        }

        @media (max-width: ${breakpoints.mobile}px) {
          .name {
            width: 80%;
          }
        }
      `}</style>
    </>
  )
}
