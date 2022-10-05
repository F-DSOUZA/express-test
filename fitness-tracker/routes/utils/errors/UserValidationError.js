const { ValidationError } = require("./ValidationError");

class UserValidationError extends ValidationError {
  constructor() {
    super("The user is cannot be found");
  }
}

module.exports = { UserValidationError };
