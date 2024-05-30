import express from "express";
const router = express.Router();
import { JSONFilePreset } from "lowdb/node";

router.post("/api/todo/create", express.json(), async (req, res) => {
  const data = req.body;

  const db = await JSONFilePreset(`${process.env.DATA_DIR}/db.json`, {
    todos: [],
  });
  await db.update((db) => db.todos.push(data));
  res.json({});
});

export default router;
