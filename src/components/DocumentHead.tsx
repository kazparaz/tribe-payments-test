import Head from 'next/head'

export type DocumentHeadProps = { pageTitle: string }

export const DocumentHead = (props: DocumentHeadProps): JSX.Element => (
  <Head>
    <title>{props.pageTitle}</title>
    <link rel='icon' href='/favicon.ico' />
  </Head>
)
