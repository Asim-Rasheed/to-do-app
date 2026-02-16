const express=require("express");
const{login, register}=require("../controller/users.js");
const { authenticatonToken } = require("../middleware/auth.js");
const {createTask, accessTask, me} = require("../controller/task.js")

const router=express.Router();

router.post("/auth/login", login)
router.post("/auth/register", register)

router.post("/createTask", authenticatonToken, me, createTask)
router.get("/accessTask", authenticatonToken, me, accessTask)
module.exports=router;