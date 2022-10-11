const Member = require("../Models/Member");

// gets all the sprints in the 'sprints' table in the DB
const getMembers = (req, res) => {
    Member.findAll()
        .then(team => {
            res.json(team)
        })
        .catch(err => console.log(err))
}

// insert sprint into the DB
const addMember = (req, res) => {
    msg = req.body;
    console.log(msg);
    Member.create({
        member_name: msg.member_name,
        member_email:msg.member_email
    }).then((suc) => {
        res.json("Success!");
    }).catch((err) => {
        console.log(err);
        res.json("Error!");
    })
}


module.exports = {
    getMembers,
    addMember
}