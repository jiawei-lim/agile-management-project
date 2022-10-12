const Sprint = require("../Models/Sprint");
const { Op } = require("sequelize");
const Sequelize = require('sequelize');

// gets all the sprints in the 'sprints' table in the DB
const getSprints = (req, res) => {
    Sprint.findAll()
        .then(sprint => {
            res.json(sprint)
        })
        .catch(err => console.log(err))
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

// update the status of a sprint
const updateSprintStatus = (req, res) => {
    msg = req.body;
    console.log(msg);
    
    if(msg.sprint_status=="Active"){
        Sprint.update({
            sprint_status: msg.sprint_status
        }, {
            where: { 
                [Op.and]:[
                {sprint_id: msg.sprint_id},
                Sequelize.literal(`NOT('Active' IN (SELECT sprint_status FROM sprints))`)
                ]
            }
        }).then((suc) => {
            if(suc[0]){
                res.json({"status":"Success","message":suc})
            }else{
                res.json({"status":"Error","message":"Only 1 sprint can be active"})
            }
            
        }).catch((err) => {
            res.json("Error!")
        })
    }else{
        Sprint.update({
            sprint_status: msg.sprint_status
        }, {
            where: { sprint_id: msg.sprint_id }
        }).then((suc) => {
            res.json("Success!")
        }).catch((err) => {
            res.json("Error!")
        })
    }
   
}

module.exports = {
    getSprints,
    addSprint,
    updateSprintStatus
}