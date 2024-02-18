"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerUserUpdate = void 0;
const midUserUpdate_1 = require("../../middleware/midUser/midUserUpdate/midUserUpdate");
const emailDuplicate_1 = require("./validations/emailDuplicate");
const phoneDuplicate_1 = require("./validations/phoneDuplicate");
const entityUser_1 = require("../../entity/user/entityUser");
const PasswordEncript_1 = require("../../utils/PasswordEncript");
const enum_1 = require("../../enum/enum");
async function ControllerUserUpdate(request, response, next) {
    const { name, email, phone, password: pass, level = enum_1.StatusUserEnum.user, } = request.body;
    let password = pass;
    const { id } = request.body.authUserProps;
    await (0, midUserUpdate_1.MidUserUpdate)({ id, name, email, phone, password, level });
    password = (0, PasswordEncript_1.PasswordEncript)(pass);
    await (0, emailDuplicate_1.ValidateUserEmailDuplicate)(email, id);
    await (0, phoneDuplicate_1.ValidateUserPhoneDuplicate)(phone, id);
    const user = new entityUser_1.User();
    user.Update({ id, name, email, phone, password, level });
    next();
}
exports.ControllerUserUpdate = ControllerUserUpdate;
