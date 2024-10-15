"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MidLoginPhone = MidLoginPhone;
const ApiError_1 = require("../../../utils/ApiError");
const validateLoginPhoneSchema_1 = require("./validateLoginPhoneSchema");
async function MidLoginPhone(userProps) {
    const validateLoginPhone = await validateLoginPhoneSchema_1.validateLoginPhoneSchema
        .validate(userProps)
        .catch((error) => {
        throw new ApiError_1.BadRequest(error.message);
    });
    return validateLoginPhone;
}
