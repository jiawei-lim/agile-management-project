const express = require("express")
const router = express.Router() //Router module by Express

//To get methods from controller
const controller = require("../Controller/TeamController")

router.get('/', controller.getTeam) // GET request (application requests for data)
router.post('/insert', controller.addMember)


module.exports = router