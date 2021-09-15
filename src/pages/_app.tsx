import type { AppProps } from 'next/app'
import '../styles/reset.css'
import { GlobalStyles } from '../styles/GlobalStyles'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Component {...pageProps} />
      <GlobalStyles />
    </>
  )
}
export default MyApp
