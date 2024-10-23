const { Router } = require("express");
const { adminModel, courseModel } = require("../model/index.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");  // bcrypt for password hashing
const { JWT_ADMIN_PASSWORD } = require("../config");
const { adminMiddleware } = require("../middlewares/admin.js");
const { z } = require("zod");  // Zod for validation

const adminRouter = Router();

// Zod schema for validation
const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
});

// Admin Signup Route
adminRouter.post("/signup", async function (req, res) {
  try {
    // Zod validation
    const { email, password, firstName, lastName } = signupSchema.parse(req.body);

    // Hashing the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    await adminModel.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    res.status(201).json({
      message: "Signup succeeded",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: `Error: ${error.message}`,
    });
  }
});

// Admin Signin Route
adminRouter.post("/signin", async function (req, res) {
  try {
    const { email, password } = req.body;

    // Find admin by email
    const admin = await adminModel.findOne({ email });

    if (admin && (await bcrypt.compare(password, admin.password))) {
      const token = jwt.sign({ id: admin._id }, JWT_ADMIN_PASSWORD, { expiresIn: '1h' });

      // Here you can add logic to set the token in a cookie if needed

      res.json({ token });
    } else {
      res.status(403).json({
        message: "Incorrect credentials",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: `Error: ${error.message}`,
    });
  }
});

// Admin Create Course Route
adminRouter.post("/course", adminMiddleware, async function (req, res) {
  try {
    const adminId = req.userId;
    const { title, description, imageUrl, price } = req.body;
    // Zod validation can be applied to course creation data as well
    // adminId doest not match then return course not found

    if( !title || !description || !imageUrl || !price || !adminId){
      res.json({
        msg:"provide all data"
      })
    }

    const course = await courseModel.create({
      title,
      description,
      imageUrl,
      price,
      creatorId: adminId,
    });

    res.status(201).json({
      message: "Course created",
      courseId: course._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: `Error: ${error.message}`,
    });
  }
});

// Admin Update Course Route
adminRouter.put("/course", adminMiddleware, async function (req, res) {
  try {
    const adminId = req.userId;
    const { title, description, imageUrl, price, courseId } = req.body;
    // const creator = await courseModel.find({adminId})
    // if(creator){
    //   res.json({
    //     msg:"Course update not allowed"
    //   })
    // }

    const course = await courseModel.updateOne(
      { _id: courseId, creatorId: adminId },
      { title, description, imageUrl, price }
    );

    res.status(200).json({
      message: "Course updated",
      courseId: course._id,
    }); 
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: `Error: ${error.message}`,
    });
  }
});

// Admin Get All Courses Route
adminRouter.get("/course/bulk", adminMiddleware, async function (req, res) {
  try {
    const adminId = req.userId;

    const courses = await courseModel.find({ creatorId: adminId });

    res.status(200).json({
      courses,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: `Error: ${error.message}`,
    });
  }
});

module.exports = {
  adminRouter,
};


