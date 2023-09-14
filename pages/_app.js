import { Toaster } from 'react-hot-toast'
import 'react-quill/dist/quill.snow.css'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import Head from 'next/head'
import { CacheProvider } from '@emotion/react'
import { SettingsProvider } from '../src/contexts/SettingsContext'
import { CollapseDrawerProvider } from '../src/contexts/CollapseDrawerContext'
import ThemeConfig from '../src/theme'
import GlobalStyles from '../src/theme/globalStyles'
import createEmotionCache from '../src/utils/createEmotionCache'
import RtlLayout from '../src/components/RtlLayout'
import ProgressBar from '../src/components/ProgressBar'
import ThemePrimaryColor from '../src/components/ThemePrimaryColor'
import '../styles/global.css'
import { ContextProvider } from '../context/dataProviderContext'

const clientSideEmotionCache = createEmotionCache()

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  return (
    <>
      <ContextProvider>
        <SettingsProvider>
          <CollapseDrawerProvider>
            <CacheProvider value={emotionCache}>
              <Head>
                <meta
                  name="viewport"
                  content="initial-scale=1, width=device-width"
                />
              </Head>
              <ThemeConfig>
                <ThemePrimaryColor>
                  <RtlLayout>
                    <GlobalStyles />
                    <ProgressBar />
                    <Component {...pageProps} />
                  </RtlLayout>
                </ThemePrimaryColor>
              </ThemeConfig>
            </CacheProvider>
          </CollapseDrawerProvider>
        </SettingsProvider>
      </ContextProvider>
      <Toaster />
    </>
  )
}
