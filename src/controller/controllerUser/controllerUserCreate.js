"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerUserCreate = ControllerUserCreate;
const midUserCreate_1 = require("../../middleware/midUser/midUserCreate/midUserCreate");
const PasswordEncript_1 = require("../../utils/PasswordEncript");
const entityUser_1 = require("../../entity/user/entityUser");
const emailDuplicate_1 = require("../validations/emailDuplicate");
const phoneDuplicate_1 = require("../validations/phoneDuplicate");
async function ControllerUserCreate(request, response, next) {
    const { name, email, phone, password: pass, } = request.body;
    let password = pass;
    await (0, midUserCreate_1.MidUserCreate)({ name, email, phone, password });
    password = (0, PasswordEncript_1.PasswordEncript)(pass);
    await (0, emailDuplicate_1.ValidateUserEmailDuplicate)(email);
    await (0, phoneDuplicate_1.ValidateUserPhoneDuplicate)(phone);
    const user = new entityUser_1.User();
    user.Create({ name, email, phone, password });
    next();
}
