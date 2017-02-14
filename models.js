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
					console.log(err);
					if (typeof(callback) === "function") callback(err);
				} else {
					if (typeof(callback) === "function") callback(null, rows);
				}
			});
		}
	});
};


var news = function() {
	this.getNews = function(id, callback) {
		query('SELECT * FROM news WHERE id = :id', {id: id}, function(err, rows) {
			if(!err) {
				if(rows[0]) {
					callback(null, rows[0]);
				} else {
					callback(null, null);
				}
			} else {
				callback(err);
			}
		});
	}

	this.getAllNews = function(callback) {
		query('SELECT * FROM news', null, function(err, rows) {
			if(!err) {
				if(rows[0]) {
					callback(null, rows);
				} else {
					callback(null, null);
				}
			} else {
				callback(err);
			}
		});
	}

	this.addNews = function(news, callback) {
		query("INSERT INTO news (subject,text) VALUES (:subject, :text)", {subject: news.subject, text: news.text}, function(err) {
			if(!err) {
				callback(null);
			} else {
				callback(err);
			}
		});
	}
};


module.exports = {
	news: new news()
};


