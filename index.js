const express = require("express");
const { userRouter } = require("./routes/userRoute.js");
const { adminRouter } = require("./routes/adminRoute.js");
const { courseRouter } = require("./routes/courseRoute.js");
const connectDB = require("./config/db");
const app = express();


app.use(express.json());
app.use('/api/v1/user', userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);


const PORT = 3000;

app.listen(PORT,async ()=>{
    await connectDB();
    console.log("server is running ...")
})