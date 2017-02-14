var models = require('./models');
var controllers = new Object();

controllers.messages = function() {

	// Роут url

	this.index = function(req, res) {
		res.render('index', {title: "MyFirstVue"});
	};

	// Роут sockets

	this.sockets_index = function(message, wss){
		var message_data = models.messages;
		message_data.addmessage(message, function(status) {
			if (status === 'ok') {
				wss.clients.forEach(function (conn) {
	              conn.send(message);
	            });
			}
		});
	};

};

module.exports = controllers;
