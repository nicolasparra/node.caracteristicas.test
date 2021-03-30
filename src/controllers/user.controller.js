const config = require('../config');
const axios = require('axios');
const { sequelize } = require('../models/index');
const userVal = require('../validations/user.validation');
const { response } = require('express');

/**
 * @swagger
 *
 * /protected/user/changePassword:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - User
 *     description: Password change for a logged user.
 *     produces:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *          schema:
 *            $ref: '#/definitions/changePassword'
 *     responses:
 *       200:
 *         description: Return user data 
 *       401:
 *         description: Error login
 *       400:
 *         description: Error fields
 *definitions:
 *  changePassword:
 *   type: object
 *   properties:
 *    email:
 *     type: string
 *     description: email of the user
 *     example: 'nameseller@dominio.cl'
 *    password:
 *     type: string
 *     description: password of the user
 *     example: 'password'
 */
async function changePassword(req, res) {
    let bodyErrors = userVal.changePasswordValidation(req);
    if (bodyErrors) return res.status(400).send({ error: bodyErrors });

    let data = {
        c_id: req.body.email,
        a_Clave: req.body.password
    }

    const headers = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'Authorization': req.headers.authorization
        }
    }
    axios.post(
        config.mundo_credito_service.url + "/usuario/cambiarClave/",
        data,
        headers
    )
        .then((response) => {
            console.log(response);
            return res.status(200).send(response.data)
        })
        .catch((error) => {
            return res.status(error.response.status).send({ error: error })
        })
}

/**
 * @swagger
 *
 * /public/users:
 *   get:
 *     tags:
 *       - User
 *     description: Sellers between two dates.
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
 *         description: Return user data 
 *       500:
 *         description: Service error
 *       400:
 *         description: Error fields
 */
async function getAllSellers(req, res) {
    let bodyErrors = userVal.getAllVendedoresValidation(req);
    if (bodyErrors) return res.status(400).send({ error: bodyErrors });

    let dates = {
        start_date: req.query.startDate,
        end_date: req.query.endDate
    }    
    try {
        let data = await sequelize.query(`Select * from getConsolidadoCreditosPrecursadosByVendedor('','` + dates.start_date + `','` + dates.end_date + `');`);
        return res.status(200).send(data[0])
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
}

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

/**
 * @swagger
 *
 * /public/users/summary:
 *   get:
 *     tags:
 *       - User
 *     description: Summary sellers between two dates.
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
 *         description: Return user data and  
 *       500:
 *         description: Service error
 *       400:
 *         description: Error fields
 */
async function getSellersSummary(req, res) {
    let bodyErrors = userVal.getSellersSummaryValidation(req);
    if (bodyErrors) return res.status(400).send({ error: bodyErrors });

    let dates = {
        start_date: req.query.startDate,
        end_date: req.query.endDate
    }
    try {
        let data = await sequelize.query(`Select * from getConsolidadoCreditosPrecursadosByVendedor('','` + dates.start_date + `','` + dates.end_date + `');`);
        let orderArray = [];
        let total = 0;
        await asyncForEach(
            data[0],
            async (element, index) => {
                total += parseInt(element.sumatotalmontofinanciar, 10);
                let indexSeller = orderArray.map(venta => venta.c_vendedor).indexOf(element.c_vendedor);
                if (indexSeller == -1) {
                    orderArray.push({c_vendedor:element.c_vendedor, sumatotalmontofinanciar:element.sumatotalmontofinanciar});
                } else {
                    orderArray[indexSeller].sumatotalmontofinanciar = (parseInt(orderArray[indexSeller].sumatotalmontofinanciar, 10) + parseInt(element.sumatotalmontofinanciar, 10)).toString();
                }
            })
        // let responseOrder = {};
        // responseOrder.users = orderArray;
        // responseOrder.totalAmount = total;
        return res.status(200).send(orderArray);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
}

/**
 * @swagger
 *
 * /public/user:
 *   get:
 *     tags:
 *       - User
 *     description: Specific seller between two dates.
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
 *       - name: name
 *         description: Seller Name.
 *         in: query
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Return user data 
 *       500:
 *         description: Service error
 *       400:
 *         description: Error fields
 */
async function getSeller(req, res) {
    let bodyErrors = userVal.getVendedorValidation(req);
    if (bodyErrors) return res.status(400).send({ error: bodyErrors });
    let dates = {
        name: req.query.name,
        start_date: req.query.startDate,
        end_date: req.query.endDate
    }
    try {
        let data = await sequelize.query(`Select * from getConsolidadoCreditosPrecursadosByVendedor('` + dates.name + `','` + dates.start_date + `','` + dates.end_date + `')`);
        return res.status(200).send(data[0])
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
}

/**
 * @swagger
 *
 * /public/user/detail:
 *   get:
 *     tags:
 *       - User
 *     description: Detail seller between two dates.
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
 *       - name: name
 *         description: Seller Name.
 *         in: query
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Return user data 
 *       500:
 *         description: Service error
 *       400:
 *         description: Error fields
 */
async function getSellerDetail(req, res) {
    let bodyErrors = userVal.getDetalleVendedorValidation(req);
    if (bodyErrors) return res.status(400).send({ error: bodyErrors });
    let dates = {
        name: req.query.name,
        start_date: req.query.startDate,
        end_date: req.query.endDate
    }
    try {
        let data = await sequelize.query(`Select * from getDetalleCreditosPrecursadosByVendedor('` + dates.name + `','` + dates.start_date + `','` + dates.end_date + `');`);
        return res.status(200).send(data[0])
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
}

//Obtener todas las ventas paginadas
async function getAllSellersPaginated(req, res) {
    let bodyErrors = userVal.getAllVendedoresValidation(req);
    if (bodyErrors) return res.status(400).send({ error: bodyErrors });

    let dates = {
        start_date: req.query.startDate,
        end_date: req.query.endDate
    }
    let limit = req.query.limit
    let offset = 0 + (req.query.page - 1) * limit
    
    try {
        let data = await sequelize.query(`Select * from getConsolidadoCreditosPrecursadosByVendedor('','` + dates.start_date + `','` + dates.end_date + `') limit'` + limit +`' offset '` + offset +`' ;`);
        let totalData= await sequelize.query(`Select count(*) from getConsolidadoCreditosPrecursadosByVendedor('','` + dates.start_date + `','` + dates.end_date + `');`);
        let response={
            "count": parseInt(totalData[0][0].count),
            "rows": data[0],
            "current_page": parseInt(req.query.page),
            "max_pages": Math.ceil(totalData[0][0].count / limit)
        };
        return res.status(200).send(response)
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
}

//Calcular puntos por ventas y puntos totales
async function calculatePoints(sales){
    let puntos_totales = 0;
    let puntos_por_creditos = 0;
    let puntos_mpp = 0;
    let puntos_compra_inteligente= 0;
    let puntos_seguros = 0;
    await asyncForEach(
        sales,
        async (element, index) => {
            if(element.seguroasistencia!=0 || element.segurocontenido!=0 || element.seguroupgradedesgravamen!=0){
                puntos_totales +=3;
                puntos_seguros +=3;
            }
        })
    let obj={
        puntos_totales:puntos_totales,
        puntos_por_creditos:puntos_por_creditos,
        puntos_mpp:puntos_mpp,
        puntos_compra_inteligente:puntos_compra_inteligente,
        puntos_seguros:puntos_seguros
    }
    return {obj};
}

//filtra las ventas por un usuario
async function filterSalesByUser(data,seller){
    const orderArray = data.filter(element => element.vendedor == seller); 
    return orderArray;
} 

async function test(req, res) {
    let json= [{
        "numerooperacion": 1099418,
        "vendedor": "nicolas",
        "nombreproducto": "C.C. USADO SOCIO ALFA",
        "montofinanciar": "6276493",
        "segurodesgravamen": 1,
        "segurocesantia": 0,
        "seguroautomotriz": 0,
        "seguroasistencia": 1,
        "segurocontenido": 1,
        "seguroupgradedesgravamen": 0
    },
    {
        "numerooperacion": 1099427,
        "vendedor": "nicolas",
        "nombreproducto": "INST. C.C. USADO SOCIO ALFA",
        "montofinanciar": "3756363",
        "segurodesgravamen": 1,
        "segurocesantia": 0,
        "seguroautomotriz": 0,
        "seguroasistencia": 1,
        "segurocontenido": 1,
        "seguroupgradedesgravamen": 0
    },
    {
        "numerooperacion": 1103390,
        "vendedor": "alejandro",
        "nombreproducto": "INST. C.C. USADO SOCIO ALFA",
        "montofinanciar": "14963393",
        "segurodesgravamen": 0,
        "segurocesantia": 0,
        "seguroautomotriz": 0,
        "seguroasistencia": 0,
        "segurocontenido": 0,
        "seguroupgradedesgravamen": 1
    }]
    let bodyErrors = userVal.getDetalleVendedorValidation(req);
    if (bodyErrors) return res.status(400).send({ error: bodyErrors });
    let dates = {
        name: req.query.name,
        start_date: req.query.startDate,
        end_date: req.query.endDate
    }
    try {
        // let data = await sequelize.query(`Select * from getDetalleCreditosPrecursadosByVendedor('` + dates.name + `','` + dates.start_date + `','` + dates.end_date + `');`);
        // if(data[0].length==undefined){return res.status(404).send("User not found");}
        // let totalPoints= await calculatePoints(data[0]);
        let totalPoints= await calculatePoints(json);
        return res.status(200).send(totalPoints.obj);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}


async function getRanking(req,res){
    let json= [{
        "numerooperacion": 1099418,
        "vendedor": "nicolas",
        "nombreproducto": "C.C. USADO SOCIO ALFA",
        "montofinanciar": "6276493",
        "segurodesgravamen": 1,
        "segurocesantia": 0,
        "seguroautomotriz": 0,
        "seguroasistencia": 1,
        "segurocontenido": 1,
        "seguroupgradedesgravamen": 0
    },
    {
        "numerooperacion": 1099427,
        "vendedor": "nicolas",
        "nombreproducto": "INST. C.C. USADO SOCIO ALFA",
        "montofinanciar": "3756363",
        "segurodesgravamen": 1,
        "segurocesantia": 0,
        "seguroautomotriz": 0,
        "seguroasistencia": 1,
        "segurocontenido": 1,
        "seguroupgradedesgravamen": 0
    },
    {
        "numerooperacion": 1103390,
        "vendedor": "alejandro",
        "nombreproducto": "INST. C.C. USADO SOCIO ALFA",
        "montofinanciar": "14963393",
        "segurodesgravamen": 0,
        "segurocesantia": 0,
        "seguroautomotriz": 0,
        "seguroasistencia": 0,
        "segurocontenido": 0,
        "seguroupgradedesgravamen": 1
    }]
    let bodyErrors = userVal.getDetalleVendedorValidation(req);
    if (bodyErrors) return res.status(400).send({ error: bodyErrors });
    let dates = {
        name: req.query.name,
        start_date: req.query.startDate,
        end_date: req.query.endDate
    }
    try {
        // let data = await sequelize.query(`Select * from getDetalleCreditosPrecursadosByVendedor('` + dates.name + `','` + dates.start_date + `','` + dates.end_date + `');`);
        let sellerArray = [];
        await asyncForEach(
            json,
            async (element, index) => {
                // let indexSeller = sellerArray.map(seller => seller.usuario).indexOf(element.vendedor);
                let isSeller=sellerArray.find(seller=>seller.usuario==element.vendedor);
                // if (indexSeller == -1) {
                if (isSeller === undefined) {
                    let arraySellerSummary=await filterSalesByUser(json,element.vendedor);
                    let totalPoints= await calculatePoints(arraySellerSummary);
                    sellerArray.push({usuario:element.vendedor,puntos:totalPoints.obj});
                }
            })  
        let orderArray=sellerArray.sort((a,b)=>b.puntos.puntos_totales-a.puntos.puntos_totales);    
        return res.status(200).send(orderArray);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
}

module.exports = {
    changePassword,
    getAllSellers,
    getSeller,
    getSellerDetail,
    getSellersSummary,
    test,
    getRanking
}