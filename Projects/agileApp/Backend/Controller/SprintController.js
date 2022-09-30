const Sprint = require("../Models/Sprint");

// gets all the sprints in the 'sprints' table in the DB
const getSprints = (req,res)=>{
    Sprint.findAll()
    .then(sprint=>{
        res.json(sprint)
    })
    .catch(err=>console.log(err))
}

// insert sprint into the DB
const addSprint = (req, res) => {
    msg = req.body;
    console.log(msg);
    Sprint.create({
        sprint_name: msg.sprint_name,
        start_date: msg.start_date,
        end_date: msg.end_date,
        sprint_status: msg.status,
    }).then((suc) => {
        res.json("Success!");
    }).catch((err) => {
        console.log(err);
        res.json("Error!");
    })
}

module.exports = {
    getSprints,
    addSprint
}