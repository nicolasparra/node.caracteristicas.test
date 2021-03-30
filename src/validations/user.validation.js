var validator = require('validator');
const moment = require('moment');

function changePasswordValidation(req){
    if (!req.body.email || validator.isEmpty(req.body.email + "")) { return "Email is required"; }
    if (!req.body.password || validator.isEmpty(req.body.password + "")) { return "Password is required"; }
}

function getAllVendedoresValidation(req){
    if (!req.query.startDate || validator.isEmpty(req.query.startDate + "")) { return "startDate is required"; }
    if (!req.query.endDate || validator.isEmpty(req.query.endDate + "")) { return "endDate is required"; }
    if (!isValidDate(req.query.startDate)) { return "startDate invalid format"; }
    if (!isValidDate(req.query.endDate)) { return "endDate invalid format"; }
    if(moment(req.query.startDate, "DD-MM-YYYY").toDate()>moment(req.query.endDate, "DD-MM-YYYY").toDate()){ return "startDate must be less";}
}

function getVendedorValidation(req){
    if (!req.query.name || validator.isEmpty(req.query.name + "")) { return "Name is required"; }
    if (!req.query.startDate || validator.isEmpty(req.query.startDate + "")) { return "startDate is required"; }
    if (!req.query.endDate || validator.isEmpty(req.query.endDate + "")) { return "endDate is required"; }
    if (!isValidDate(req.query.startDate)) { return "startDate invalid format"; }
    if (!isValidDate(req.query.endDate)) { return "endDate invalid format"; }
    if(moment(req.query.startDate, "DD-MM-YYYY").toDate()>moment(req.query.endDate, "DD-MM-YYYY").toDate()){ return "startDate must be less";}
}

function getDetalleVendedorValidation(req){
    if (!req.query.name || validator.isEmpty(req.query.name + "")) { return "Name is required"; }
    if (!req.query.startDate || validator.isEmpty(req.query.startDate + "")) { return "startDate is required"; }
    if (!req.query.endDate || validator.isEmpty(req.query.endDate + "")) { return "endDate is required"; }
    if (!isValidDate(req.query.startDate)) { return "startDate invalid format"; }
    if (!isValidDate(req.query.endDate)) { return "endDate invalid format"; }
    if(moment(req.query.startDate, "DD-MM-YYYY").toDate()>moment(req.query.endDate, "DD-MM-YYYY").toDate()){ return "startDate must be less";}
}

function getSellersSummaryValidation(req){
    if (!req.query.startDate || validator.isEmpty(req.query.startDate + "")) { return "startDate is required"; }
    if (!req.query.endDate || validator.isEmpty(req.query.endDate + "")) { return "endDate is required"; }
    if (!isValidDate(req.query.startDate)) { return "startDate invalid format"; }
    if (!isValidDate(req.query.endDate)) { return "endDate invalid format"; }
    if(moment(req.query.startDate, "DD-MM-YYYY").toDate()>moment(req.query.endDate, "DD-MM-YYYY").toDate()){ return "startDate must be less";}
}

function getProductSummaryValidation(req){
    if (!req.query.startDate || validator.isEmpty(req.query.startDate + "")) { return "startDate is required"; }
    if (!req.query.endDate || validator.isEmpty(req.query.endDate + "")) { return "endDate is required"; }
    if (!isValidDate(req.query.startDate)) { return "startDate invalid format"; }
    if (!isValidDate(req.query.endDate)) { return "endDate invalid format"; }
    if(moment(req.query.startDate, "DD-MM-YYYY").toDate()>moment(req.query.endDate, "DD-MM-YYYY").toDate()){ return "startDate must be less";}
}

function isValidDate(dateString) {
    //moment(req.query.end_date, 'DD-MM-YYYY', true).isValid()
    var regEx = /^([0-2][0-9]|3[0-1])(\/|-)(0[1-9]|1[0-2])\2(\d{4})$/;
    if(!dateString.match(regEx)) return false;
    return true;
}

module.exports={
    changePasswordValidation,
    getAllVendedoresValidation,
    getVendedorValidation,
    getDetalleVendedorValidation,
    getSellersSummaryValidation,
    getProductSummaryValidation
}