const MemberView = require("../Models/MemberView");

// gets all the sprints in the 'sprints' table in the DB
const getMemberView = (req, res) => {
    MemberView.findAll()
        .then(team => {
            res.json(team)
        })
        .catch(err => console.log(err))
}



module.exports = {
    getMemberView
}