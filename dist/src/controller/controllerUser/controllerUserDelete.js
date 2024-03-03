"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerUserDelete = void 0;
const midUserDelete_1 = require("../../middleware/midUser/midUserDelete/midUserDelete");
const entityUser_1 = require("../../entity/user/entityUser");
const selectById_1 = require("../validations/selectById");
async function ControllerUserDelete(request, response, next) {
    const { id } = request.body.authUserProps;
    await (0, midUserDelete_1.MidUserDelete)({ id });
    await (0, selectById_1.ValidateUserDeleteById)(id);
    const user = new entityUser_1.User();
    user.Delete(id);
    next();
}
exports.ControllerUserDelete = ControllerUserDelete;
