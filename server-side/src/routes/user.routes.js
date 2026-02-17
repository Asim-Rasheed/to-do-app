const express=require("express");
const{login, register,me}=require("../controller/users.js");
const { authenticatonToken } = require("../middleware/auth.js");
const {createTask, accessTask, markTaskCompletedByAdmin} = require("../controller/task.js")

const router=express.Router();

router.post("/auth/login", login)
router.post("/auth/register", register)

router.post("/createTask", authenticatonToken, createTask)
router.get("/accessTask", authenticatonToken, accessTask)

router.put("/updatetaskstatus/:id", authenticatonToken, markTaskCompletedByAdmin)

router.get("/me", authenticatonToken, me);
module.exports=router;