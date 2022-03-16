import { GetStaticPropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'

import { ALL_NS } from '@core/i18n/namespaces'

function Main() {
  return (
    <>
      <Head>
        <title>Wordle espanol</title>
        <meta name="description" content="A component library starter kit" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>404 - Page Not Found</h1>
    </>
  )
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, [...ALL_NS])),
    },
  }
}

export default Main
