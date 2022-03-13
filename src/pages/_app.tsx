import type { AppProps } from 'next/app'
import { NextComponentType, NextPageContext } from 'next'
import { AlertProvider } from '@context/AlertContext'
import { appWithTranslation } from 'next-i18next'

import '@styles/App.css'
import '@components/pages/game/game.styles.css'

function MyApp({ Component, pageProps }: AppProps) {
  return <Layout Component={Component} pageProps={pageProps} />
}

interface LayoutProps {
  Component: NextComponentType<NextPageContext, any, any>
  pageProps: any
}

const Layout = ({ Component, pageProps }: LayoutProps): JSX.Element => {
  return (
    <AlertProvider>
      <div className="layout">
        <Component {...pageProps} />
      </div>
    </AlertProvider>
  )
}

export default appWithTranslation(MyApp)
