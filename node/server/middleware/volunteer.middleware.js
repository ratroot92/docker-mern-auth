// Valid credentials upon sign up
exports.LoginMiddleware = function(req, res, next) {
    console.log(req.body);
    let Volunteer = req.body;
    let Exp = /^[A-Za-z ]+$/;
    let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    
    if(!Volunteer.email || !Volunteer.email.match(pattern)){
        res.json({STATUS: false, MESSAGE: 'Invalid Email Address'});
        return;
    }
    
    return next();
};