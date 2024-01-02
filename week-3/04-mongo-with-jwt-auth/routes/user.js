const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { Course, User } = require("../db/index");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword });
  await user.save();
  res.json({ message: "User created successfully" });
});

router.post("/signin", async (req, res) => {
  // Implement admin signup logic
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = jwt.sign({ id: user._id }, "secret");
  res.json({ token });
});

router.get("/courses", async (req, res) => {
  // Implement listing all courses logic
  try {
    const courses = await Course.find().exec();
    res.json({ courses });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const { courseId } = req.params;
  if (!req.user.purchasedCourses.includes(courseId)) {
    req.user.purchasedCourses.push(courseId);
    await req.user.save();
  }
  res.json({ message: "Course purchased successfully" });
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  const courses = await Course.find({
    _id: { $in: req.user.purchasedCourses },
  }).exec();
  res.json({ courses });
});

module.exports = router;
