import { GetStaticPropsContext, GetStaticPaths } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { ParsedUrlQuery } from 'querystring'

import { SUPPORTED_LANGUAGES } from '@constants/config'
import { STRINGS_NS } from '@core/i18n/namespaces'

const DynamicGame = dynamic(
  () => import('@components/pages/game/game.component'),
  {
    ssr: false,
  }
)

interface GameProps {
  language: string
}

function Main({ language }: GameProps) {
  return (
    <>
      <Head>
        <title>Wordle {language}</title>
        <meta name="description" content="A component library starter kit" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DynamicGame language={language} />
    </>
  )
}

export default Main

interface languageParams extends ParsedUrlQuery {
  language: string
}

export async function getStaticProps({
  locale,
  params,
}: GetStaticPropsContext) {
  const { language } = params!

  return {
    props: {
      ...(await serverSideTranslations(locale as string, [STRINGS_NS])),
      language,
    },
  }
}

export const getStaticPaths: GetStaticPaths<languageParams> = () => {
  const paths = SUPPORTED_LANGUAGES.map((languageCode) => ({
    params: {
      language: languageCode as string,
    },
  }))

  return {
    paths,
    fallback: false,
  }
}
