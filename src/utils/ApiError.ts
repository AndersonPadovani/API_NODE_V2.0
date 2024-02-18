export class ApiError extends Error {
    public readonly statusCode: number;

    constructor(erroMessage: string, statusCode: number) {
        super(erroMessage);
        this.statusCode = statusCode;
    }
}

export class BadRequest extends ApiError {
    constructor(errorMessage: string) {
        super(errorMessage, 400);
    }
}

export class Conflict extends ApiError {
    constructor(errorMessage: string) {
        super(errorMessage, 409);
    }
}

export class InternalServerError extends ApiError {
    constructor(errorMessage: string) {
        super(errorMessage, 500);
    }
}

export class Unautorized extends ApiError {
    constructor(errorMessage: string) {
        super(errorMessage, 401);
    }
}

export class NotFound extends ApiError {
    constructor(errorMessage: string) {
        super(errorMessage, 404);
    }
}
