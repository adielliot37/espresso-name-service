import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Title & Meta tags */}
        <meta name="description" content="Register your .esp name with Espresso Name Service ☕" />
        <link rel="icon" href="/coffee.ico" />
        <title>Espresso Name Service ☕</title>
      </Head>
      <body className="bg-black text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
