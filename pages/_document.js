/**
 * 🐔 "This file adds some extra HTML to our app's pages. Specifically, it
 *     loads my favorite font, Inter, and adds the best color, yellow, as the
 *     app's background. Everything else is boilerplate."
 */

import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="overflow-x-hidden bg-yellow-300">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
