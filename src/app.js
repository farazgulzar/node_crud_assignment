var express = require('express');
var app = express();

const bodyParser = require('body-parser');
const User = require("./model/User");


const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/assignment', { useNewUrlParser: true });

app.use(bodyParser.json({ limit: 1000000 }));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/user', function (req, res) {
    console.log("Got a GET request for USERS the homepage");

    User.find()
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.send("error " + err);
        })

})

app.get('/user/:id', function (req, res) {
    console.log("Got a GET request for the homepage");
    console.log(req.params.id);

    User.find({ _id: req.params.id }).then((data) => {
        console.log(data);
        res.json(data);
    })
        .catch((err) => {
            res.send("error " + err);
        })

    //    res.json({first_name : "Que1", last_name: "Bee", age: 12});
})

// This responds a POST request for the homepage
app.post('/user', function (req, res) {
    console.log("Got a POST request for the homepage");
    var toUpdate = {};



    if (req.body._id == null || req.body._id == 'undefined') {

        let abc = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
        });

        User.create(abc)
            .then((data) => {
                res.json(data);
            })
            .catch((err) => {
                res.send("error " + err);
            })
    } else if (req.body._id != null) {
     
        User.update(
             {
                _id : req.body._id
                },
    
    // update 
         {
             "first_name": req.body.first_name,   
             "last_name": req.body.last_name
        },
    
    // options 
    {
        "multi" : false,  // update only one document 
        "upsert" : false  // insert a new document, if no existing document match the query 
    }
        )
            .then((data) => {
                res.json(data);
            })
            .catch((err) => {
                res.send("error " + err);
            })
    }


})

// This responds a DELETE request for the /del_user page.
app.delete('/del_user', function (req, res) {
    console.log("Got a DELETE request for /del_user");
    res.send('Hello DELETE');
})

// This responds a GET request for the /list_user page.
app.get('/list_user', function (req, res) {
    console.log("Got a GET request for /list_user");
    res.send('Page Listing');
})

// This responds a GET request for abcd, abxcd, ab123cd, and so on
app.get('/ab*cd', function (req, res) {
    console.log("Got a GET request for /ab*cd");
    res.send('Page Pattern Match');
})

app.listen(3000, function () {
    console.log('Listening on port 3000!');
});
