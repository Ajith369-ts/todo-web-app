const express = require("express");

const router = express.Router();

const todoController = require("../controllers/todo");

router.get("/", todoController.getTodoList);

router.post("/:prodId/:itemId", todoController.postTodoList);

router.delete("/product/:prodId/:delId", todoController.deleteItem);

// router.get("/:createList", todoController.createList);

module.exports = router;