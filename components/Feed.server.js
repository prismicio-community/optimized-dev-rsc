/**
 * 🐔 "This file contains a component that renders our RSS feed items. In case
 *     you missed it, this file's name ends with `.server.js`. That means it
 *     will only be rendered on the server. All of our readers on the receiving
 *     end won't have to download all the JavaScript used in this file."
 */

import FeedItem from "./FeedItem.server";

/**
 * Displays a list of RSS feed items. Items listed in `saved` are labled as
 * "saved".
 *
 * Note: This component only renders on the server since its filename ends with
 * `.server.js`. Its JavaScript will not be sent to the browser.
 */
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
