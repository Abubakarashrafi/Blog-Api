const express = require('express');
const { userAction } = require('../middleware/auth');
const userRouter = express.Router();
const UserData = require('../model/user');
const bcrypt = require('bcryptjs')

userRouter.get('/user',async (req,res) => {
    const user = await UserData.find();
    res.status(200).json(user)
})

userRouter.get("/user/:id", async (req, res) => {
    try {
        const user = await UserData.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        res.status(503).json('Internal Server error')
    }
});



userRouter.patch('/update/:id',userAction, async (req,res) => {
    const {username,email,password} = req.body
    const id = req.params.id
    if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(req.body.password,salt) 
        req.body.password = hashPass
    }
    const user = await UserData.findByIdAndUpdate(id,
        {$set : req.body},
        {new : true}
        )
    res.status(200).json({msg :'user updated sucessfully', details : user})    
})

userRouter.delete('/delete/:id', userAction,async(req,res) => {
   
    const id = req.params.id;
    const deleteUser = await UserData.findByIdAndDelete(id);
    res.status(200).json({message : 'User deleted', details : deleteUser})
})

module.exports = userRouter
