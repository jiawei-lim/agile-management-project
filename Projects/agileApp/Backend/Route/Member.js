const express = require("express")
const router = express.Router() //Router module by Express

//To get methods from controller
const controller = require("../Controller/MemberController")

router.get('/', controller.getMembers) // GET request (application requests for data)

router.post('/insert', controller.addMember)
router.post('/update',controller.updateMember)
router.post('/delete',controller.deleteMember)
router.get('/getName/:member_id',controller.getName)


module.exports = router