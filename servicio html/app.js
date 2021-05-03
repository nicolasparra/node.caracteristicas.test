const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const fs = require("fs");
const mongoose = require('mongoose');
const toHtml= require('./toHtml');
const web= require('./web');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// app.use(express.static(__dirname + '/public')); 

app.get('/estatico', (req, res) =>{   
    res.sendFile(path.join(__dirname+'/assets/index.html'));
});

app.get('/funcion', (req, res) =>{   
    res.send(toHtml.funcionHtml("nache"));
});

app.post('/test', (req, res) =>{ 
    let data={
        name:req.body.name,
        password:req.body.password
    }  
    res.send(web.web(data));
});

app.get('/html',(req,res)=>{
    fs.readFile(__dirname+'/assets/index.html', (error, data) => {
        if(error) {
            throw error;
        }
        var textHtml = data.toString();
        var textHtmlAux = textHtml.replace('${change1}','UNO');
        var textHtmlAux2 = textHtmlAux.replace('${change2}','DOS');
        textHtml = textHtmlAux2.replace('${change3}','TRES');
        res.status(200).send(textHtml);
    })
});


app.listen(3000);
console.log("Api Corriendo en: localhost:3000/");