const CustomError = require('./CustomError.js');

class BadRequestError extends CustomError {
    constructor(message) {
        super(message);
        this.statusCode = 400;
    }
}
module.exports = BadRequestError;