import FeedItem from "./FeedItem.server";

const Feed = ({ items = [], saved = [] }) => {
  return (
    <ul className="grid gap-12 lg:gap-24">
      {items.map((item) => (
        <FeedItem
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
  );
};

export default Feed;
