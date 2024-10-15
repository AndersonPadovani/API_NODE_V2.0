"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateUserEmailDuplicate = ValidateUserEmailDuplicate;
const database_1 = require("../../database/database");
const ApiError_1 = require("../../utils/ApiError");
async function ValidateUserEmailDuplicate(email, id) {
    const resp = await database_1.prisma.user.findFirst({ where: { email: email } });
    if (!id) {
        if (resp) {
            throw new ApiError_1.Conflict(`${email} já cadastrado no sistema!`);
        }
    }
    if (resp) {
        if (resp?.id !== id) {
            throw new ApiError_1.Conflict(`${email} já cadastrado no sistema!`);
        }
    }
    return;
}
