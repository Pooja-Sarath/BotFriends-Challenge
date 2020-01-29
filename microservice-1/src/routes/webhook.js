const express = require('express');
const router = new express.Router();
const axios = require('axios');
const jwt = require('jsonwebtoken');

var Webhook = require('../models/webhook');

router.post('/webhook/details', async(req,res) =>{

    if(req.body != undefined){
        var webhookURL = req.body.webhookURL;
        var webhookSecret = req.body.webhookSecret;
        var webhook = new Webhook({
            webhookURL,
            webhookSecret
        });

        webhook.save().then(()=>{
            res.status(200).send({success:1, msg: "Webhook Saved"})
        }).catch((err)=>{
            res.status(400).send(err);
        })

    }
});


router.post('/chat/message', async(req,res) =>{

    try{
        const webhook = await Webhook.find({}).sort({'createdAt' : -1}).limit(1);
        //const webhook = {webhookURL : 'http://localhost:8888/message', webhookSecret : '26823ru2hir2r'}
        if(webhook != undefined){    
            const URL = webhook[0].webhookURL+'/message';
            console.log(URL);
            const secret = jwt.sign({id : webhook[0].webhookSecret}, 'thisismynewcourse');
            var data = {'resMessage' : 'Hello {{firstName}} {{lastName}}. Thanks for applying at BotFriends.'}
            var options = {
                method : 'POST',
                url : URL,
                headers : {
                    'x-api-key' : secret
                },
                data
            };

            axios(options, data).then((resp)=>{
                if(resp.status === 200){
                    console.log(resp.data);
                    res.status(200).json({'success' : 1, msg  :resp.data.msg})
                }else {
                    res.status(200).json({success : 0, msg : resp.data.msg})
                }
            }).catch((error)=>{
                res.status(400).json({'success' : 0, msg :'Error in receiving response'})
            })
        } else {
            res.status(200).json({'sucess' : 0, msg : 'Webhook URL and secret not configured'});
        }
    }catch(err){
         res.status(500).send(err);   
    }

});

module.exports = router;