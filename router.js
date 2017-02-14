var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var controllers = require('./controllers');

var pages = new controllers.pages();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


router.get('/', pages.index);


module.exports = router;

