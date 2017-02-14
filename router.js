var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var controllers = require('./controllers');
var messages = new controllers.messages();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


router.get('/', messages.index);
router.sockets_route = {
    sockets_index : function(message, wss) {
        return messages.sockets_index(message, wss);
    }
};


module.exports = router;
