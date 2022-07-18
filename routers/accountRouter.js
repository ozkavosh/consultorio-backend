const Router = require("express");
const accountRouter = Router();
const { generateAccessToken } = require("../utils/generateAccessToken");
const { userParams, newUserParams } = require("../middlewares/validateParams");
const FileContainer = require("../utils/fileContainer");

module.exports = accountRouter.post("/login", userParams, async (req, res) => {
  const db = new FileContainer("./db/users.json");
  const { email, password } = req.body;

  const users = await db.getAll();
  const user = users.find((user) => user.email === email);

  console.log(user);

  if (!user || user.password !== password)
    return res.status(401).json({ error: "Wrong credentials" });

  const token = generateAccessToken(email);

  res.json({ token });
});

accountRouter.post("/register", newUserParams, async (req, res) => {
  const db = new FileContainer("./db/users.json");
  const { username, email, password } = req.body;

  const users = await db.getAll();

  if (users.some((user) => user.email === email))
    return res.status(400).json({ error: "Email already exists" });

  await db.save({ username, email, password });

  res.json({ success: true });
});
