const express = require("express")
const router = express.Router() //Router module by Express

//To get methods from controller
const controller = require("../Controller/SprintController")

router.get('/', controller.getSprints) // GET request (application requests for data)
router.post('/insert', controller.addSprint)
router.post('/update', controller.updateSprint)
router.post('/delete', controller.deleteSprint)

module.exports = router