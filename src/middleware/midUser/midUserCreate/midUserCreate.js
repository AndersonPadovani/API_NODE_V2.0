"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MidUserCreate = MidUserCreate;
const validateUserCreateSchema_1 = require("./validateUserCreateSchema");
const ApiError_1 = require("../../../utils/ApiError");
async function MidUserCreate(userProps) {
    const validUserCreate = await validateUserCreateSchema_1.validateUserCreateSchema
        .validate(userProps)
        .catch((error) => {
        throw new ApiError_1.BadRequest(error.message);
    });
    return validUserCreate;
}
