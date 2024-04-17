const CustomError = require('./CustomError.js');

class NotFoundError extends CustomError {
    constructor(message){
        super(message);
        this.statusCode = 404;
    }
}
module.exports = NotFoundError;