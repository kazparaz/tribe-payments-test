import type { AppProps } from 'next/app'
import '../styles/globals.scss'
import '../styles/reset.scss'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return <Component {...pageProps} />
}
export default MyApp
