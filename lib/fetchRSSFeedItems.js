import RSSParser from "rss-parser";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

import { feedURLs } from "../config";

dayjs.extend(utc);
dayjs.extend(timezone);

const parser = new RSSParser();

/**
 * Fetches RSS feed items from URLs configured in `config.js`'s `feedURLs`
 * export. Each RSS feed item is reshaped to better suit the app and reduce
 * in-app network payload sizes.
 *
 * It uses `dayjs` on the server to sort all items by publication date.
 */
export const fetchRSSFeedItems = async () => {
  const feeds = await Promise.all(
    (feedURLs || []).map((url) => {
      return parser.parseURL(url);
    })
  );

  return feeds
    .flatMap((feed) =>
      feed.items.map((item) => {
        return {
          guid: item.guid || item.link,
          title: item.title,
          link: item.link,
          pubDate: item.pubDate,
          comments: item.comments || null,
          feedTitle: feed.title,
          feedURL: feed.link,
        };
      })
    )
    .sort((a, b) => {
      return dayjs(b.pubDate).diff(dayjs(a.pubDate));
    });
};
