"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = void 0;
const createUUID_1 = require("../utills/createUUID");
class Course {
    constructor(props, id) {
        this.id = id || (0, createUUID_1.createUUID)();
        this.title = props.title;
        this.slug = props.slug;
        this.priceCents = props.priceCents;
        this.capacity = props.capacity;
        this.createdAt = props.createdAt || new Date();
        this.updatedAt = new Date();
    }
    toJson() {
        return {
            id: this.id,
            title: this.title,
            slug: this.slug,
            priceCents: this.priceCents,
            capacity: this.capacity,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}
exports.Course = Course;
