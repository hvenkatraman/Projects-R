const express=require("express");
const Todo=require("../models/Todo.js");
const todo=require("../controllers/todo")

const router = express.Router();

Todo();

router.get("/",todo.homeController);
router.get("/test",todo.testController);
router.get("/newtodo",todo.newTodoPageController);
router.get("/updatetodo",todo.updateTodoPageController);
router.get("/deletetodo",todo.deleteTodoPageController);
router.post("/newtodo",todo.newTodoController);

module.exports = router;
