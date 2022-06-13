import { fetchRSSFeedItems } from "../lib/fetchRSSFeedItems";
import { useData } from "../lib/useData";
import * as savedDB from "../lib/savedDB";

import RSSItem from "../components/RSSItem.server.js";

const LiveRSSList = ({ feedURLs }) => {
  const { data: items } = useData("live-feed", () =>
    fetchRSSFeedItems(feedURLs)
  );
  const { data: saved } = useData("saved", () => savedDB.load());

  return items.map((item) => (
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
  ));
};

export default LiveRSSList;
