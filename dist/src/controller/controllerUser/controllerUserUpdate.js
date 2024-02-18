"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerUserUpdate = void 0;
const midUserUpdate_1 = require("../../middleware/midUser/midUserUpdate/midUserUpdate");
const emailDuplicate_1 = require("../validations/emailDuplicate");
const phoneDuplicate_1 = require("../validations/phoneDuplicate");
const entityUser_1 = require("../../entity/user/entityUser");
const PasswordEncript_1 = require("../../utils/PasswordEncript");
const ApiError_1 = require("../../utils/ApiError");
async function ControllerUserUpdate(request, response, next) {
    const dbUser = new entityUser_1.User();
    const { id } = request.body.authUserProps;
    const lastUser = await dbUser.SelectById(id);
    if (!lastUser) {
        throw new ApiError_1.NotFound("Usuario não localizado!");
    }
    const { name = lastUser.name, email = lastUser.email, phone = lastUser.phone, password: pass = lastUser.password, } = request.body;
    let password = pass;
    await (0, midUserUpdate_1.MidUserUpdate)({ id, name, email, phone, password });
    password = (0, PasswordEncript_1.PasswordEncript)(pass);
    await (0, emailDuplicate_1.ValidateUserEmailDuplicate)(email, id);
    await (0, phoneDuplicate_1.ValidateUserPhoneDuplicate)(phone, id);
    const user = new entityUser_1.User();
    user.Update({ id, name, email, phone, password });
    next();
}
exports.ControllerUserUpdate = ControllerUserUpdate;
