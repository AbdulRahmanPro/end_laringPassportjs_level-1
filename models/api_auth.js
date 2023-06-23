const mongoose = require("mongoose");


const google = new mongoose.Schema({
    username:String,
    googleID:String
},
{ timeseries: true, collection: "Api_auth" }

)
const User = mongoose.model("user",google)
module.exports = User;