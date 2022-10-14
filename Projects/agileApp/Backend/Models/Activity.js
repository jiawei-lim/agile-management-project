const Sequelize = require('sequelize');
const db = require('../db');

//Represent Database schema to Sequelize
const Activity = db.define('activity',{
    activity_id:{
        type:Sequelize.INTEGER,
        primaryKey:true
    },
    member_id:{
        type:Sequelize.INTEGER
    },
    activity_desc:{
        type:Sequelize.STRING
    }
    ,
    activity_dur:{
        type:Sequelize.TIME
    },
    activity_datetime:{
        type:Sequelize.DATE
    },
    task_id:{
        type:Sequelize.INTEGER,
        references:'tasks',
        referencesKey: 'task_id' 
    }
},{
    freezeTableName: true,
    id:false,
    createdAt:false,
    updatedAt:false
})

module.exports = Activity