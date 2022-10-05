const { ValidationError } = require("./ValidationError");

class YearValidationError extends ValidationError {
  constructor() {
    super(
      "the year entered is not in the correct format, please enter it in the format YYYY"
    );
  }
}

module.exports = { YearValidationError };
