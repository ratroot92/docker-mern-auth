//Get Dependencies
const express = require('express');
const router = express.Router();
const passport = require ('../config/passport');
// include Middlewares
const adminMiddleware= require("../middleware/admin.middleware");

//Include Controllers
const messageController = require("../controllers/controller.message");


router.get('/getMessage',messageController.getMessage);
router.post('/addmsg',messageController.addmsg);
router.post('/addtimer',messageController.addtimer);
router.get('/addpecNumber',messageController.addpecNumber);




router.get('/test', function (req, res) {
    res.status(200).json({
        status: true,
        message: 'Working!'
    });
});


module.exports= router;
