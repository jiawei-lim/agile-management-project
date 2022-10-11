const Sequelize = require('sequelize');
const db = require('../db');

//Represent Database schema to Sequelize
const Member = db.define('members',{
    member_id:{
        type:Sequelize.INTEGER,
        primaryKey:true
    },
    member_name:{
        type:Sequelize.STRING
    },
    member_email:{
        type:Sequelize.STRING
    }
},{
    id:false,
    createdAt:false,
    updatedAt:false
})

module.exports = Member