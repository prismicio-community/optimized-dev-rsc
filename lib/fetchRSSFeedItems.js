import RSSParser from "rss-parser";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const parser = new RSSParser();

export const fetchRSSFeedItems = async (urls) => {
  const feeds = await Promise.all(
    urls.map((url) => {
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
