var mysql = require('mysql');
var pool = mysql.createPool({
	host           : "localhost",
	user           : "root",
	password       : "123123",
	database       : "nodejs",
	connectionLimit: 10
});

function query(query, parameters, callback) {
	pool.getConnection(function(err, connection) {
		if (err) {
			console.log(err);
			if (typeof(callback) === "function") callback(err);
		} else {
			connection.config.queryFormat = function (query, values) {
				if (!values) return query;
					return query.replace(/\:(\w+)/g, function (txt, key) {
						if (values.hasOwnProperty(key)) {
							return this.escape(values[key]);
						}
					return txt;
				}.bind(this));
			};
			connection.query(query, parameters, function(err, rows) {
				connection.release();
				if (err) {
					if (typeof(callback) === "function") callback(err);
				} else {
					if (typeof(callback) === "function") callback(null, rows);
				}
			});
		}
	});
};


var messages = function() {

	this.addmessage = function(message_string, callback) {
		message = JSON.parse(message_string);
		return query("INSERT INTO messages (user,text) VALUES (:user, :text)",
				{user: message.user, text: message.text}, function(err) {
			if(!err) {
				callback('ok');
			} else {
				callback(err);
			}
		});
	}
};


module.exports = {
	messages: new messages()
};
