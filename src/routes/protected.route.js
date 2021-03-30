const express= require('express');
const protectedRouter = express.Router();
const userController = require('../controllers/user.controller');

protectedRouter.post('/user/changePassword', userController.changePassword);

module.exports = protectedRouter;
