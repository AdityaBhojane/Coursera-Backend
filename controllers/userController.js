const { userModel } = require('../dbSchema');

const userSignupController = async  function (req,res){
    try {
     const { email, password, firstName, lastName } = req.body;
 
     await userModel.create({
         email:email,
         password:password,
         firstName:firstName,
         lastName:lastName
     });
 
     res.json({
         msg:"signup succeeded"
     })
    } catch (error) {
      res.status(500).json({
         msg:error.message
      })
    }
 }

 module.exports = {
    userSignupController
 }