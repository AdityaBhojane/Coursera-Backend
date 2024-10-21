const { Router } = require('express');

const { userSignupController } = require('../controllers/userController');




const userRouter = Router();

userRouter.post('/signup', userSignupController);



module.exports ={
    userRouter:userRouter
}