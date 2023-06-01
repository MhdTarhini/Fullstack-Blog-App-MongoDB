const express = require('express');
const app = express();
const cors=require('cors');
const mongoose=require('mongoose');
const bcrypt = require('bcryptjs');// hash the password
const UserModel = require('./models/User');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

var salt = bcrypt.genSaltSync(10);
const secret = 'FINFRF4646RF46RE5F46ERFREREGPTLH';

app.use(cors({credentials:true,origin:'http://localhost:3000'}));
//cors is use to send response from react app to backend
//{credentials:true,origin:'http://localhost:3000'} are assigned for the cookies
app.use(express.json());
app.use(cookieParser())

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
        console.log(userDoc)
        const passOK = bcrypt.compareSync(password, userDoc.password);
        if (passOK){
            //logged in
            jwt.sign({username, id:userDoc._id},secret,{},(err,token)=>{
                if(err)throw err;
                res.cookie('token',token).json({
                    id:userDoc._id,
                    username,
                })
            })
        }else{

        res.status(400).json("failed login");    
        }
});

app.get('/profile',(req,res)=>{

    const {token}=req.cookies;

    jwt.verify(token,secret,{},(err,info)=>{
        if(err) throw err;
        res.json(info);
    })
});

app.post('/logout',(req,res)=>{
    res.cookie('token','').json('ok');
});

app.listen(4000)