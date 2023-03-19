const {validationResult} = require("express-validator");

const {BadRequestError} = require("../errors/errors.js");
const responseBuilder = require("../util/responseBuilder.js");

const getValidationErrorMessage = errors => {
    const errorsArray = errors.array({onlyFirstError: true});
    let message = "";
    let first = true;
    for (const error of errorsArray) {
        if (first)
            first = false;
        else
            message += "; ";
        message += `Error en ${error.param} (${error.msg})`;
    }
    return message;
}

// Middleware que se llamará luego de todos los middlwares de validación:
const validate = (req, res, next) => {
    let response;
    try {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            const message = getValidationErrorMessage(errores);
            throw new BadRequestError(message);
        }
        return next();
    } catch (error) {
        response = responseBuilder.getBadResponse(error);
    }
    res.status(response.status).json(response);
};

module.exports = {
    validate
};