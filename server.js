var express = require('express');
var http = require('http');
var url = require('url');
var WebSocket = require('ws');
var router = require('./router');
var logger = require('morgan');
var app = express();
var server = http.createServer(app);
var wss = new WebSocket.Server({ server });

app.set('view engine', 'ejs');
app.set('views', './views');

wss.on('connection', function connection(ws) {
  var location = url.parse(ws.upgradeReq.url, true);
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    if (location['path'] === '/') {
        var status = router.sockets_route.sockets_index(message, wss);
    }
  });
});

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(logger('dev'));
app.use("/", router);
app.use('/', express.static(__dirname + '/public'));


server.listen(8080, function listening() {
  console.log('Listening on %d', server.address().port);
});
