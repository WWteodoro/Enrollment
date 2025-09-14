"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserKeys = getUserKeys;
const user_1 = require("../entities/user");
function getUserKeys() {
    let toReturn = [];
    const propsArray = Object.keys(new user_1.User({}));
    for (const prop of propsArray) {
        if (prop === 'password' || prop === 'updatedAt' || prop === 'createdAt')
            continue;
        toReturn.push(prop);
    }
    return toReturn;
}
