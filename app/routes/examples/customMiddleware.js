const router = require("express").Router();
const { body } = require("express-validator");
const { asyncHandler } = require("../../utilities");
const { validateRequest } = require("../../middleware");
const { events, games } = require("../../constants");

const valArray = [
  /* Every request should have a user id */
  body("userId")
    .exists()
    .withMessage("userId is required")
    .isMongoId()
    .withMessage("userId must be a valid mongo id"),

  /* Every request should have a event */
  body("event")
    .exists()
    .withMessage("event is required")
    .isString()
    .withMessage("event must be a string")
    .isIn(events)
    .withMessage(`event must be one of the following: [${events.join(", ")}]`),

  /*GameScore events should have game */
  body("game")
    .if(body("event").equals("GameScore"))
    .exists()
    .withMessage("game is required")
    .isString()
    .withMessage("game must be a string")
    .isIn(games)
    .withMessage(`game must be one of the following: [${games.join(", ")}]`),

  /*GameScore events should have a score that is an int and between 0-100 */
  body("score")
    .if(body("event").equals("GameScore"))
    .exists()
    .withMessage("score is required")
    .isInt()
    .withMessage("score must be an integer")
    .isIn([0, 100])
    .withMessage("score must be between 0 and 100"),
];

router.post(
  "/",
  validateRequest(valArray),
  asyncHandler(async (req, res, next) => {
    res.json({ message: "validation passed!" });
  })
);

module.exports = router;
