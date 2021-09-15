import React from 'react'
import { baseFontSize, colors } from './variables'

export const GlobalStyles = (): JSX.Element => {
  return (
    <style jsx global>{`
      /* Make page content full height always */
      html,
      body,
      div#__next {
        height: 100%;
      }

      html,
      body {
        font-family: Poppins, -apple-system, BlinkMacSystemFont, Segoe UI,
          Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
          Helvetica Neue, sans-serif;
        font-size: ${baseFontSize}px;
        line-height: 1;
        color: ${colors.gray};
        font-weight: lighter;
      }

      h1,
      h2,
      h3,
      h4 {
        color: ${colors.purple};
      }
    `}</style>
  )
}
