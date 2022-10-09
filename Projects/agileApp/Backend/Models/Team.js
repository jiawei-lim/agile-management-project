const Sequelize = require('sequelize');
const db = require('../db');

//Represent Database schema to Sequelize
const Team = db.define('team',{
    member_id:{
        type:Sequelize.INTEGER,
        primaryKey:true
    },
    name:{
        type:Sequelize.STRING
    },
    email:{
        type:Sequelize.STRING
    }
},{
    id:false,
    createdAt:false,
    updatedAt:false
})

module.exports = Team