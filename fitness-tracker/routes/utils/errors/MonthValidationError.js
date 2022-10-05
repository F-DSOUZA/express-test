const { ValidationError } = require("./ValidationError");

class MonthValidationError extends ValidationError {
  constructor() {
    super(
      "the month entered is not in the correct format, please enter it in the format MM"
    );
  }
}

module.exports = { MonthValidationError };
