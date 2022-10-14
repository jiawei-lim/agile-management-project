const express = require("express")
const router = express.Router() //Router module by Express

//To get methods from controller
const controller = require("../Controller/TaskController")

router.get('/:sprint_id?', controller.getTasks) // GET request (application requests for data)

router.post('/insert', controller.addTask) // POST request (application sends data)

router.post('/delete', controller.deleteTask)

router.post('/update', controller.updateTask)

router.post('/filter/:filterTag?', controller.filterTask)

module.exports = router