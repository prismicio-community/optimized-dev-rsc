import * as db from "../../lib/savedDB";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

  try {
    await db.remove(req.body.guid);

    res.send({ success: true });
  } catch (error) {
    console.error(error);

    return res.status(500).send({
      success: false,
      error: error.message,
    });
  }
}
