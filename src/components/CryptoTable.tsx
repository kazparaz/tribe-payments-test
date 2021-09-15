import { useHookstate } from '@hookstate/core'
import React, { useEffect, useState } from 'react'
import { api } from '../api'
import { useBreakpoint, useWindowSize } from '../hooks'
import { GetCurrenciesResponse } from '../pages/api/getCurrencies'
import { breakpoints } from '../styles/variables'

export const CryptoTable = (): JSX.Element => {
  const { isTablet, isMobile, isDesktop } = useBreakpoint()

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
            currencies.value.items.map((item) => (
              <tr key={item.id}>
                <td>
                  <img
                    src={item.logo}
                    alt={`${item.name} logo`}
                    width={32}
                    height={32}
                  />
                </td>
                <td>
                  {item.name} ({item.symbol})
                </td>
                {(isDesktop || isTablet) && (
                  <td>
                    {item.price.toFixed(4)} {item.currency}
                  </td>
                )}
                {isDesktop && <td>{item.volume_24h}</td>}
                <td>{item.percent_change_24h.toFixed(3)}%</td>
              </tr>
            ))}
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

        .price {
          width: 25%;
        }

        .volume {
          width: 30%;
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
