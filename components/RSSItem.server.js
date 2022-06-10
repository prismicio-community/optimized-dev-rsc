import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { cn } from "../lib/cn";

dayjs.extend(relativeTime);

export const RelativeDate = ({ date }) => {
  return dayjs(date).from(dayjs());
};

export const RSSItem = ({
  title,
  url,
  feedTitle,
  feedURL,
  publishedAt,
  commentsURL,
  isOpen,
}) => {
  return (
    <li
      className={cn(
        "-mx-16 -my-8 mb-0",
        isOpen && "relative z-10 bg-white shadow-2xl"
      )}
    >
      <div className="flex gap-7 p-16">
        <div className="grid grow gap-5 lg:gap-7">
          <a
            href={url}
            target="_blank"
            rel="noreferrer nofollow"
            className="font-medium tracking-tight text-3xl capsize lg:text-5xl lg:leading-tight"
          >
            {title}
          </a>
          <dl className="flex flex-wrap gap-x-3.5 gap-y-3 tracking-tight text-gray-400 text-xs lg:gap-x-6 lg:text-sm">
            <div>
              <dt className="sr-only">Published Date</dt>
              <dd className="capsize">
                <RelativeDate date={publishedAt} />
              </dd>
            </div>
            {commentsURL && (
              <div>
                <dt className="sr-only">Comments</dt>
                <dd>
                  <a href={commentsURL} className="capsize">
                    comments
                  </a>
                </dd>
              </div>
            )}
            <div>
              <dt className="sr-only">Source</dt>
              <dd>
                <a href={feedURL} className="capsize">
                  Source: {feedTitle}
                </a>
              </dd>
            </div>
          </dl>
        </div>
        <div className="shrink-0">
          <div className={cn("relative h-16 w-16", isOpen && "rotate-45")}>
            <div className="mx-auto h-full w-[2px] bg-gray-200" />
            <div className="absolute top-1/2 h-[2px] w-full -translate-y-1/2 bg-gray-200" />
          </div>
        </div>
      </div>
      <div>{isOpen && <iframe src={url} className="h-[75vh] w-full" />}</div>
    </li>
  );
};
