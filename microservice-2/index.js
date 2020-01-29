const express = require('express');
var app = express();
const jwt = require('jsonwebtoken');

var chatRouter = require('./src/routes/chat');

const PORT = 8888||process.env.PORT;

app.use(express.json());
app.use(chatRouter);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.listen(PORT, ()=>{
    // to go in microservice 1
    //console.log(jwt.sign({id : '26823ru2hir2r'},'thisismynewcourse'));
    console.log("Service running on PORT ", PORT);

})