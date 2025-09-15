"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const createUUID_1 = require("../utills/createUUID");
class User {
    constructor(props, id) {
        this.id = id || (0, createUUID_1.createUUID)();
        this.name = props.name;
        this.email = props.email;
        this.password = props.password;
        this.createdAt = props.createdAt || new Date();
        this.updatedAt = new Date();
        this.role = props.role || 'STUDENT';
    }
    toJson() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            password: this.password,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            role: this.role
        };
    }
}
exports.User = User;
