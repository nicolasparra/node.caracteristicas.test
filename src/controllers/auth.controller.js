const config = require('../config');
const axios = require('axios');
const authVal = require('../validations/auth.validation')



/**
 * @swagger
 *
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     description: Login of the application that uses the Mundo Crédito login service.
 *     produces:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *          schema:
 *            $ref: '#/definitions/Login'
 *     responses:
 *       200:
 *         description: Return user data, user permissions, types of users, Token, msg
 *       401:
 *         description: Error login
 *       400:
 *         description: Error inputs
 *definitions:
 *  Login:
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
 * 
 */
async function login(req,res){
    let bodyErrors= authVal.loginValidation(req);
    if(bodyErrors) return res.status(400).send({Error: bodyErrors});

    let data={
        c_id: req.body.email,
        a_Clave:req.body.password       
    }

    const headers ={
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*'
        }
    }
    axios.post (
        config.mundo_credito_service.url+"/usuario/login/",
        data,
        headers
    )
    .then((response)=>{
        return res.status(200).send({data: response.data})
    })
    .catch((error)=>{
        return res.status(error.response.status).send({error: error})
    }) 
}

async function logout(req,res){
    return res.status(200).send(true)
}



module.exports = {
    login,
    logout
}