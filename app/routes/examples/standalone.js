const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const {
  asyncHandler,
  errorResponse,
  validatorFormat,
} = require("../../utilities");
const { events, games } = require("../../constants");

/* 
  This is an example of how to use express validator as a standalone function.
  The function can be either created inline or imported from another file.
*/

const validateRequest = async (req) => {
  await body("userId")
    .exists()
    .withMessage("userId is required")
    .isMongoId()
    .withMessage("userId must be a valid mongo id")
    .run(req);

  await body("event")
    .exists()
    .withMessage("event is required")
    .isString()
    .withMessage("event must be a string")
    .isIn(events)
    .withMessage(`event must be one of the following: [${events.join(", ")}]`)
    .run(req);

  await body("game")
    .if(body("event").equals("GameScore"))
    .exists()
    .withMessage("game is required")
    .isString()
    .withMessage("game must be a string")
    .isIn(games)
    .withMessage(`game must be one of the following: [${games.join(", ")}]`)
    .run(req);

  await body("score")
    .if(body("event").equals("GameScore"))
    .exists()
    .withMessage("score is required")
    .isInt()
    .withMessage("score must be an integer")
    .isIn([0, 100])
    .withMessage("score must be between 0 and 100")
    .run(req);

  const errors = validationResult(req).formatWith(validatorFormat);
  if (!errors.isEmpty()) {
    throw new errorResponse({
      message: "Validation Error",
      statusCode: 422,
      meta: errors.array(),
    });
  }
  return null;
};

router.post(
  "/",
  asyncHandler(async (req, res, next) => {
    await validateRequest(req);

    res.json({ message: "validation passed!" });
  })
);

module.exports = router;
