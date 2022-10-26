const { validationResult } = require("express-validator");
const {
  errorResponse,
  asyncHandler,
  validatorFormat,
} = require("../utilities");

const validateRequest = (valArray) => {
  return asyncHandler(async (req, res, next) => {
    await Promise.all(valArray.map((validation) => validation.run(req)));

    const errors = validationResult(req).formatWith(validatorFormat);
    if (!errors.isEmpty()) {
      throw new errorResponse({
        message: "Validation Error",
        statusCode: 422,
        meta: errors.array(),
      });
    }
    return next();
  });
};
module.exports = validateRequest;
