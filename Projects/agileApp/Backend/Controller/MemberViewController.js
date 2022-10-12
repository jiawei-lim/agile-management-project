const Member_view = require("../Models/Member_view")

// gets all the sprints in the 'sprints' table in the DB
const getAllMembers = (req, res) => {
    Member_view.findAll()
        .then(act => {
            res.json(act)
        })
        .catch(err => console.log(err))
}

module.exports = {
    getAllMembers
}