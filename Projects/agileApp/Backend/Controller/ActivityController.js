const Activity = require("../Models/Activity");

// gets all the sprints in the 'sprints' table in the DB
const getAllActivity = (req, res) => {
    Activity.findAll()
        .then(act => {
            res.json(act)
        })
        .catch(err => console.log(err))
}

const searchTask = (req,res)=>{
    req_task_id = req.params.task_id;
    Activity.findAll({where:{task_id:req_task_id}})
    .then(act=>{
        res.json(act)
    })
    .catch(err=>console.log(err))
}

//Insert Task into the DB
const addActivity = (req,res) => {
    msg = req.body
    console.log(msg)
    Activity.create({
        member_id:msg.member_id,
        activity_desc:msg.activity_desc,
        activity_dur:msg.activity_dur,
        activity_datetime:msg.activity_datetime,
        task_id:msg.task_id,
    }).then((suc)=>{
        Activity.findAll()
        .then(act=>res.json(act))
    }).catch((err)=>{
       console.log(err)
        res.json("Error!")
    })
}

const deleteActivity = (req,res) => {
    
    msg = req.body
    Activity.destroy({
        where: {activity_id: msg.activity_id}
    }).then(succ => {
        Activity.findAll()
        .then(act=>res.json(act))
    })
    .catch(err=>res.json("Error!"))
}

const updateActivity = (req,res) => {
    msg = req.body
    Activity.update({
        member_id:msg.member_id,
        activity_desc:msg.activity_desc,
        activity_dur:msg.activity_dur,
        activity_datetime:msg.activity_datetime
    },{
        where:{activity_id:msg.activity_id}
    }).then((suc)=>{
        Activity.findAll()
        .then(act=>res.json(act))
    }).catch((err)=>{
        console.log(err)
        res.json("Error!")
    })
}




module.exports = {
    getAllActivity,
    searchTask,
    addActivity,
    deleteActivity,
    updateActivity
}