const Sequelize = require('sequelize');
const db = require('../db');

//Represent Database schema to Sequelize
const Task = db.define('task',{
    task_id:{
        type:Sequelize.INTEGER,
        primaryKey:true
    },
    name:{
        type:Sequelize.STRING
    },
    description:{
        type:Sequelize.STRING
    },
    status:{
        type:Sequelize.STRING
    },
    priority:{
        type:Sequelize.STRING
    },
    tag:{
        type:Sequelize.STRING
    },
    member_id:{
        type:Sequelize.INTEGER,
        references: 'members',
        referencesKey: 'member_id' 
    },
    story_point:{
        type:Sequelize.INTEGER
    },
    due_date:{
        type:Sequelize.DATE
    },
    sprint_id:{
        type:Sequelize.INTEGER,
        references: 'sprints',
        referencesKey: 'sprint_id' 
    }
    
},{
    id:false,
    createdAt:false,
    updatedAt:false
})

module.exports = Task