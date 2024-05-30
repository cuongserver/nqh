import express from "express";
const router = express.Router();
import db from "../db/db.mjs";
import shortid from "shortid";

router.post("/api/task/create", express.json(), async (req, res) => {
  const data = req.body;
  const entry = {
    ...data,
    id: shortid.generate(),
    status: "To Do",
    createAt: new Date().getTime(),
    markedAsDeleted: false,
  };
  await db.update((db) => {
    db.tasks.push(entry);
  });
  res.json(entry);
});

router.post("/api/tasks", async (_req, res) => {
  res.json({ result: db.data.tasks });
});

export default router;
