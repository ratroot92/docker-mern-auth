// Valid credentials upon sign up
exports.Middleware = function(req, res, next) {
    console.log(req.body);
    let admin = req.body;
    let Exp = /^[A-Za-z ]+$/;
    let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    
    if(!admin.UserName || !admin.UserName.match(pattern)){
        res.json({STATUS: false, MESSAGE: 'Invalid Email Address'});
        return;
    }
    
    return next();
};