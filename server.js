const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const { response } = require('express');
const register = require('./Controllers/Register');
const signin = require('./Controllers/Signin');
const profile = require('./Controllers/Profile');
const image = require('./Controllers/Image')

const db= knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'JAGGUputtaa*2002*',
      database : 'smartbrain'
    }
  });


const app = express();
app.use(express.json());
app.use(cors())


// / root
app.get('/',(req,res)=>{res.send('success');})

//signin
app.post('/signin',(req,res)=>{signin.handleSignin(req,res,db,bcrypt)});

//for viewing the profile using id
app.get('/profile/:id',(req,res)=>{profile.handleProfile(req,res,db)})

// registering a new user
app.post('/register',(req,res)=>{register.handleRegister(req,res,db,bcrypt)});

// increasing the entries as they post more images
app.put('/image',(req,res)=>{image.handleImage(req,res,db)});
app.post('/imageUrl',(req,res)=>{image.handleApicall(req,res)});

app.listen(3001,()=>{
    console.log("app is running");
})
