import * as db from "../../lib/savedDB";

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
      feedTitle: req.body.feedTitle,
      feedURL: req.body.feedURL,
      pubDate: req.body.publishedAt,
      comments: req.body.commentsURL,
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
