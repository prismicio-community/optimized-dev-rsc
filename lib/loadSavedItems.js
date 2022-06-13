import { promises as fs } from "fs";

export const loadSavedItems = async () => {
  const dbRaw = await fs.readFile("./db/saved.json", "utf8");

  return JSON.parse(dbRaw);
};
