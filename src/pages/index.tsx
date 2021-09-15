import type { NextPage } from 'next'
import { DocumentHead } from '../components/DocumentHead'

const PageHome: NextPage = () => {
  return (
    <>
      <DocumentHead pageTitle='Home' />
      <main>Content</main>
    </>
  )
}

export default PageHome
