export var StatusUserEnum;
(function (StatusUserEnum) {
    StatusUserEnum[StatusUserEnum["user"] = 1] = "user";
    StatusUserEnum[StatusUserEnum["manager"] = 10] = "manager";
    StatusUserEnum[StatusUserEnum["admin"] = 100] = "admin";
})(StatusUserEnum || (StatusUserEnum = {}));
export var JwtExpire;
(function (JwtExpire) {
    JwtExpire["meiaHora"] = "30m";
    JwtExpire["umaHora"] = "1h";
    JwtExpire["duasHoras"] = "2h";
})(JwtExpire || (JwtExpire = {}));
export var JwtValidEnum;
(function (JwtValidEnum) {
    JwtValidEnum[JwtValidEnum["VALID"] = 0] = "VALID";
    JwtValidEnum[JwtValidEnum["INVALID"] = 1] = "INVALID";
})(JwtValidEnum || (JwtValidEnum = {}));
