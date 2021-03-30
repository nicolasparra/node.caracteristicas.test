var validator = require('validator');
const moment = require('moment');

function productDateValidation(req){
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
    productDateValidation
}