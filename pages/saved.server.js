/**
 * 🐔 "This file holds the app's 'Saved' page. This is where we'll fetch saved
 *     items from the database and display it on the page."
 *
 * 🐔 "I have a confession to share with you, but I've already clucked it out
 *     over in the `index.server.js` file. Go check it out."
 */

import * as savedDB from "../lib/savedDB";

import Layout from "../components/Layout.server.js";
import Feed from "../components/Feed.server";

/**
 * The app's "Saved" page. It lists RSS feed items that have been saved.
 *
 * Note: This component only renders on the server since its filename ends with
 * `.server.js`. Its JavaScript will not be sent to the browser.
 */
export default function SavedPage({ saved }) {
  return (
    <Layout activeRoute="/saved">
      {saved.length > 0 ? (
        <Feed items={saved} saved={saved} />
      ) : (
        <p className="italic text-black/40 text-sm capsize">
          There&rsquo;s nothing here! Go save some stuff!
        </p>
      )}
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
  const saved = await savedDB.loadAll();

  return {
    props: {
      saved,
    },
  };
};
