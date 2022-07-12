import RSSParser from "rss-parser";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

import { feedURLs } from "../config";

dayjs.extend(utc);
dayjs.extend(timezone);

const parser = new RSSParser();

/**
 * Converts an RSS feed item into a simpler object.
 */
const buildItem = ({ item, feed }) => {
  return {
    guid: item.guid || item.link,
    title: item.title,
    link: item.link,
    pubDate: item.pubDate,
    comments: item.comments || null,
    feedTitle: feed.title,
    feedURL: feed.link,
  };
};

/**
 * Fetches RSS feed items from URLs configured in `config.js`'s `feedURLs`
 * export. Each RSS feed item is reshaped to better suit the app and reduce
 * in-app network payload sizes.
 *
 * Items are sorted by publication date.
 */
export const fetchRSSFeedItems = async () => {
  // Fetch each RSS feed in `feedURLs`.
  const feeds = await Promise.all(
    (feedURLs || []).map((url) => {
      return parser.parseURL(url);
    })
  );

  // Simplify the RSS feed items with `buildItem()` and sort the items by
  // publication date.
  return feeds
    .flatMap((feed) =>
      feed.items.map((item) => {
        return buildItem({ item, feed });
      })
    )
    .sort((a, b) => {
      return dayjs(b.pubDate).diff(dayjs(a.pubDate));
    });
};
