import { GetStaticProps, GetStaticPaths } from 'next'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { ParsedUrlQuery } from 'querystring'

import { SUPPORTED_LANGUAGES } from '@constants/config'

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

export const getStaticProps: GetStaticProps<GameProps, languageParams> = (
  context
) => {
  const { params } = context
  const { language } = params!

  return {
    props: {
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
