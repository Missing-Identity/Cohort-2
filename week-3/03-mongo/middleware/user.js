const User = require("../db/index").User;

async function userMiddleware(req, res, next) {
  const { username, password } = req.headers;
  const user = await User.findOne({ username, password });
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  req.user = user;
  next();
}

module.exports = userMiddleware;
