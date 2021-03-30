'use strict'
require('dotenv').config();
const config=require('./config');
const express=require('express');
const bodyParser= require('body-parser');
const helmet = require('helmet');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(helmet());
 
const swaggerDocs = swaggerJSDoc(config.swagger);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

module.exports= app;