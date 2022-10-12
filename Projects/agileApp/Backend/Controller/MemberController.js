const Member = require("../Models/Member")

// gets all the sprints in the 'sprints' table in the DB
const getAllMembers = (req, res) => {
    Member.findAll()
        .then(act => {
            res.json(act)
        })
        .catch(err => console.log(err))
}

module.exports = {
    getAllMembers
}