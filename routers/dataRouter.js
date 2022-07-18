const { Router } = require("express");
const { authenticateToken } = require("../middlewares/authenticateToken");
const dataRouter = Router();
const FileContainer = require("../utils/fileContainer");

module.exports = dataRouter.get(
  "/profile",
  authenticateToken,
  async (req, res) => {
    const db = new FileContainer("./db/users.json");
    const users = await db.getAll();

    const user = users.find((user) => user.email === req.user);

    delete user.password;

    res.json(user);
  }
);

dataRouter.post("/", authenticateToken, async (req, res) => {
  const db = new FileContainer(`./db/${req.user}.json`);
  const object = req.body;

  try {
    await db.save(object);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

dataRouter.get("/", authenticateToken, async (req, res) => {
  const db = new FileContainer(`./db/${req.user}.json`);
  const objects = await db.getAll();

  res.json(objects);
});

dataRouter.get("/:id", authenticateToken, async (req, res) => {
  const db = new FileContainer(`./db/${req.user}.json`);
  const { id } = req.params;
  const object = await db.getById(id);

  res.json(object);
});

dataRouter.delete("/:id", authenticateToken, async (req, res) => {
  const db = new FileContainer(`./db/${req.user}.json`);
  const { id } = req.params;
  await db.deleteById(id);
  const objects = await db.getAll();
  return res.json(objects);
});

dataRouter.put("/:id", authenticateToken, async (req, res) => {
  const db = new FileContainer(`./db/${req.user}.json`);
  const object = req.body;
  const { id } = req.params;
  if (id == null || id == undefined)
    return res.json({ error: "Request must have an Object Id" });
  await db.update(id, object);
  const objects = await db.getAll();
  return res.json(objects);
});
