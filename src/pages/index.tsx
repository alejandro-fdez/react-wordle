import { GetStaticPropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import dynamic from 'next/dynamic'

import { ALL_NS } from '@core/i18n/namespaces'

const DynamicGame = dynamic(
  () => import('@components/pages/game/game.component'),
  {
    ssr: false,
  }
)

function Main() {
  return (
    <>
      <Head>
        <title>Wordle espanol</title>
        <meta name="description" content="A component library starter kit" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DynamicGame />
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
