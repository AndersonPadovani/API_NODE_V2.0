"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MidUserUpdate = MidUserUpdate;
const ApiError_1 = require("../../../utils/ApiError");
const validateUserUpdateSchema_1 = require("./validateUserUpdateSchema");
async function MidUserUpdate(userProps) {
    const validateUserUpdate = await validateUserUpdateSchema_1.validateUserUpdateSchema
        .validate(userProps)
        .catch((error) => {
        throw new ApiError_1.BadRequest(error.message);
    });
    return validateUserUpdate;
}
