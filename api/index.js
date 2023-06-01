const express = require('express');
const app = express();
const cors=require('cors');
const mongoose=require('mongoose');
const bcrypt = require('bcryptjs');// hash the password
const UserModel = require('./models/User');

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
app.listen(4000)