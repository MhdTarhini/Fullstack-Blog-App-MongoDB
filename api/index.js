const express = require('express');
const app = express();
const cors=require('cors');
const mongoose=require('mongoose');
const bcrypt = require('bcryptjs');// hash the password
const UserModel = require('./models/User');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({dest:'uploads/'});
const fs = require('fs');
const path = require('path');
const Post = require('./models/Post')

var salt = bcrypt.genSaltSync(10);
const secret = 'FINFRF4646RF46RE5F46ERFREREGPTLH';

app.use(cors({credentials:true,origin:'http://localhost:3000'}));
//cors is use to send response from react app to backend
//{credentials:true,origin:'http://localhost:3000'} are assigned for the cookies
app.use(express.json());
app.use(cookieParser())
app.use('/uploads', express.static(__dirname+'/uploads'));
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
        const userDoc=await UserModel.findOne({username}).exec();
        // console.log(userDoc);
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

app.post('/post',uploadMiddleware.single('file'),async (req,res)=>{
    const {originalname,path}= req.file ;
    const parts = originalname.split('.');
    const ext = parts[parts.length-1];
    const newPath = path+'.'+ext
    fs.renameSync(path,newPath);
    const {token}=req.cookies;
    jwt.verify(token,secret,{},async (err,info)=>{
        if(err) throw err;
        const{title , summary , content}= req.body;
        const PostDoc = await Post.create({
            title,
            summary, 
            content, 
            cover:newPath,
            author:info.id,
        })
        res.json(PostDoc);
    });
})

app.get('/post',async (req,res)=>{
    res.json(await Post.find()
    .populate('author',['username'])//.populate('author',['username'] to get the username from the user info by the id (author:info.id)
    .sort({createdAt:-1})
    .limit(20));
});

app.get('/post/:id',async (req,res)=>{
    const {id}=req.params;
    const postDoc = await Post.findById(id).populate('author',['username']);
    res.json(postDoc);
})






app.listen(4000)