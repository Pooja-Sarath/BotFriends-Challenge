const express = require('express');
 var router = new express.Router();

 const auth = require('../auth/auth');

 router.post('/message', auth, (req,res)=>{

    if(req.valid){
        var msg = req.body.resMessage.toString();
        var regExp1 = new RegExp('\{\{firstName\}\}', 'gi');
        var regExp2 = new RegExp('\{\{lastName\}\}', 'gi');
        var responseMsg = msg.replace(regExp1, 'Pooja').replace(regExp2, 'Ambekar');
        res.status(200).json({success :1, msg : responseMsg});
    } else {
        res.status(200).json({success: 0, msg : 'Secret key is incorrect'})
    }
 });

 module.exports = router;
