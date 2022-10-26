const router = require("express").Router();

const examples = require("./examples");

router.use("/examples/1", examples.inline);
router.use("/examples/2", examples.customMiddleware);
router.use("/examples/3", examples.standalone);
router.use("/examples/4", examples.customMiddleware2);
router.use("/examples/5", examples.customMiddleware3);

module.exports = router;
