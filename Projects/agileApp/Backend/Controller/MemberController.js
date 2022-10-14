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

const updateMember = (req,res)=>{
    msg = req.body
    console.log(msg)
    Member.update({
        member_name:msg.member_name,
        member_email:msg.member_email
    },{
        where:{ member_id :msg.member_id  }
    }).then((suc)=>{
        res.json("Success!")
    }).catch((err)=>{
        console.log(err)
        res.json("Error!")
    })
}

const deleteMember = (req,res) => {
    msg = req.body
    Member.destroy({
        where: {member_id:msg.member_id}
    }).then(succ => res.json("Success!"))
    .catch(err=>res.json("Error!"))
}

const getName = (req, res) => {
    req_member_id = req.params.member_id;
    Member.findAll({ where: {member_id: req_member_id }})
        .then(member => {
            res.json(member)
        })
        .catch(err => console.log(err))
}

module.exports = {
    updateMember,
    getMembers,
    addMember,
    deleteMember,
    getName
}