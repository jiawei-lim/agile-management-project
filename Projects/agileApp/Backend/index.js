const express = require("express"); //Express is back end framework
const bodyParser = require("body-parser"); //for parsing JSON
const app = express(); // Instantiate Express
const cors = require("cors"); //For browsers, so doesnt show error

const taskRoute = require('./Route/Task') //Router that defines API calls
const sprintRoute = require('./Route/Sprint')
const MemberRoute = require('./Route/Member')
const activityRoute = require('./Route/Activity')
const MemberViewRoute = require('./Route/MemberView')
const db = require('./db') //Calling the DB object 

//Telling the app to use the libraries
app.use(cors());
app.use(bodyParser.json())
app.use('/tasks',taskRoute)
app.use('/sprints',sprintRoute)
app.use('/members',MemberRoute)
app.use('/activity',activityRoute)
app.use('/member_view',MemberViewRoute)

//Starts the server
app.listen(3005,()=>{
    console.log("server running on port 3005")
})

//Test to see if DB is connected succesfully
db.authenticate()
    .then(()=>console.log("DB connected..."))
    .catch((err)=>console.log("Error!: "+err))