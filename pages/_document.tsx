import { createGetInitialProps } from "@mantine/next";
import Document, { Head, Html, Main, NextScript } from "next/document";

const getInitialProps = createGetInitialProps();

export default class _Document extends Document {
  static getInitialProps = getInitialProps;

  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body style={{ background: "black", color: "white" }}>
          <Main />
          <NextScript />
        </body>
         <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
      </Html>
    );
  }
}
