const mongoose  = require("mongoose");

var mongoURL = "mongodb+srv://shashankchauhan:raja9528@cluster0.nkaqgrt.mongodb.net/assignment?retryWrites=true&w=majority" ;


mongoose.connect(mongoURL, {useNewUrlParser: true,useUnifiedTopology:true, useNewUrlParser:true})

var db = mongoose.connection ;

db.on('connected' , ()=> {
    console.log("MongoDB connected successfully");
})

db.on('error' , ()=> {
    console.log("MongoDB connection failed");
})

module.exports = mongoose