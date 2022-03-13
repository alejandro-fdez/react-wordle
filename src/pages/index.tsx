import type { GetStaticPropsContext } from 'next'
import Head from 'next/head'
import dynamic from 'next/dynamic'

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

// export async function getStaticProps({ locale }: GetStaticPropsContext) {
//   return {
//     props: {
//       locale: locale,
//     },
//   }
// }

export default Main
