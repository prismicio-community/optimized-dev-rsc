import { fetchRSSFeedItems } from "../lib/fetchRSSFeedItems.js";
import * as savedDB from "../lib/savedDB";

import { feedURLs } from "../config";

import Layout from "../components/Layout.server.js";
import RSSItem from "../components/RSSItem.server.js";

export default function IndexPage({ items, saved }) {
  return (
    <Layout activeRoute="/">
      <ul className="grid gap-12 lg:gap-24">
        {items.map((item) => (
          <RSSItem
            key={item.guid}
            initialIsSaved={saved.some((row) => row.guid === item.guid)}
            guid={item.guid}
            title={item.title}
            url={item.link}
            feedTitle={item.feedTitle}
            feedURL={item.feedURL}
            publishedAt={item.pubDate}
            commentsURL={item.comments}
          />
        ))}
      </ul>
    </Layout>
  );
}

export const getServerSideProps = async () => {
  const [items, saved] = await Promise.all([
    fetchRSSFeedItems(feedURLs),
    savedDB.load(),
  ]);

  return {
    props: {
      items,
      saved,
    },
  };
};
