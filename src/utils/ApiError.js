export class ApiError extends Error {
    statusCode;
    constructor(erroMessage, statusCode) {
        super(erroMessage);
        this.statusCode = statusCode;
    }
}
export class BadRequest extends ApiError {
    constructor(errorMessage) {
        super(errorMessage, 400);
    }
}
export class Conflict extends ApiError {
    constructor(errorMessage) {
        super(errorMessage, 409);
    }
}
export class InternalServerError extends ApiError {
    constructor(errorMessage) {
        super(errorMessage, 500);
    }
}
export class Unautorized extends ApiError {
    constructor(errorMessage) {
        super(errorMessage, 401);
    }
}
export class NotFound extends ApiError {
    constructor(errorMessage) {
        super(errorMessage, 404);
    }
}
