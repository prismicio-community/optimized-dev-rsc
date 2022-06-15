/**
 * 🐔 "This file contains a component that renders an individual RSS feed item.
 *     In case you missed it, this file's name ends with `.server.js`. That
 *     means it will only be rendered on the server. All of our readers on the
 *     receiving end won't have to download all the JavaScript used in this
 *     file."
 *
 * 🐔 "If it seems like I'm repeating myself, you'll need to get used to it.
 *     Copy and pasting the same bit of text is easier on my feet. Wait... do I
 *     type with my feet or my wings? Probably my feet."
 */

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import SaveButton from "./SaveButton.client";

dayjs.extend(relativeTime);

/**
 * Renders a date relative to the current time. For example, "6 hours ago".
 *
 * Note: This component only renders on the server since its filename ends with
 * `.server.js`. Its JavaScript will not be sent to the browser.
 */
const RelativeDate = ({ date }) => {
  return dayjs(date).from(dayjs());
};

/**
 * Displays an RSS feed item, including its title, feed name, and link to its
 * article.
 *
 * Note: This component only renders on the server since its filename ends with
 * `.server.js`. Its JavaScript will not be sent to the browser.
 */
const FeedItem = ({
  initialIsSaved,
  guid,
  title,
  url,
  feedTitle,
  feedURL,
  publishedAt,
  commentsURL,
}) => {
  return (
    <li>
      <div className="mb-5 lg:mb-7">
        <a
          href={url}
          target="_blank"
          rel="noreferrer nofollow"
          className="font-medium tracking-tight text-3xl capsize lg:text-6xl lg:leading-tight"
        >
          {title}
        </a>
      </div>
      <dl className="flex flex-wrap gap-3.5 gap-y-3.5 tracking-tight text-black/30 text-xs lg:gap-x-6 lg:text-sm">
        <div className="w-full lg:w-auto">
          <dt className="sr-only">Source</dt>
          <dd>
            <a
              href={feedURL}
              target="_blank"
              rel="noreferrer"
              className="text-black/60 capsize"
            >
              {feedTitle}
            </a>
          </dd>
        </div>
        <div>
          <dt className="sr-only">Published Date</dt>
          <dd className="capsize">
            <RelativeDate date={publishedAt} />
          </dd>
        </div>
        {commentsURL && (
          <div>
            <a
              href={commentsURL}
              target="_blank"
              rel="noreferrer"
              className="capsize"
            >
              comments
            </a>
          </div>
        )}
        <SaveButton
          key={guid}
          initialIsSaved={initialIsSaved}
          guid={guid}
          title={title}
          url={url}
          feedTitle={feedTitle}
          feedURL={feedURL}
          publishedAt={publishedAt}
          commentsURL={commentsURL}
        />
      </dl>
    </li>
  );
};

export default FeedItem;
