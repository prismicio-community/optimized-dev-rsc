import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Suspense } from "react";

import SaveButton from "./SaveButton.client";

dayjs.extend(relativeTime);

const RelativeDate = ({ date }) => {
  return dayjs(date).from(dayjs());
};

const RSSItem = ({
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
        <Suspense fallback="Loading…">
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
        </Suspense>
      </dl>
    </li>
  );
};

export default RSSItem;
