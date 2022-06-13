import * as savedDB from "../lib/savedDB";

import Layout from "../components/Layout.server.js";
import RSSItem from "../components/RSSItem.server.js";

export default function SavedPage({ saved }) {
  return (
    <Layout activeRoute="/saved">
      {saved.length > 0 ? (
        <ul className="grid gap-12 lg:gap-24">
          {saved.map((item) => (
            <RSSItem
              key={`saved-${item.guid}`}
              initialIsSaved={true}
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
      ) : (
        <p className="italic text-black/40 text-sm capsize">
          There&rsquo;s nothing here! Go save some stuff!
        </p>
      )}
    </Layout>
  );
}

export const getServerSideProps = async () => {
  const saved = await savedDB.load();

  return {
    props: {
      saved,
    },
  };
};
