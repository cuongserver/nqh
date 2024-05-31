import express from "express";
const router = express.Router();
import db from "../db/db.mjs";
import shortid from "shortid";

router.post("/api/task/create-or-update", express.json(), async (req, res) => {
  const data = req.body;
  const entry = {
    ...data,
  };
  if (!data.id) {
    entry.id = shortid.generate();
    entry.status = "To Do";
    entry.createdAt = new Date().getTime();
    entry.markedAsDeleted = false;
    await db.update((db) => {
      db.tasks.push(entry);
    });
    return res.json(entry);
  }
  const item = db.data.tasks.find((item) => item.id === data.id);
  if (!item) return res.status(404);
  await db.update((db) => {
    Object.keys(data).forEach((key) => {
      item[key] = data[key];
    });
  });

  return res.json({ success: true });
});

router.post("/api/task/delete", express.json(), async (req, res) => {
  const data = req.body;
  if (!data.id) return res.status(400);
  const item = db.data.tasks.find((item) => item.id === data.id);
  if (!item) return res.status(404);
  await db.update((db) => {
    item.markedAsDeleted = true;
  });
  return res.json({ success: true });
});

router.post("/api/tasks", express.json(), async (req, res) => {
  const { statuses } = req.body;

  const _data = db.data.tasks.filter((task) => {
    return !task.markedAsDeleted && statuses.includes(task.status);
  });
  _data.sort((a, b) => a.createdAt - b.createdAt);
  res.json({
    result: _data,
  });
});

export default router;
