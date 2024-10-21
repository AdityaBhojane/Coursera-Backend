const express = require("express");
const mongoose = require("mongoose");

const { userRouter } = require("./routes/userRoute");
const e = require("express");

const app = express();

app.use(express.json());
app.use('/api/v1/user', userRouter);


async function main() {
    try {
        // connect.then(()=> console.log("connected to db"))
        app.listen(3000);
        console.log("server is running...")
    } catch (error) {
        res.status(411).json({
            msg:error.message
         })
    }
}


mongoose.connect('mongodb://localhost:27017/').then(()=> console.log("connect to db"))

main()