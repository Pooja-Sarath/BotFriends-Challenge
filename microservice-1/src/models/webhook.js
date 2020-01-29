const mongoose = require('mongoose');

const webhookSchema = new mongoose.Schema({
    webhookURL : {type : String, required : true, trim : true},
    webhookSecret : {type : String, required : true, trim : true}
}, {timestamps : true});

const Webhook = mongoose.model('webhook', webhookSchema);

module.exports = Webhook;