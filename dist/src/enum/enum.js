"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusUserEnum = void 0;
var StatusUserEnum;
(function (StatusUserEnum) {
    StatusUserEnum[StatusUserEnum["user"] = 1] = "user";
    StatusUserEnum[StatusUserEnum["manager"] = 10] = "manager";
    StatusUserEnum[StatusUserEnum["admin"] = 100] = "admin";
})(StatusUserEnum || (exports.StatusUserEnum = StatusUserEnum = {}));
