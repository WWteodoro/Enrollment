"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUUID = createUUID;
const uuid_1 = require("uuid");
function createUUID() {
    return (0, uuid_1.v4)();
}
