const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const serv2 ="http://localhost:9001/sh";
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
mongoose.connect("mongodb+srv://rupal:teddy@cluster0.oyd5u.mongodb.net/quiz?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDb  established successfully");
});

var Schema = new mongoose.Schema({
    name: String
});
var user = mongoose.model('emp', Schema);
var playerName;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.post('/q1', function (req, res) {
    playerName = req.body.playerName;
    new user({
        name: req.body.playerName,
    }).save(function (err, doc) {
        if (err) res.json(err);
        else res.render("q1", { answer: "Please Select the correct Answer" });
    });
});

app.post("/q2", function (req, res) {
    if (req.body.question1 === "Marcel") {
        res.render("q2", { answer: "Congratulations!! Right Answer" });
    } else {
        res.render("q2", { answer: "Ooops!! Wrong Answer" });
    }

})

app.post("/q3", function (req, res) {
    if (req.body.question2 === "Ursula") {
        res.render("q3", { answer: "Congratulations!! Right Answer" });
    } else {
        res.render("q3", { answer: "Ooops!! Wrong Answer" });

    }
})

app.post("/q4", function (req, res) {
    if (req.body.question3 === "Muriel") {
        res.render("q4", { answer: "Congratulations!! Right Answer" });
    } else {
        res.render("q4", { answer: "Ooops!! Wrong Answer" });

    }
})

app.post("/q5", function (req, res) {
    if (req.body.question4 === "Emily") {
        res.render("q5", { answer: "Congratulations!! Right Answer" });
    } else {
        res.render("q5", { answer: "Ooops!! Wrong Answer" });

    }

})

app.post("/get_cert", function (req, res) {
    respone(serv2);
})

app.post("/end", function (req, res) {
    if (req.body.question5 === "Days of our lives") {
        res.render("end", { answer: "Congratulations!! " + playerName + " Right Answer" });
    } else {
        res.render("end", { answer: "Ooops!! Wrong Answer" });
    }
})



app.post('/score', function (req, res) {
    user.findOne({}, {}, { sort: { _id: -1 } }, function (err, foundItems) {
        console.log(foundItems);
        res.render("score", { name: foundItems.name });
    })
    //  res.render('score');
})

app.get("/", (req, res) => {
    res.render("index");
})

app.listen(5000, () => {
    console.log("up and running --  names service")
})