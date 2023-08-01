const controller = require("../controllers/todoItem");
const router = require("express").Router();

router
  .get("/", controller.getAll)
  .post("/", controller.createOne)
  .delete("/:id", controller.deleteOne)
  .put("/:id", controller.updateOne);

module.exports = router;
