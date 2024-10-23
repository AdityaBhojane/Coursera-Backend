const { Router } = require("express");
const { userModel, courseModel } = require("../model/index");

const userRouter = Router();

// Optimized signup logic
userRouter.post("/signup", async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    // Input validation (basic example, consider using a library like Joi or Zod for more complex validations)
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Ensure email is unique (add error handling if email exists)
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    // Create new user
    await userModel.create({ email, password, firstName, lastName });
    res.status(201).json({ message: "Signup succeeded" });

  } catch (error) {
    console.error(error); // Use console.error for better error reporting
    res.status(500).json({ msg: `Error: ${error.message}` });
  }
});



// Corrected the path for signin route
userRouter.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find user by email and password
    const user = await userModel.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Assuming JWT is implemented elsewhere, you would sign a token here
    const token = "your-jwt-token"; // Replace with actual JWT logic
    res.json({ token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: `Error: ${error.message}` });
  }
});



// Optimized purchases route
userRouter.get("/purchases", async (req, res) => {
  try {
    const { userId } = req.body;

    // Ensure userId is provided
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Fetch user's purchases
    const purchases = await purchases.find({ userId });

    // Extract courseIds in a more concise way
    const purchasedCourseIds = purchases.map(purchase => purchase.courseId);

    // Fetch course details based on purchased course IDs
    const courseData = await courseModel.find({
      _id: { $in: purchasedCourseIds },
    });

    res.json({ purchases, courseData });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: `Error: ${error.message}` });
  }
});

module.exports = { userRouter };
