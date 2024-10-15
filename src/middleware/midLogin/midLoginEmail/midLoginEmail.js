"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MidLoginEmail = MidLoginEmail;
const ApiError_1 = require("../../../utils/ApiError");
const validateLoginEmailSchema_1 = require("./validateLoginEmailSchema");
async function MidLoginEmail(userProps) {
    const validateLoginEmail = await validateLoginEmailSchema_1.validateLoginEmailSchema
        .validate(userProps)
        .catch((error) => {
        throw new ApiError_1.BadRequest(error.message);
    });
    return validateLoginEmail;
}
