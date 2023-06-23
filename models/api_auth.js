const mongoose = require("mongoose");


const google = new mongoose.Schema({
    username:String,
    googleId:String
},
{ timeseries: true, collection: "Api_auth" }

)
const User = mongoose.model("user",google)
module.exports = User;