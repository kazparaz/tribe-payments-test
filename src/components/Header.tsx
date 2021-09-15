import React from 'react'
import { colors } from '../styles/variables'

export const Header = (): JSX.Element => {
  return (
    <>
      <header>
        <h1>Crypto single-page application</h1>
      </header>

      <style jsx>{`
        header {
          padding: 20px;
          text-align: center;
          border-bottom: 10px solid ${colors.purple};
        }
      `}</style>
    </>
  )
}
