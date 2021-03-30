var validator = require('validator');

function loginValidation(req){
    if (!req.body.email || validator.isEmpty(req.body.email + "")) { return "Email del usuario es requerido"; }
    if (!req.body.password || validator.isEmpty(req.body.password + "")) { return "Contraseña del usuario es requerido"; }
}

module.exports={
    loginValidation
}