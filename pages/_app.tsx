import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { ThemeProvider } from '@mui/material/styles'
import { styled } from '@mui/system'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider } from '@emotion/react'
import createEmotionCache from 'src/createEmotionCache'

import 'src/globals.css'
import theme from 'src/theme'
import { AppProps } from 'next/app'
import { isTablet } from 'react-device-detect'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

const options = { shouldForwardProp: (prop: string) => !String(prop).includes('$') }
const StyledComponentContainer = styled('div', options)<{$isShortView: boolean}>(({ $isShortView }) => ({
  height: $isShortView ? '90vh' : '100vh'
}))

export default function MyApp (props: AppProps) {
  // @ts-ignore
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  const [isShortView, setIsShortView] = useState<boolean>(false)

  useEffect(() => {
    if (isTablet) {
      setIsShortView(isTablet)
    }
  }, [])

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>One-word</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <StyledComponentContainer $isShortView={isShortView || false}>
          <Component {...pageProps} />
        </StyledComponentContainer>
      </ThemeProvider>
    </CacheProvider>
  )
}
