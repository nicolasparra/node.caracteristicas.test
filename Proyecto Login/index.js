const express = require('express');
const path = require('path');
const bodyParser=require('body-parser');
const app = express();

const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User=require('./public/user');

if(process.env.NODE_ENV==='production'){
    require('dotenv').config();
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname,'public')));

const mongo_uri=process.env.MONGO_URI || 'mongodb://localhost/todos';

mongoose.connect(mongo_uri,function (err) {
    if(err){
        throw err;
    }else{
        console.log(`Conexión mongo en : ${mongo_uri}`);
    }
});

app.post('/register',(req,res)=>{
   const {username,password}=req.body;
   const user=new User({username,password});
   user.save(err=>{
       if(err){
        res.status(500).send('ERROR AL REGISTRAR');
       }else{
        res.status(200).send('Usuario creado');
       }
   });
});

app.post('/autenticate',(req,res)=>{
    const {username,password}=req.body;
    User.findOne({username},(err,user)=>{
        if(err){
            res.status(500).send('EROR AUTENTICACION');
        }else if(!user){
            res.status(500).send('El usuario no existe');
        }else{
            user.isCorrectPassword(password,(err,result)=>{
                if(err){
                 res.status(500).send('ERROR AUT');
                }else if(result){
                    res.status(200).send('Usuario Autenticado');
                }else{
                    res.status(500).send('USER O PASS iNCORRECTO');
                }
            });
        }
    });
});

app.listen(3000, ()=>{
    console.log('Servidor Corriendo');
})

// app.get('/',(req,res)=>{

// });

module.exports= app;