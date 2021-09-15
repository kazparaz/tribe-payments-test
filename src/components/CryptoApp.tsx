import React from 'react'
import { DocumentHead } from './DocumentHead'
import { Header } from './Header'

export const CryptoApp = (): JSX.Element => {
  return (
    <>
      <DocumentHead pageTitle='Crypto App' />
      <Header />
      <main>Content</main>
    </>
  )
}
