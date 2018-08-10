var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');
var io = require('socket.io');
var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.get('/', function(req, res){
    res.end("selamlar");
});



app.listen(port, () => console.log('Port 3000 aktif hale getirildi.')); 