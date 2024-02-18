"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerUserDelete = void 0;
const midUserDelete_1 = require("../../middleware/midUser/midUserDelete/midUserDelete");
const entityUser_1 = require("../../entity/user/entityUser");
const selectById_1 = require("../validations/selectById");
const isAdmin_1 = require("../validations/isAdmin");
async function ControllerUserDelete(request, response, next) {
    await (0, isAdmin_1.IsAdmin)(request.body.authUserProps.id);
    const { id } = request.body;
    await (0, midUserDelete_1.MidUserDelete)({ id });
    await (0, selectById_1.ValidateUserDeleteById)(id);
    const user = new entityUser_1.User();
    user.Delete(id);
    next();
}
exports.ControllerUserDelete = ControllerUserDelete;
