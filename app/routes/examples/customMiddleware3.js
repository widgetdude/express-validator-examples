const router = require("express").Router();
const { asyncHandler } = require("../../utilities");
const { validateRequest } = require("../../middleware");
const validations = require("../../validations/example");

/* 
  This example imports the actual validation rules from a separate file. And
  then uses the validateRequest middleware to run the validation rules.
  It just makes the code a little cleaner.
*/

router.post(
  "/",
  validateRequest([
    validations.userId,
    validations.event,
    validations.game,
    validations.score,
  ]),
  asyncHandler(async (req, res, next) => {
    res.json({ message: "validation passed!" });
  })
);

module.exports = router;
