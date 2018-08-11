var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var request = require('request');
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.end("selamlar");
});

io.on('connection', function(socket){
    console.log('a user connected');
  socket.on('pubgName', function(data){
    var pubgStr = JSON.stringify(data);
    var pubgParse = JSON.parse(pubgStr);
    var pubgurl = 'https://api.pubg.com/shards/';
    var pceu = "pc-eu";
    request.get(pubgurl + pceu + '/players?filter[playerNmaes]=' + pubgParse.pubgName,{
      headers : {
        'Authorization': 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJjNDkxOTJjMC02ZTc2LTAxMzYtNmIyYy01NWU4Y2Y2YWI4YmIiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNTMyMTEwNTEyLCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6ImxhcmZzdGF0cyJ9.1GteXaLtMUuOOa3SUrr4OaQIdk2sNoe_TA_Qm_mPBZU',
        'Accept': 'application/vnd.api+json'

      }}, function(error,response,body){
        var enres = JSON.parse(body);
        if(enres.errors){
          console.log("There isn't username in Playerunkown's Battlegrounds");
        }else{
          var pubgId = enres.data[0].id;
          console.log(pubgId);
        }
      });
    
  });
});

http.listen(port, function(){
  console.log('listening on *:3000');
});