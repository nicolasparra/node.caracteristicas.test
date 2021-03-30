const express= require ('express');
const authController = require('../controllers/auth.controller');
const autRouter = express.Router();

autRouter.post('/login',authController.login);
autRouter.post('/logout',authController.logout);
// autRouter.post('/login',(req, res)=>{authController.login});
module.exports = autRouter;