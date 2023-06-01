const express = require('express');
const app = express();
const cors=require('cors');
const mongoose=require('mongoose');
const bcrypt = require('bcryptjs');// hash the password
const UserModel = require('./models/User');
const jwt = require('jsonwebtoken');

var salt = bcrypt.genSaltSync(10);

app.use(cors());

app.use(express.json());

mongoose.connect('mongodb+srv://mohamedtarhini95:mohamed123@cluster1.boziiha.mongodb.net/?retryWrites=true&w=majority')

app.post('/register', async(req,res)=>{
    const{username,password}=req.body;
    try {
        const userDoc = await UserModel.create({
            username,
            password:bcrypt.hashSync(password,salt)
        });
        res.json(userDoc);
    } catch (error) {
        res.status(400).json(error);
    }
});

app.post('/login', async(req,res)=>{
    const{username,password}=req.body;
        const userDoc=await UserModel.findOne({username});
        const passOK = bcrypt.compareSync(password, userDoc.password);
        if (passOK){
            //logged in
            jwt.sign({
                username, id:userDoc._id
            })
        }else{
        res.status(400).json("failed login");
            
        }
});
app.listen(4000)