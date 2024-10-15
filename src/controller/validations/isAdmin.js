"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsAdmin = IsAdmin;
const entityUser_1 = require("../../entity/user/entityUser");
const ApiError_1 = require("../../utils/ApiError");
async function IsAdmin(id) {
    const user = new entityUser_1.User();
    const resp = await user.SelectById(id);
    if (!resp) {
        throw new ApiError_1.Unautorized("Usuario sem privilegios administrativos");
    }
    return resp;
}
