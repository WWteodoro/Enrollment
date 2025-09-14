"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = handleError;
const AppError_1 = require("../errors/AppError");
const HttpError_1 = require("../errors/HttpError");
function handleError(err, _, res, next) {
    if (err instanceof AppError_1.AppError) {
        res.status(err.status).json({
            message: err.message
        });
    }
    else {
        res.status(HttpError_1.HttpError.INTERNAL_SERVER_ERROR).json({
            message: `Internal Server Error - ${err.message}`
        });
    }
    next();
}
