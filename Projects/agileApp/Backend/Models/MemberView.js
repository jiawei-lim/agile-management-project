const Sequelize = require('sequelize');
const db = require('../db');

//Represent Database schema to Sequelize
const MemberView = db.define('member_view',{
    member_id:{
        type:Sequelize.INTEGER,
        primaryKey:true
    },
    member_name:{
        type:Sequelize.STRING
    },
    member_email:{
        type:Sequelize.STRING
    },
    total_time:{
        type:Sequelize.TIME
    },
    days_worked:{
        type:Sequelize.INTEGER
    },
    avg_time:{
        type:Sequelize.TIME
    }
},{
    freezeTableName:true,
    id:false,
    createdAt:false,
    updatedAt:false
})

module.exports = MemberView