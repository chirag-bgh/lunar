import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import NProgress from 'nprogress'
import '../public/nprogress.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    NProgress.configure({ showSpinner: false })

    const handleStart = (url: any) => {
      console.log(`Loading: ${url}`)
      NProgress.start()
    }
    const handleStop = () => {
      NProgress.done()
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router])

  return (
    <>
      <Head>
        <link rel='manifest' href='/manifest.json' />
        <link rel='preconnect' href='https://d1tdbbzd1y2er2.cloudfront.net' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <meta name='mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='application-name' content='Lunar Pay' />
        <meta name='twitter:title' content='Lunar Pay' />
        <meta
          name='twitter:description'
          content='Crypto Payments Made Easy with LunarPay.'
        />
        <meta property='og:site_name' content='Lunar Pay' />
        <meta property='og:type' content='website' />
        <meta property='og:locale' content='en_IN' />
        <link rel='icon' href='/logo.png' />
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap'
        />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
