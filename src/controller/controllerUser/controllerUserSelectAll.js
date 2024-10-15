"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerUserSelectAll = ControllerUserSelectAll;
const entityUser_1 = require("../../entity/user/entityUser");
async function ControllerUserSelectAll(request, response, next) {
    const user = new entityUser_1.User();
    const usersProps = await user.selectAllUser();
    request.body.DataUser = usersProps;
    next();
}
