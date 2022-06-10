import { useData } from "../lib/useData.js";
import { fetchRSSFeedItems } from "../lib/fetchRSSFeedItems.js";

import { Layout } from "../components/Layout.server.js";
import { RSSItem } from "../components/RSSItem.server.js";

import { feedURLs } from "../config";
import { PillNav } from "../components/PillNav.js";

export default function IndexPage() {
  const { data: items, error } = useData("feeds", () =>
    fetchRSSFeedItems(feedURLs)
  );

  return (
    <Layout>
      <div className="mx-auto grid max-w-7xl gap-12 lg:gap-28">
        <PillNav>
          <PillNav.Item href="/" isActive={true}>
            All
          </PillNav.Item>
          <PillNav.Item href="/saved">Saved</PillNav.Item>
        </PillNav>
        <ul className="-my-8">
          {items.map((item, i) => (
            <RSSItem
              key={item.guid}
              title={item.title}
              url={item.link}
              feedTitle={item.feedTitle}
              feedURL={item.feedURL}
              publishedAt={item.pubDate}
              commentsURL={item.comments}
              isOpen={i === 3}
            />
          ))}
        </ul>
      </div>
      <div className="fixed inset-0 bg-black/75" />
    </Layout>
  );
}
