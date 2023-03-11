class BadRequestError extends Error {
    constructor(message) {
        super(message);
        this.name = "BadRequestError";
        this.status = 400;
    }
}

class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "NotFoundError";
        this.status = 404;
    }
}

class InternalServerError extends Error {
    constructor(message) {
        super(message);
        this.name = "InternalServerError";
        this.status = 500;
    }
}

module.exports = {
    BadRequestError,
    NotFoundError,
    InternalServerError
}