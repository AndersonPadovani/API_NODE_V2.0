"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateUserDeleteById = ValidateUserDeleteById;
const database_1 = require("../../database/database");
const ApiError_1 = require("../../utils/ApiError");
async function ValidateUserDeleteById(id) {
    const resp = await database_1.prisma.user.findFirst({ where: { id } });
    if (!resp) {
        throw new ApiError_1.NotFound(`ID: ${id}, não cadastrado no sistema!`);
    }
}
