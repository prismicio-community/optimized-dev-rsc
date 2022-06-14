// This file acts as a simple database API. It reads and writes files to a JSON
// file directly in the project.
//
// Note: The database might not work if you deploy the app to serverless hosts,
// like Vercel. It should work locally on your computer, however. :)
//
// For a challenge, try replacing this filesystem-based database with something
// hosted, like Supabase or Planetscale.

import { promises as fs } from "fs";
import * as path from "path";
import dayjs from "dayjs";

/**
 * File path to the database.
 */
export const DB_PATH = "./db/saved.json";

/**
 * Loads the database of saved feed items.
 *
 * If the database does not exist, it creates an empty database.
 */
export const loadAll = async () => {
  try {
    await fs.access(DB_PATH);

    const raw = await fs.readFile(DB_PATH, "utf8");

    return JSON.parse(raw);
  } catch (error) {
    const db = [];

    await fs.mkdir(path.join(DB_PATH, ".."), { recursive: true });
    await fs.writeFile(DB_PATH, JSON.stringify(db));

    return db;
  }
};

/**
 * Inserts a new item to the database of saved feed items. Upon insertion, the
 * database is sorted by items's publication date using `dayjs`.
 */
export const insert = async (row) => {
  const db = await loadAll();

  if (!db.some((existingRow) => existingRow.guid === row.guid)) {
    db.push(row);

    db.sort((a, b) => {
      return dayjs(b.pubDate).diff(dayjs(a.pubDate));
    });
  }

  await fs.writeFile(DB_PATH, JSON.stringify(db));
};

/**
 * Removes an item from the database of saved feed items.
 */
export const remove = async (guid) => {
  let db = await loadAll();

  db = db.filter((row) => row.guid !== guid);

  await fs.writeFile(DB_PATH, JSON.stringify(db));
};
