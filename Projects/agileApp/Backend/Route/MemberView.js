const express = require("express")
const router = express.Router() //Router module by Express

//To get methods from controller
const controller = require("../Controller/MemberViewController")

router.get('/', controller.getMemberView) // GET request (application requests for data)

module.exports = router