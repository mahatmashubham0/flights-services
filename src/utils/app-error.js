class AppError extends Error {
    constructor(message , StatusCode) {
        super(message);
        this.StatusCode = StatusCode;
        this.explaination = message;
    }
}

module.exports = AppError