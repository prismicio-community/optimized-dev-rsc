/**
 * 🐔 "Nothing special here. Just a standard Next.js `_app.js` override that
 *     imports our CSS file. If you choose to enhance this app later, this is
 *     where you could add React Context Providers. We won't need any of that
 *     for now."
 */

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
