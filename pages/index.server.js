import { fetchRSSFeedItems } from "../lib/fetchRSSFeedItems.js";
import * as savedDB from "../lib/savedDB";

import Layout from "../components/Layout.server.js";
import Feed from "../components/Feed.server.js";

export default function IndexPage({ items, saved }) {
  return (
    <Layout activeRoute="/">
      {items.length > 0 ? (
        <Feed items={items} saved={saved} />
      ) : (
        <p className="italic text-black/40 text-sm capsize">
          It&rsquo;s quiet here. Too quiet. Open{" "}
          <code className="rounded bg-black/5 px-1 py-0.5">config.js</code> and
          add some RSS feeds with content!
        </p>
      )}
    </Layout>
  );
}

export const getServerSideProps = async () => {
  const [items, saved] = await Promise.all([
    fetchRSSFeedItems(),
    savedDB.load(),
  ]);

  return {
    props: {
      items,
      saved,
    },
  };
};
