const jwt = require('jsonwebtoken');

const auth = async(req,res,next) =>{
    try{
        const token = req.header('x-api-key');
        const decode = jwt.verify(token,'thisismynewcourse');
        console.log(decode.id);
        if(decode.id == '26823ru2hir2r'){
            req.valid = true;
            next();
        } else {
            res.status(400).json({success: 0, msg : 'Secret key is incorrect'});
        }
        
        
    }catch(e){
        res.status(401).send({error : "Please authenticate the URL"})
    }
}

module.exports = auth;