import { promises as fs } from "fs";
import dayjs from "dayjs";

import { DB_PATH } from "./constants";

export const load = async () => {
  const raw = await fs.readFile("./db/saved.json", "utf8");

  return JSON.parse(raw);
};

export const insert = async (row) => {
  const db = await load();

  if (!db.some((existingRow) => existingRow.guid === row.guid)) {
    db.push(row);

    db.sort((a, b) => {
      return dayjs(b.pubDate).diff(dayjs(a.pubDate));
    });
  }

  await fs.writeFile(DB_PATH, JSON.stringify(db));
};

export const remove = async (guid) => {
  let db = await load();

  db = db.filter((row) => row.guid !== guid);

  await fs.writeFile(DB_PATH, JSON.stringify(db));
};
