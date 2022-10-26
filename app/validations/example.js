const { body } = require("express-validator");
const { events, games } = require("../constants");

module.exports = {
  userId: body("userId")
    .exists()
    .withMessage("userId is required")
    .isMongoId()
    .withMessage("userId must be a valid mongo id"),
  event: body("event")
    .exists()
    .withMessage("event is required")
    .isString()
    .withMessage("event must be a string")
    .isIn(events)
    .withMessage(`event must be one of the following: [${events.join(", ")}]`),
  game: body("game")
    .if(body("event").equals("GameScore"))
    .exists()
    .withMessage("game is required")
    .isString()
    .withMessage("game must be a string")
    .isIn(games)
    .withMessage(`game must be one of the following: [${games.join(", ")}]`),
  score: body("score")
    .if(body("event").equals("GameScore"))
    .exists()
    .withMessage("score is required")
    .isInt()
    .withMessage("score must be an integer")
    .isIn([0, 100])
    .withMessage("score must be between 0 and 100"),
};
