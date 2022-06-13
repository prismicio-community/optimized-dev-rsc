import { fetchRSSFeedItems } from "../lib/fetchRSSFeedItems.js";
import * as savedDB from "../lib/savedDB";

import { feedURLs } from "../config";

import Layout from "../components/Layout.server.js";
import RSSItem from "../components/RSSItem.server.js";
import LiveRSSList from "../components/LiveRSSList.server.js";

export default function IndexPage({ items, saved }) {
  return (
    <Layout activeRoute="/">
      <ul className="grid gap-12 lg:gap-24">
        <LiveRSSList feedURLs={feedURLs} />
      </ul>
    </Layout>
  );
}

export const getServerSideProps = async () => {
  return { props: {} };
  // const [items, saved] = await Promise.all([
  //   fetchRSSFeedItems(feedURLs),
  //   savedDB.load(),
  // ]);

  // return {
  //   props: {
  //     items,
  //     saved,
  //   },
  // };
};
