/**
 * 🐔 "This file holds the app's 'Saved' page. This is where we'll fetch saved
 *     items from the database and display it on the page."
 *
 * 🐔 "I have a confession to share with you, but I've already clucked it out
 *     over in the `index.server.js` file. Go check it out."
 */

import Layout from "../components/Layout.server";

/**
 * The app's "Saved" page. It lists RSS feed items that have been saved.
 *
 * Note: This component only renders on the server since its filename ends with
 * `.server.js`. Its JavaScript will not be sent to the browser.
 */
export default function SavedPage() {
  return (
    <Layout activeRoute="/saved">
      <p>
        🐔 &ldquo;This page won&rsquo;t work until you write it! Check out{" "}
        <code>pages/saved.server.js</code> for details.&rdquo;
      </p>
    </Layout>
  );
}

/**
 * A server-only function that fetches the page's data. It should fetch a list
 * of saved items.
 *
 * Data should be returned as a `saved` prop to be used in the page's component
 * above.
 */
export const getServerSideProps = async () => {
  // 🐔 "Looks like got nothin' here to start from. We need to load your saved
  //     items and send them to the page as props. *Something* tells me this
  //     was also done on the home page. Hmmmmmmmmm..."

  return {
    props: {},
  };
};
