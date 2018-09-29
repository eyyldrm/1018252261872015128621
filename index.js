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
    request.get(pubgurl + pceu + '/players?filter[playerNames]=' + pubgParse.pubgName,{
      headers : {
        'Authorization': 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJjNDkxOTJjMC02ZTc2LTAxMzYtNmIyYy01NWU4Y2Y2YWI4YmIiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNTMyMTEwNTEyLCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6ImxhcmZzdGF0cyJ9.1GteXaLtMUuOOa3SUrr4OaQIdk2sNoe_TA_Qm_mPBZU',
        'Accept': 'application/vnd.api+json'

      }}, function(error,response,body){
        var enres = JSON.parse(body);
        if(enres.errors){
          console.log("There isn't username in Playerunkown's Battlegrounds");
        }else{
          var pubgId = enres.data[0].id;
          var userIdparse = pubgParse.userId;
          io.emit('pubgAccountId', {pubgAccountId: pubgId, userId:  userIdparse});
        }
      });
    
  });
  socket.on('getPubgSeasons', function(data){
    request.get("https://api.pubg.com/shards/pc-eu/seasons",{
      headers : {
        'Authorization': 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJjNDkxOTJjMC02ZTc2LTAxMzYtNmIyYy01NWU4Y2Y2YWI4YmIiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNTMyMTEwNTEyLCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6ImxhcmZzdGF0cyJ9.1GteXaLtMUuOOa3SUrr4OaQIdk2sNoe_TA_Qm_mPBZU',
        'Accept': 'application/vnd.api+json'

      }}, function(error,response,body){
        var enres = JSON.parse(body);
        if(enres.errors){
          console.log("There isn't username in Playerunkown's Battlegrounds");
        }else{
          var SeasonsCount = enres.data.length;
          io.emit('gotPubgServerEu', {server: "pc-eu", seasonsCounts:  SeasonsCount, Seasons: enres.data});
        }
      });
    
  });
  socket.on('pubgStats', function(data){
    var pubgStr = JSON.stringify(data);
    var pubgParse = JSON.parse(pubgStr);
    var pubgId = pubgParse.pubgAccountId;
    var userIdparse = pubgParse.userId;
    var pubgurl = 'https://api.pubg.com/shards/';
    var pceu = "pc-eu";
    request.get(pubgurl + pceu + '/players/' + pubgId + '/seasons/division.bro.official.2018-09', {
      headers : {
        'Authorization': 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJjNDkxOTJjMC02ZTc2LTAxMzYtNmIyYy01NWU4Y2Y2YWI4YmIiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNTMyMTEwNTEyLCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6ImxhcmZzdGF0cyJ9.1GteXaLtMUuOOa3SUrr4OaQIdk2sNoe_TA_Qm_mPBZU',
        'Accept': 'application/vnd.api+json'

      }}, function(error,response,body){
        var senres = JSON.parse(body);

        if(senres.errors){
          console.log("There isn't username in Playerunkown's Battlegrounds");
        }else{
          io.emit('sendPubgStats', { 
            pubgAccountId: pubgId,
            userId:  userIdparse,
            soloTppasists: senres.data.attributes.gameModeStats.solo.assists,
            soloTppboosts: senres.data.attributes.gameModeStats.solo.boosts,
            soloTppdbnos: senres.data.attributes.gameModeStats.solo.dBNOs,
            soloTppdailykils: senres.data.attributes.gameModeStats.solo.dailyKills,
            soloTppdamagedealts: senres.data.attributes.gameModeStats.solo.damageDealt,
            soloTppdays: senres.data.attributes.gameModeStats.solo.days,
            soloTppheadshotkill: senres.data.attributes.gameModeStats.solo.headshotKills,
            soloTppheals: senres.data.attributes.gameModeStats.solo.heals,
            soloTppkillpoint: senres.data.attributes.gameModeStats.solo.killPoints,
            soloTppkills: senres.data.attributes.gameModeStats.solo.kills,
            soloTpplongestkill: senres.data.attributes.gameModeStats.solo.longestKill,
            soloTpplongesttimesurvived: senres.data.attributes.gameModeStats.solo.longestTimeSurvived,
            soloTpplosses: senres.data.attributes.gameModeStats.solo.losses,
            soloTppmaxkillstreak: senres.data.attributes.gameModeStats.solo.maxKillStreaks,
            soloTppmostsurvivaltime: senres.data.attributes.gameModeStats.solo.mostSurvivalTime,
            soloTpprevives: senres.data.attributes.gameModeStats.solo.revives,
            soloTppridedistance: senres.data.attributes.gameModeStats.solo.rideDistance,
            soloTpproadkills: senres.data.attributes.gameModeStats.solo.roadKills,
            soloTpproundmostkills: senres.data.attributes.gameModeStats.solo.roundMostKills,
            soloTpproundsplayed: senres.data.attributes.gameModeStats.solo.roundsPlayed,
            soloTppsuicides: senres.data.attributes.gameModeStats.solo.suicides,
            soloTppteamkills: senres.data.attributes.gameModeStats.solo.teamKills,
            soloTpptimesurvived: senres.data.attributes.gameModeStats.solo.timeSurvived,
            soloTpptoptens: senres.data.attributes.gameModeStats.solo.top10s,
            soloTppvehicledestroys: senres.data.attributes.gameModeStats.solo.vehicleDestroys,
            soloTppwalkdistance: senres.data.attributes.gameModeStats.solo.walkDistance,
            soloTppweaponacquired: senres.data.attributes.gameModeStats.solo.weaponsAcquired,
            soloTppweaklykills: senres.data.attributes.gameModeStats.solo.weeklyKills,
            soloTppwinpoints: senres.data.attributes.gameModeStats.solo.winPoints,
            soloTppwins: senres.data.attributes.gameModeStats.solo.wins,
            
            soloFppasists: senres.data.attributes.gameModeStats['solo-fpp'].assists,
            soloFppboosts: senres.data.attributes.gameModeStats['solo-fpp'].boosts,
            soloFppdbnos: senres.data.attributes.gameModeStats['solo-fpp'].dBNOs,
            soloFppdailykils: senres.data.attributes.gameModeStats['solo-fpp'].dailyKills,
            soloFppdamagedealts: senres.data.attributes.gameModeStats['solo-fpp'].damageDealt,
            soloFppdays: senres.data.attributes.gameModeStats['solo-fpp'].days,
            soloFppheadshotkill: senres.data.attributes.gameModeStats['solo-fpp'].headshotKills,
            soloFppheals: senres.data.attributes.gameModeStats['solo-fpp'].heals,
            soloFppkillpoint: senres.data.attributes.gameModeStats['solo-fpp'].killPoints,
            soloFppkills: senres.data.attributes.gameModeStats['solo-fpp'].kills,
            soloFpplongestkill: senres.data.attributes.gameModeStats['solo-fpp'].longestKill,
            soloFpplongesttimesurvived: senres.data.attributes.gameModeStats['solo-fpp'].longestTimeSurvived,
            soloFpplosses: senres.data.attributes.gameModeStats['solo-fpp'].losses,
            soloFppmaxkillstreak: senres.data.attributes.gameModeStats['solo-fpp'].maxKillStreaks,
            soloFppmostsurvivaltime: senres.data.attributes.gameModeStats['solo-fpp'].mostSurvivalTime,
            soloFpprevives: senres.data.attributes.gameModeStats['solo-fpp'].revives,
            soloFppridedistance: senres.data.attributes.gameModeStats['solo-fpp'].rideDistance,
            soloFpproadkills: senres.data.attributes.gameModeStats['solo-fpp'].roadKills,
            soloFpproundmostkills: senres.data.attributes.gameModeStats['solo-fpp'].roundMostKills,
            soloFpproundsplayed: senres.data.attributes.gameModeStats['solo-fpp'].roundsPlayed,
            soloFppsuicides: senres.data.attributes.gameModeStats['solo-fpp'].suicides,
            soloFppteamkills: senres.data.attributes.gameModeStats['solo-fpp'].teamKills,
            soloFpptimesurvived: senres.data.attributes.gameModeStats['solo-fpp'].timeSurvived,
            soloFpptoptens: senres.data.attributes.gameModeStats['solo-fpp'].top10s,
            soloFppvehicledestroys: senres.data.attributes.gameModeStats['solo-fpp'].vehicleDestroys,
            soloFppwalkdistance: senres.data.attributes.gameModeStats['solo-fpp'].walkDistance,
            soloFppweaponacquired: senres.data.attributes.gameModeStats['solo-fpp'].weaponsAcquired,
            soloFppweaklykills: senres.data.attributes.gameModeStats['solo-fpp'].weeklyKills,
            soloFppwinpoints: senres.data.attributes.gameModeStats['solo-fpp'].winPoints,
            soloFppwins: senres.data.attributes.gameModeStats['solo-fpp'].wins,

            duoTppasists: senres.data.attributes.gameModeStats.duo.assists,
            duoTppboosts: senres.data.attributes.gameModeStats.duo.boosts,
            duoTppdbnos: senres.data.attributes.gameModeStats.duo.dBNOs,
            duoTppdailykils: senres.data.attributes.gameModeStats.duo.dailyKills,
            duoTppdamagedealts: senres.data.attributes.gameModeStats.duo.damageDealt,
            duoTppdays: senres.data.attributes.gameModeStats.duo.days,
            duoTppheadshotkill: senres.data.attributes.gameModeStats.duo.headshotKills,
            duoTppheals: senres.data.attributes.gameModeStats.duo.heals,
            duoTppkillpoint: senres.data.attributes.gameModeStats.duo.killPoints,
            duoTppkills: senres.data.attributes.gameModeStats.duo.kills,
            duoTpplongestkill: senres.data.attributes.gameModeStats.duo.longestKill,
            duoTpplongesttimesurvived: senres.data.attributes.gameModeStats.duo.longestTimeSurvived,
            duoTpplosses: senres.data.attributes.gameModeStats.duo.losses,
            duoTppmaxkillstreak: senres.data.attributes.gameModeStats.duo.maxKillStreaks,
            duoTppmostsurvivaltime: senres.data.attributes.gameModeStats.duo.mostSurvivalTime,
            duoTpprevives: senres.data.attributes.gameModeStats.duo.revives,
            duoTppridedistance: senres.data.attributes.gameModeStats.duo.rideDistance,
            duoTpproadkills: senres.data.attributes.gameModeStats.duo.roadKills,
            duoTpproundmostkills: senres.data.attributes.gameModeStats.duo.roundMostKills,
            duoTpproundsplayed: senres.data.attributes.gameModeStats.duo.roundsPlayed,
            duoTppsuicides: senres.data.attributes.gameModeStats.duo.suicides,
            duoTppteamkills: senres.data.attributes.gameModeStats.duo.teamKills,
            duoTpptimesurvived: senres.data.attributes.gameModeStats.duo.timeSurvived,
            duoTpptoptens: senres.data.attributes.gameModeStats.duo.top10s,
            duoTppvehicledestroys: senres.data.attributes.gameModeStats.duo.vehicleDestroys,
            duoTppwalkdistance: senres.data.attributes.gameModeStats.duo.walkDistance,
            duoTppweaponacquired: senres.data.attributes.gameModeStats.duo.weaponsAcquired,
            duoTppweaklykills: senres.data.attributes.gameModeStats.duo.weeklyKills,
            duoTppwinpoints: senres.data.attributes.gameModeStats.duo.winPoints,
            duoTppwins: senres.data.attributes.gameModeStats.duo.wins,

            duoFppasists: senres.data.attributes.gameModeStats['duo-fpp'].assists,
            duoFppboosts: senres.data.attributes.gameModeStats['duo-fpp'].boosts,
            duoFppdbnos: senres.data.attributes.gameModeStats['duo-fpp'].dBNOs,
            duoFppdailykils: senres.data.attributes.gameModeStats['duo-fpp'].dailyKills,
            duoFppdamagedealts: senres.data.attributes.gameModeStats['duo-fpp'].damageDealt,
            duoFppdays: senres.data.attributes.gameModeStats['duo-fpp'].days,
            duoFppheadshotkill: senres.data.attributes.gameModeStats['duo-fpp'].headshotKills,
            duoFppheals: senres.data.attributes.gameModeStats['duo-fpp'].heals,
            duoFppkillpoint: senres.data.attributes.gameModeStats['duo-fpp'].killPoints,
            duoFppkills: senres.data.attributes.gameModeStats['duo-fpp'].kills,
            duoFpplongestkill: senres.data.attributes.gameModeStats['duo-fpp'].longestKill,
            duoFpplongesttimesurvived: senres.data.attributes.gameModeStats['duo-fpp'].longestTimeSurvived,
            duoFpplosses: senres.data.attributes.gameModeStats['duo-fpp'].losses,
            duoFppmaxkillstreak: senres.data.attributes.gameModeStats['duo-fpp'].maxKillStreaks,
            duoFppmostsurvivaltime: senres.data.attributes.gameModeStats['duo-fpp'].mostSurvivalTime,
            duoFpprevives: senres.data.attributes.gameModeStats['duo-fpp'].revives,
            duoFppridedistance: senres.data.attributes.gameModeStats['duo-fpp'].rideDistance,
            duoFpproadkills: senres.data.attributes.gameModeStats['duo-fpp'].roadKills,
            duoFpproundmostkills: senres.data.attributes.gameModeStats['duo-fpp'].roundMostKills,
            duoFpproundsplayed: senres.data.attributes.gameModeStats['duo-fpp'].roundsPlayed,
            duoFppsuicides: senres.data.attributes.gameModeStats['duo-fpp'].suicides,
            duoFppteamkills: senres.data.attributes.gameModeStats['duo-fpp'].teamKills,
            duoFpptimesurvived: senres.data.attributes.gameModeStats['duo-fpp'].timeSurvived,
            duoFpptoptens: senres.data.attributes.gameModeStats['duo-fpp'].top10s,
            duoFppvehicledestroys: senres.data.attributes.gameModeStats['duo-fpp'].vehicleDestroys,
            duoFppwalkdistance: senres.data.attributes.gameModeStats['duo-fpp'].walkDistance,
            duoFppweaponacquired: senres.data.attributes.gameModeStats['duo-fpp'].weaponsAcquired,
            duoFppweaklykills: senres.data.attributes.gameModeStats['duo-fpp'].weeklyKills,
            duoFppwinpoints: senres.data.attributes.gameModeStats['duo-fpp'].winPoints,
            duoFppwins: senres.data.attributes.gameModeStats['duo-fpp'].wins,

            squadTppasists: senres.data.attributes.gameModeStats.squad.assists,
            squadTppboosts: senres.data.attributes.gameModeStats.squad.boosts,
            squadTppdbnos: senres.data.attributes.gameModeStats.squad.dBNOs,
            squadTppdailykils: senres.data.attributes.gameModeStats.squad.dailyKills,
            squadTppdamagedealts: senres.data.attributes.gameModeStats.squad.damageDealt,
            squadTppdays: senres.data.attributes.gameModeStats.squad.days,
            squadTppheadshotkill: senres.data.attributes.gameModeStats.squad.headshotKills,
            squadTppheals: senres.data.attributes.gameModeStats.squad.heals,
            squadTppkillpoint: senres.data.attributes.gameModeStats.squad.killPoints,
            squadTppkills: senres.data.attributes.gameModeStats.squad.kills,
            squadTpplongestkill: senres.data.attributes.gameModeStats.squad.longestKill,
            squadTpplongesttimesurvived: senres.data.attributes.gameModeStats.squad.longestTimeSurvived,
            squadTpplosses: senres.data.attributes.gameModeStats.squad.losses,
            squadTppmaxkillstreak: senres.data.attributes.gameModeStats.squad.maxKillStreaks,
            squadTppmostsurvivaltime: senres.data.attributes.gameModeStats.squad.mostSurvivalTime,
            squadTpprevives: senres.data.attributes.gameModeStats.squad.revives,
            squadTppridedistance: senres.data.attributes.gameModeStats.squad.rideDistance,
            squadTpproadkills: senres.data.attributes.gameModeStats.squad.roadKills,
            squadTpproundmostkills: senres.data.attributes.gameModeStats.squad.roundMostKills,
            squadTpproundsplayed: senres.data.attributes.gameModeStats.squad.roundsPlayed,
            squadTppsuicides: senres.data.attributes.gameModeStats.squad.suicides,
            squadTppteamkills: senres.data.attributes.gameModeStats.squad.teamKills,
            squadTpptimesurvived: senres.data.attributes.gameModeStats.squad.timeSurvived,
            squadTpptoptens: senres.data.attributes.gameModeStats.squad.top10s,
            squadTppvehicledestroys: senres.data.attributes.gameModeStats.squad.vehicleDestroys,
            squadTppwalkdistance: senres.data.attributes.gameModeStats.squad.walkDistance,
            squadTppweaponacquired: senres.data.attributes.gameModeStats.squad.weaponsAcquired,
            squadTppweaklykills: senres.data.attributes.gameModeStats.squad.weeklyKills,
            squadTppwinpoints: senres.data.attributes.gameModeStats.squad.winPoints,
            squadTppwins: senres.data.attributes.gameModeStats.squad.wins,

            squadFppasists: senres.data.attributes.gameModeStats['squad-fpp'].assists,
            squadFppboosts: senres.data.attributes.gameModeStats['squad-fpp'].boosts,
            squadFppdbnos: senres.data.attributes.gameModeStats['squad-fpp'].dBNOs,
            squadFppdailykils: senres.data.attributes.gameModeStats['squad-fpp'].dailyKills,
            squadFppdamagedealts: senres.data.attributes.gameModeStats['squad-fpp'].damageDealt,
            squadFppdays: senres.data.attributes.gameModeStats['squad-fpp'].days,
            squadFppheadshotkill: senres.data.attributes.gameModeStats['squad-fpp'].headshotKills,
            squadFppheals: senres.data.attributes.gameModeStats['squad-fpp'].heals,
            squadFppkillpoint: senres.data.attributes.gameModeStats['squad-fpp'].killPoints,
            squadFppkills: senres.data.attributes.gameModeStats['squad-fpp'].kills,
            squadFpplongestkill: senres.data.attributes.gameModeStats['squad-fpp'].longestKill,
            squadFpplongesttimesurvived: senres.data.attributes.gameModeStats['squad-fpp'].longestTimeSurvived,
            squadFpplosses: senres.data.attributes.gameModeStats['squad-fpp'].losses,
            squadFppmaxkillstreak: senres.data.attributes.gameModeStats['squad-fpp'].maxKillStreaks,
            squadFppmostsurvivaltime: senres.data.attributes.gameModeStats['squad-fpp'].mostSurvivalTime,
            squadFpprevives: senres.data.attributes.gameModeStats['squad-fpp'].revives,
            squadFppridedistance: senres.data.attributes.gameModeStats['squad-fpp'].rideDistance,
            squadFpproadkills: senres.data.attributes.gameModeStats['squad-fpp'].roadKills,
            squadFpproundmostkills: senres.data.attributes.gameModeStats['squad-fpp'].roundMostKills,
            squadFpproundsplayed: senres.data.attributes.gameModeStats['squad-fpp'].roundsPlayed,
            squadFppsuicides: senres.data.attributes.gameModeStats['squad-fpp'].suicides,
            squadFppteamkills: senres.data.attributes.gameModeStats['squad-fpp'].teamKills,
            squadFpptimesurvived: senres.data.attributes.gameModeStats['squad-fpp'].timeSurvived,
            squadFpptoptens: senres.data.attributes.gameModeStats['squad-fpp'].top10s,
            squadFppvehicledestroys: senres.data.attributes.gameModeStats['squad-fpp'].vehicleDestroys,
            squadFppwalkdistance: senres.data.attributes.gameModeStats['squad-fpp'].walkDistance,
            squadFppweaponacquired: senres.data.attributes.gameModeStats['squad-fpp'].weaponsAcquired,
            squadFppweaklykills: senres.data.attributes.gameModeStats['squad-fpp'].weeklyKills,
            squadFppwinpoints: senres.data.attributes.gameModeStats['squad-fpp'].winPoints,
            squadFppwins: senres.data.attributes.gameModeStats['squad-fpp'].wins

          });
        }
      });
  });
    socket.on('generalChatMessage', function(data){
    var chatstr = JSON.stringify(data);
    var chatParse = JSON.parse(chatstr);
    var chatMassage  = chatParse.chatMassage;
    var username = chatParse.userName;
    console.log(chatParse);
    
    io.emit('chatMessageC', {chatMassages: chatMassage, userName: username});
    });
});

http.listen(port, function(){
  console.log('listening on *:3000');
});