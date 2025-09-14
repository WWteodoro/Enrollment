"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Enrollment = void 0;
const createUUID_1 = require("../utills/createUUID");
class Enrollment {
    constructor(props, id) {
        this.id = id || (0, createUUID_1.createUUID)();
        this.studentId = props.studentId;
        this.courseId = props.courseId;
        this.status = props.status;
        this.createdAt = props.createdAt || new Date();
        this.updatedAt = new Date();
    }
    toJson() {
        return {
            id: this.id,
            studentId: this.studentId,
            courseId: this.courseId,
            status: this.status,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}
exports.Enrollment = Enrollment;
