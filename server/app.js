const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json());


const posts = require('./routes/posts');
app.use('/', posts);






app.get('/', function(req, res) {
    res.send('hello world')
});







app.listen(3001, function() {
    console.log("Server was started on localhost:3001");
});