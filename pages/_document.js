// src/pages/_document.js

import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    const pageProps = this.props?.__NEXT_DATA__?.props?.pageProps;
    return (
      <Html className={pageProps.SingletonHoldingPage?.theme}>
        <Head />
        <body className={pageProps.SingletonHoldingPage?.theme}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
