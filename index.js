var express = require('express');
var app = express();
var path = require('path');
var request = require('request');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.listen(8000, () => console.log('Port 3000 aktif hale getirildi.')); 