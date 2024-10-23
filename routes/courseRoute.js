const { Router } = require("express");
const { userMiddleware } = require("../middlewares/user.js");
const { purchaseModel, courseModel } = require("../model/index")

const courseRouter = Router();

// Purchase a course route
courseRouter.post("/purchase", userMiddleware, async function(req, res) {
  try {
    const userId = req.userId;
    const { courseId } = req.body;

    // Validate input
    if (!courseId) {
      return res.status(400).json({ message: "Course ID is required" });
    }

    // Check if the course exists
    const course = await courseModel.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Check if user has already purchased the course
    const existingPurchase = await purchaseModel.findOne({ userId, courseId });
    if (existingPurchase) {
      return res.status(409).json({ message: "Course already purchased" });
    }

    // Proceed with purchase (assuming payment validation is done elsewhere)
    await purchaseModel.create({
      userId,
      courseId,
    });

    res.status(201).json({
      message: "You have successfully purchased the course",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Error: ${error.message}` });
  }
});

// Get course previews route
courseRouter.get("/preview", async function(req, res) {
  try {
    const courses = await courseModel.find({});

    res.status(200).json({
      courses,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Error: ${error.message}` });
  }
});

module.exports = {
  courseRouter,
};
