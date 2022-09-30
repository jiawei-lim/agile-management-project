const Sequelize = require('sequelize');
const db = require('../db');

//Represent Database schema to Sequelize
const Sprint = db.define('sprint',{
    sprint_id:{
        type:Sequelize.INTEGER,
        primaryKey:true
    },
    sprint_name:{
        type:Sequelize.STRING
    },
    start_date:{
        type:Sequelize.DATE
    },
    end_date:{
        type:Sequelize.DATE
    },
    sprint_status:{
        type:Sequelize.STRING
    }
},{
    id:false,
    createdAt:false,
    updatedAt:false
})

module.exports = Sprint