"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MidForgoutChangePass = MidForgoutChangePass;
const ApiError_1 = require("../../../utils/ApiError");
const validateUserForgoutByEmailSchema_1 = require("./validateUserForgoutByEmailSchema");
async function MidForgoutChangePass(userProps) {
    const validatePass = await validateUserForgoutByEmailSchema_1.validateUserChangePassSchema
        .validate(userProps)
        .catch((error) => {
        throw new ApiError_1.BadRequest(error.message);
    });
    return validatePass;
}
