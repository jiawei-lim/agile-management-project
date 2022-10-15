const db = require('../db');
const Task = require('../Models/Task');

//Gets all the tasks in the 'tasks' table in the DB
const getTasks = (req, res) => {
    req_sprint_id = req.params.sprint_id;

    Task.findAll(req_sprint_id ? { where: { sprint_id: req_sprint_id } } : {})
        .then(task => {
            res.json(task)
        })
        .catch(err => console.log(err))
}

const filterTask = (req, res) => {
    req_tag = req.params.filterTag;

    Task.findAll(req_tag ? { where: { tag: req_tag } } : {})
        .then(task => {
            res.json(task)
        })
        .catch(err => console.log(err))
}

//Get task according to 

//Insert Task into the DB
const addTask = (req, res) => {
    msg = req.body
    console.log(msg)
    Task.create({
        name: msg.name,
        description: msg.description,
        status: msg.status,
        priority: msg.priority,
        tag: msg.tag,
        member_id: msg.member_id,
        story_point: msg.story_point,
        due_date: msg.due_date,
        sprint_id: msg.sprint_id,
        total_time: msg.total_timex
    }).then((suc) => {

        res.json("Success!")
    }).catch((err) => {
        console.log(err)
        res.json("Error!")
    })
}

const deleteTask = (req, res) => {
    msg = req.body
    Task.destroy({
        where: { task_id: msg.task_id }
    }).then(succ => res.json("Success!"))
        .catch(err => res.json("Error!"))
}

const updateTask = (req, res) => {
    msg = req.body
    console.log(msg)
    Task.update({
        name: msg.name,
        description: msg.description,
        status: msg.status,
        priority: msg.priority,
        tag: msg.tag,
        member_id: msg.member_id,
        story_point: msg.story_point,
        due_date: msg.due_date,
        sprint_id: msg.sprint_id,
        total_time: msg.total_time
    }, {
        where: { task_id: msg.task_id }
    }).then((suc) => {
        res.json("Success!")
    }).catch((err) => {
        console.log(err)
        res.json("Error!")
    })
}

// Export the above method
module.exports = {
    getTasks,
    addTask,
    deleteTask,
    updateTask,
    filterTask
}