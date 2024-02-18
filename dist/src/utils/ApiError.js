"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFound = exports.Unautorized = exports.InternalServerError = exports.Conflict = exports.BadRequest = exports.ApiError = void 0;
class ApiError extends Error {
    constructor(erroMessage, statusCode) {
        super(erroMessage);
        this.statusCode = statusCode;
    }
}
exports.ApiError = ApiError;
class BadRequest extends ApiError {
    constructor(errorMessage) {
        super(errorMessage, 400);
    }
}
exports.BadRequest = BadRequest;
class Conflict extends ApiError {
    constructor(errorMessage) {
        super(errorMessage, 409);
    }
}
exports.Conflict = Conflict;
class InternalServerError extends ApiError {
    constructor(errorMessage) {
        super(errorMessage, 500);
    }
}
exports.InternalServerError = InternalServerError;
class Unautorized extends ApiError {
    constructor(errorMessage) {
        super(errorMessage, 401);
    }
}
exports.Unautorized = Unautorized;
class NotFound extends ApiError {
    constructor(errorMessage) {
        super(errorMessage, 404);
    }
}
exports.NotFound = NotFound;
