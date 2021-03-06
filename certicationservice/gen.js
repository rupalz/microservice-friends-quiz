var express = require('express');
var mongoose = require('mongoose');
const { userInfo } = require('os');
var path = require('path');
var bodyParser = require("body-parser");


var indexRouter = require('./routes/index');


mongoose.connect("mongodb+srv://rupal:teddy@cluster0.oyd5u.mongodb.net/quiz?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open',() =>
{
    console.log("MongoDb  established successfully");
});

var Schema = new mongoose.Schema({
    name: String,
    });
     
var user = mongoose.model('emp', Schema);

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set('views', path.join(__dirname, 'views'));
 app.set('view engine', 'ejs');

 app.get("/sh",(req,res)=>{
    res.send("Generating the cert");
})
 app.get("/", function(req, res){
    user.findOne({},{},{sort : {_id: -1}},function(err, foundItems){
    console.log(foundItems);
    res.render("gen", { name: foundItems.name});
    })
  
})






app.listen(9001,function(){
    console.log("Server connected....")
})
module.exports = app;