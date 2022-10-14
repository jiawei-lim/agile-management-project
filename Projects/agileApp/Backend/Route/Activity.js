const express = require("express")
const router = express.Router() //Router module by Express

//To get methods from controller
const controller = require("../Controller/ActivityController")

router.get('/getAll', controller.getAllActivity) // GET request (application requests for data)
router.get('/searchTask/:task_id',controller.searchTask) // GET request (application requests for data)
router.post('/add',controller.addActivity)
router.post('/delete',controller.deleteActivity)
router.post('/update',controller.updateActivity)

module.exports = router