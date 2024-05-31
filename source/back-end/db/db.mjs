import fs from "fs";
import { JSONFilePreset } from "lowdb/node";

const dataDir = process.env.DATA_DIR || "./data";
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);

const db = await JSONFilePreset(`${dataDir}/db.json`, {
  tasks: [],
  companyNews: [],
});

await db.write();
export default db;
