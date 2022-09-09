const db = require('../db');
const Task = require('../Models/Task');

//Gets all the tasks in the 'tasks' table in the DB
const getTasks = (req,res)=>{
    Task.findAll()
    .then(task=>{
        res.json(task)
    })
    .catch(err=>console.log(err))
}

//Insert Task into the DB
const addTask = (req,res) => {
    msg = req.body
    Task.create({
        name:msg.name,
        description:msg.description,
        status:msg.status,
        priority:msg.priority,
        tag:msg.tag,
        assignee:msg.assignee,
        story_point:msg.story_point,
        due_date:msg.due_date,
    }).then((suc)=>{
        res.sendStatus(200)
    }).catch((err)=>{
        res.sendStatus(500)
    })
}

const deleteTask = (req,res) => {
    msg = req.body
    Task.destroy({
        where: {task_id: msg.task_id}
    }).then(succ => res.sendStatus(200))
    .catch(err=>res.sendStatus(500))
}

const updateTask = (req,res) => {
    msg = req.body
    Task.update({
        name:msg.name,
        description:msg.description,
        status:msg.status,
        priority:msg.priority,
        tag:msg.tag,
        assignee:msg.assignee,
        story_point:msg.story_point,
        due_date:msg.due_date,
    },{
        where:{task_id:msg.task_id}
    }).then((suc)=>{
        res.sendStatus(200)
    }).catch((err)=>{
        console.log(err)
        res.sendStatus(500)
    })
}

// Export the above method
module.exports = {
    getTasks,
    addTask,
    deleteTask,
    updateTask
}