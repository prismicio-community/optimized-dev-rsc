import * as db from "../../lib/savedDB";

/**
 * An API route that saves an RSS feed item to the database. It only accepts
 * POST requests and must receive the following data:
 *
 * - `guid`: The item's globally unique ID.
 * - `title`: The item's title.
 * - `link`: The item's URL.
 * - `pubDate`: The item's publication date.
 * - `comments`: The item's comments URL, if it has one.
 * - `feedTitle`: The item's feed's title.
 * - `feedURL`: The item's feed's URL.
 */
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

  try {
    await db.insert({
      guid: req.body.guid,
      title: req.body.title,
      link: req.body.url,
      pubDate: req.body.publishedAt,
      comments: req.body.commentsURL,
      feedTitle: req.body.feedTitle,
      feedURL: req.body.feedURL,
    });

    res.send({ success: true });
  } catch (error) {
    console.error(error);

    return res.status(500).send({
      success: false,
      error: error.message,
    });
  }
}
