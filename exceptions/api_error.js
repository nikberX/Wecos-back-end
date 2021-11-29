module.exports = class ApiError extends Error {
    status;
    errors;

    constructor(status, message, errors) {
        super(message);
        this.status = status
        this.errors = errors
    }

    static UnauthorizedError() {
        return ApiError(401, 'Unauthorized')
    }

    static BadRequest(errors = []) {
        return ApiError(400, 'Bad request', errors)
    }
}