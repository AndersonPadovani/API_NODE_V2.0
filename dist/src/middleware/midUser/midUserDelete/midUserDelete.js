"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MidUserDelete = void 0;
const ApiError_1 = require("../../../utils/ApiError");
const validateUserDeleteSchema_1 = require("./validateUserDeleteSchema");
async function MidUserDelete(userProps) {
    const validateUserDelete = await validateUserDeleteSchema_1.validateUserDeleteSchema
        .validate(userProps)
        .catch((error) => {
        throw new ApiError_1.BadRequest(error.message);
    });
    return validateUserDelete;
}
exports.MidUserDelete = MidUserDelete;
