//Get Dependencies
const express = require('express');
const router = express.Router();
const passport = require ('.././config/passport');
// include Middlewares
const adminMiddleware= require("../middleware/admin.middleware");

//Include Controllers
const adminController= require("../controllers/admin.controller");
const controllerEmail = require("../controllers/controller.email");


router.post('/signup',adminController.addAdmin);
router.post('/engineeridcheck',adminController.engineeridcheck);
router.post('/engContain',adminController.engContain);

router.get('/list',adminController.viewAdmin);
router.post('/peclogin',adminController.peclogin);
router.post('/engineerInformation',adminController.engineerid);
router.get('/engLimit',adminController.engLimit);
router.post('/email',controllerEmail.EMAIL);
router.post('/emailSecound',controllerEmail.emailSecound);


router.get('/test', function (req, res) {
    res.status(200).json({
        status: true,
        message: 'Working!'
    });
});


module.exports= router;
