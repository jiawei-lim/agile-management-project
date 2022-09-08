//Use Sequelize ORM
const Sequelize = require('sequelize');

//Exporting object to share among files
module.exports = new Sequelize('2101db','root','',{
    host: 'localhost',
    dialect:'mysql',
    pool:{
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    }
});