"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpError = void 0;
var HttpError;
(function (HttpError) {
    HttpError[HttpError["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HttpError[HttpError["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    HttpError[HttpError["PAYMENT_REQUIRED"] = 402] = "PAYMENT_REQUIRED";
    HttpError[HttpError["FORBIDDEN"] = 403] = "FORBIDDEN";
    HttpError[HttpError["NOT_FOUND"] = 404] = "NOT_FOUND";
    HttpError[HttpError["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
    HttpError[HttpError["NOT_IMPLENTED"] = 401] = "NOT_IMPLENTED";
})(HttpError || (exports.HttpError = HttpError = {}));
