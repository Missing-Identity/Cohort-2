const jwt = require("jsonwebtoken");
const Admin = require("../db/index").Admin;

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  try {
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, "secret");
    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      res.status(401).json({ message: "Unauthorized" });
    }
    req.admin = admin;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
}

module.exports = adminMiddleware;
