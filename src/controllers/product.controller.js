const config = require('../config');
const axios = require('axios');
const { sequelize } = require('../models/index');
const productVal = require('../validations/product.validation');
const { response } = require('express');

/**
 * @swagger
 *
 * /public/product/sales:
 *   get:
 *     tags:
 *       - Product
 *     description: Sales by products between two dates 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: startDate
 *         description: Initial date (dd-mm-yyyy o dd/mm/yyyy).
 *         in: query
 *         required: true
 *         type: string
 *       - name: endDate
 *         description: Final date (dd-mm-yyyy o dd/mm/yyyy).
 *         in: query
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Return product data   
 *       500:
 *         description: Service error
 *       400:
 *         description: Error fields
 */
async function getProductSalesSummary(req,res){   
    let bodyErrors = productVal.productDateValidation(req);
    if (bodyErrors) return res.status(400).send({ error: bodyErrors });

    let dates = {
        start_date: req.query.startDate,
        end_date: req.query.endDate
    }
    try {
        let data = await sequelize.query(`Select * from getConsolidadoCreditosPrecursadosByVendedor('','` + dates.start_date + `','` + dates.end_date + `');`);
        let orderArray = [];
        await asyncForEach(
            data[0],
            async (element, index) => {
                let indexProduct = orderArray.map(product => product.nombreproducto).indexOf(element.nombreproducto);
                if (indexProduct == -1) {
                    orderArray.push({nombreproducto:element.nombreproducto,sumatotalmontofinanciar:element.sumatotalmontofinanciar});
                } else {
                    orderArray[indexProduct].sumatotalmontofinanciar = (parseInt(orderArray[indexProduct].sumatotalmontofinanciar, 10) + parseInt(element.sumatotalmontofinanciar, 10)).toString();
                }
            })
        return res.status(200).send(orderArray);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
}

//Ventas por el prodcuto dado
async function getSellerForProduct(data,product){
    const orderArray = data.filter(element => element.nombreproducto == product); 
    return orderArray;
}

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

/**
 * @swagger
 *
 * /public/product/summary:
 *   get:
 *     tags:
 *       - Product
 *     description: Summary sales by products between two dates 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: startDate
 *         description: Initial date (dd-mm-yyyy o dd/mm/yyyy).
 *         in: query
 *         required: true
 *         type: string
 *       - name: endDate
 *         description: Final date (dd-mm-yyyy o dd/mm/yyyy).
 *         in: query
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Return product data   
 *       500:
 *         description: Service error
 *       400:
 *         description: Error fields
 */
async function getProductSummary(req,res){   
    let bodyErrors = productVal.productDateValidation(req);
    if (bodyErrors) return res.status(400).send({ error: bodyErrors });

    let dates = {
        start_date: req.query.startDate,
        end_date: req.query.endDate
    }
    try {
        let data = await sequelize.query(`Select * from getConsolidadoCreditosPrecursadosByVendedor('','` + dates.start_date + `','` + dates.end_date + `');`);
        let orderArray = [];
        await asyncForEach(
            data[0],
            async (element, index) => {
                let indexProduct = orderArray.map(product => product.nombreproducto).indexOf(element.nombreproducto);
                if (indexProduct == -1) {
                    let arraySellerSummary=await getSellerForProduct(data[0],element.nombreproducto);
                    orderArray.push({nombreproducto:element.nombreproducto,sumatotalmontofinanciar:element.sumatotalmontofinanciar,sellersSummary:arraySellerSummary});
                } else {
                    orderArray[indexProduct].sumatotalmontofinanciar = (parseInt(orderArray[indexProduct].sumatotalmontofinanciar, 10) + parseInt(element.sumatotalmontofinanciar, 10)).toString();
                }
            })
        return res.status(200).send(orderArray);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
}



module.exports={
    getProductSalesSummary,
    getProductSummary
}