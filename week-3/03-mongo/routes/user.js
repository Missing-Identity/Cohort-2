const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { Course, User } = require("../db/index");

// User Routes
router.post("/signup", (req, res) => {
  // Implement user signup logic
  const { username, password } = req.body;
  const user = new User({ username, password });
  user.save();
  res.json({ message: "User created successfully" });
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
  const course = await Course.findById(courseId);
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }
  if (!req.user.purchasedCourses.includes(courseId)) {
    req.user.purchasedCourses.push(courseId);
    await req.user.save();
  }
  res.json({ message: "Course purchased successfully" });
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  const { user } = req;
  const courses = await Course.find({
    _id: { $in: user.purchasedCourses },
  }).exec(); // $in operator is used to find documents where the value of a field equals any value in the specified array
  res.json({ courses });
});

module.exports = router;
