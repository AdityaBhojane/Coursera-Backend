const { Router } = require('express');


const userRouter = Router();

userRouter.post('/signup', async function (req,res){
    const { email, password, firstName, lastName } = req.body;
    await userModel.create({
        email:email,
        password:password,
        firstName:firstName,
        lastName:lastName
    });

    res,json({
        msg:"signup succeeded"
    })
});


module.exports ={
    userRouter:userRouter
}