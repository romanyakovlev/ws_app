var models = require('./models');

var controllers = new Object();

controllers.pages = function() {

	this.index = function(req, res) {
		res.render('index', {title: "MyFirstVue"});
	}
	
}


/*this.getAllNews = function(req, res) {
		var news = models.news; 
		news.getAllNews(function(err, news) {
			if(!err) {
				res.render('news/all', {news: news, title: "Новости"});
			}
		});
	}; 

	this.addNews = function(req, res) {
		var subject = req.body.subject;
		var text = req.body.text; 

		var news = models.news; 

		news.addNews({subject: subject, text: text}, function(err) {
			res.end(JSON.stringify({status: "success"}));
		});
	}
*/

module.exports = controllers;