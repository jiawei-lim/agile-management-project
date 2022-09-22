const Sprint = require("../Models/Sprint");

const getSprints = (req,res)=>{
    Sprint.findAll()
    .then(sprint=>{
        res.json(sprint)
    })
    .catch(err=>console.log(err))
}

module.exports = {
    getSprints
}