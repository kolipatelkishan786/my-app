let express = require('express');
let app = express();
let bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('./book.model');

let db = 'mongodb://localhost:27017/example_db';

mongoose.connect(db);
let port = 8080;
let book = mongoose.model('mydb');
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    // res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

//get

// app.get('/', (req, res) => {
//     console.log('Wel come To Api');
// });

app.get('/post', async (req, res) => {
    try {
        let books = await book.find({});
        res.send(books);
    } catch (e) {
        res.states(500);
    }
});
//post
app.post('/post', async (req, res) => {
    try {
        let books = new book();
        books.name = req.body.name;
        books.email = req.body.email;
        books.mobile_number = req.body.mobile_number;
        books.address = req.body.address;
        books.password = req.body.password;
        await books.save();
        res.send(books);
    } catch (e) {
        res.states(500);
    }
});
//get byId
app.get('/post/:postId', async (req, res) => {
    try {
        let post = await book.findOne({_id: req.params.postId});
        res.send(post);
    } catch (e) {
        res.states(500);
    }
});

//update
app.put('/post/:postId', async (req, res) => {
    try {
        let post = await book.findByIdAndUpdate({
            _id: req.params.postId
        }, req.body, {
            new: true,
            runValidator: true
        });
        res.send(post);
    } catch (e) {
        res.states(500);
    }
});


//delete
app.delete('/post/:postId', async (req, res) => {
    try {
        let post = await book.findByIdAndRemove({
            _id: req.params.postId
        });
        res.send(post);
    } catch (e) {
        res.states(500);
    }
});

app.post('/post/:postId',async (req, res) => {
    try {
        let books = new book();
        books.email = req.body.email;
        books.password = req.body.password;
        await books.save();
        res.send(books);
    } catch (e) {
        res.status(500);
    }
});


app.listen(port, function () {
    console.log('app listening on port:' + port);
});
module.exports = app;
