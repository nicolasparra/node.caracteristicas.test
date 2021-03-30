const express= require ('express');
const userController = require('../controllers/user.controller');
const productController= require('../controllers/product.controller');
const publicRouter = express.Router();

publicRouter.get('/users',userController.getAllSellers);
publicRouter.get('/user',userController.getSeller);
publicRouter.get('/user/detail',userController.getSellerDetail);
publicRouter.get('/user/summary',userController.getSellersSummary);
publicRouter.get('/product/sales',productController.getProductSalesSummary);
publicRouter.get('/product/summary',productController.getProductSummary);

publicRouter.get('/test',userController.test);
publicRouter.get('/user/ranking',userController.getRanking);

module.exports = publicRouter;