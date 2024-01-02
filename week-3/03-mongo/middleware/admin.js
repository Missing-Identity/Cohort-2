const Admin = require("../db/index").Admin;

// Middleware for handling auth
function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  const { username, password } = req.headers;
  const admin = Admin.findOne({ username, password });
  if (!admin) {
    res.status(401).json({ message: "Unauthorized" });
  }
  req.admin = admin;
  next();
}

module.exports = adminMiddleware;
