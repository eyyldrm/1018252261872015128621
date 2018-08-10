var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');
var socketIO = require('socket.io')(app);
var port = process.env.PORT || 3000;
const io = socketIO(app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.get('/', function(req, res){
    res.end("selamlar");
});

io.on('connection', function (socket) {

  });

app.listen(port, () => console.log('Port 3000 aktif hale getirildi.')); 