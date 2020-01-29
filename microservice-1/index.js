const db = require('./db');
const express = require('express');
const app = express();
const morgan = require('morgan');

const webhookRouter = require('./src/routes/webhook');

const PORT = 8080||process.env.PORT;

app.use(express.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(morgan('dev'));
app.use(webhookRouter);

  
app.listen(PORT,()=>{
    db.dbConnection;
    console.log("Service running on PORT ", PORT)
})