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
const updateSprint = (req, res) => {
    msg = req.body;
    console.log(msg);
    Sprint.update(
        {
            sprint_name: msg.sprint_name,
            start_date: msg.start_date,
            end_date: msg.end_date,
            sprint_status: msg.sprint_status
        },
        {
            where: { sprint_id: msg.sprint_id }
        }
    ).then((suc) => {
        res.json("Success!")
    }).catch((err) => {
        console.log(err)
        res.json("Error!")
    })
}

const deleteSprint = (req, res) => {
    msg = req.body
    Sprint.destroy(
        {
            where: { sprint_id: msg.sprint_id }
        }
    ).then((suc) => {
        res.json("Success!")
    }).catch((err) => {
        console.log(err)
        res.json("Error!")
    })
}

module.exports = {
    getSprints,
    addSprint,
    updateSprint,
    deleteSprint
}