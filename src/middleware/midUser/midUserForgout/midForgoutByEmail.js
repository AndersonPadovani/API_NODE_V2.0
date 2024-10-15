"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MidForgoutByEmail = MidForgoutByEmail;
const ApiError_1 = require("../../../utils/ApiError");
const validateUserForgoutByEmailSchema_1 = require("./validateUserForgoutByEmailSchema");
async function MidForgoutByEmail(userProps) {
    const validateEmail = await validateUserForgoutByEmailSchema_1.validateUserForgoutByEmailSchema
        .validate(userProps)
        .catch((error) => {
        throw new ApiError_1.BadRequest(error.message);
    });
    return validateEmail;
}
