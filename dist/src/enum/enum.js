"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtExpire = exports.StatusUserEnum = void 0;
var StatusUserEnum;
(function (StatusUserEnum) {
    StatusUserEnum[StatusUserEnum["user"] = 1] = "user";
    StatusUserEnum[StatusUserEnum["manager"] = 10] = "manager";
    StatusUserEnum[StatusUserEnum["admin"] = 100] = "admin";
})(StatusUserEnum || (exports.StatusUserEnum = StatusUserEnum = {}));
var JwtExpire;
(function (JwtExpire) {
    JwtExpire["meiaHora"] = "30m";
    JwtExpire["umaHora"] = "1h";
    JwtExpire["duasHoras"] = "2h";
})(JwtExpire || (exports.JwtExpire = JwtExpire = {}));
