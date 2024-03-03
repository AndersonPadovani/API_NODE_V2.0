"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MidForgoutByEmail = void 0;
const ApiError_1 = require("../../../utils/ApiError");
const validateLoginEmailSchema_1 = require("./validateLoginEmailSchema");
async function MidForgoutByEmail(userProps) {
    const validateLoginEmail = await validateLoginEmailSchema_1.validateLoginEmailSchema
        .validate(userProps)
        .catch((error) => {
        throw new ApiError_1.BadRequest(error.message);
    });
    return validateLoginEmail;
}
exports.MidForgoutByEmail = MidForgoutByEmail;
