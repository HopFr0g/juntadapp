const {body} = require("express-validator/check");

const validator = require("../middlewares/validator.js");

const constants = require("../util/constants.js");

const findCoincidenciasByReunion = [
    body("idPersonas", constants.VALIDACION_NO_NULO_NO_VACIO).exists().not().isEmpty(),
    body("idPersonas", constants.VALIDACION_ARRAY_ENTEROS).isArray(),
    body("idPersonas.*", constants.VALIDACION_ENTERO).isInt(),
    body("idPersonas", constants.VALIDACION_MIN_ELEMENTOS + constants.MIN_PERSONAS_PARA_COINCIDIR).custom(array => array.length >= 2),
    
    validator.validate
];

module.exports = {
    findCoincidenciasByReunion
};