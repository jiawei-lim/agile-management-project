const Team = require("../Models/Team");

// gets all the sprints in the 'sprints' table in the DB
const getTeam = (req, res) => {
    Team.findAll()
        .then(team => {
            res.json(team)
        })
        .catch(err => console.log(err))
}

// insert sprint into the DB
const addMember = (req, res) => {
    msg = req.body;
    console.log(msg);
    Team.create({
        name: msg.name,
        email:msg.email
    }).then((suc) => {
        res.json("Success!");
    }).catch((err) => {
        console.log(err);
        res.json("Error!");
    })
}


module.exports = {
    getTeam,
    addMember
}