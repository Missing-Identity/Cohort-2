const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, Course } = require("../db/index");

// Admin Routes
router.post("/signup", (req, res) => {
  // Implement admin signup logic
  const { username, password } = req.body;
  const admin = new Admin({ username, password });
  admin.save();
  res.json({ message: "Admin created successfully" });
});

router.post("/courses", adminMiddleware, (req, res) => {
  // Implement course creation logic
  const { title, description } = req.body;
  const course = new Course({ title, description });
  course.save();
  res.json({ message: "Course created successfully" });
});

router.get("/courses", adminMiddleware, (req, res) => {
  // Implement fetching all courses logic
  const courses = Course.find();
  res.json({ courses });
});

module.exports = router;
