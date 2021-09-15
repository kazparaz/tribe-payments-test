import type { NextPage } from 'next'
import React from 'react'
import { CryptoTable } from '../components/CryptoTable'
import { DocumentHead } from '../components/DocumentHead'
import { Header } from '../components/Header'

const PageHome: NextPage = () => (
  <>
    <DocumentHead pageTitle='Crypto App' />
    <Header />
    <main>
      <CryptoTable />
    </main>
  </>
)

export default PageHome
