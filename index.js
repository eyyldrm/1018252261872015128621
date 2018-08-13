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
  socket.on('pubgStats', function(data){
    var pubgStr = JSON.stringify(data);
    var pubgParse = JSON.parse(pubgStr);
    var pubgId = pubgParse.pubgAccountId;
    var userIdparse = pubgParse.userId;
    var pubgurl = 'https://api.pubg.com/shards/';
    var pceu = "pc-eu";
    request.get(pubgurl + pceu + '/player/' + pubgId + '/seasons/division.bro.official.2018-08', {
      headers : {
        'Authorization': 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJjNDkxOTJjMC02ZTc2LTAxMzYtNmIyYy01NWU4Y2Y2YWI4YmIiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNTMyMTEwNTEyLCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6ImxhcmZzdGF0cyJ9.1GteXaLtMUuOOa3SUrr4OaQIdk2sNoe_TA_Qm_mPBZU',
        'Accept': 'application/vnd.api+json'

      }}, function(error,response,body){
        var enres = JSON.parse(body);
        if(enres.errors){
          console.log("There isn't username in Playerunkown's Battlegrounds");
        }else{
          io.emit('sendPubgStats', {
            pubgAccountId: pubgId,
            userId:  userIdparse,
            soloTppasists: enres.data.attributes.gameModeStats.solo.assists,
            soloTppboosts: enres.data.attributes.gameModeStats.solo.boosts,
            soloTppdbnos: enres.data.attributes.gameModeStats.solo.dBNOs,
            soloTppdailykils: enres.data.attributes.gameModeStats.solo.dailyKills,
            soloTppdamagedealts: enres.data.attributes.gameModeStats.solo.damageDealt,
            soloTppdays: enres.data.attributes.gameModeStats.solo.days,
            soloTppheadshotkill: enres.data.attributes.gameModeStats.solo.headshotKills,
            soloTppheals: enres.data.attributes.gameModeStats.solo.heals,
            soloTppkillpoint: enres.data.attributes.gameModeStats.solo.killPoints,
            soloTppkills: enres.data.attributes.gameModeStats.solo.kills,
            soloTpplongestkill: enres.data.attributes.gameModeStats.solo.longestKill,
            soloTpplongesttimesurvived: enres.data.attributes.gameModeStats.solo.longestTimeSurvived,
            soloTpplosses: enres.data.attributes.gameModeStats.solo.losses,
            soloTppmaxkillstreak: enres.data.attributes.gameModeStats.solo.maxKillStreaks,
            soloTppmostsurvivaltime: enres.data.attributes.gameModeStats.solo.mostSurvivalTime,
            soloTpprevives: enres.data.attributes.gameModeStats.solo.revives,
            soloTppridedistance: enres.data.attributes.gameModeStats.solo.rideDistance,
            soloTpproadkills: enres.data.attributes.gameModeStats.solo.roadKills,
            soloTpproundmostkills: enres.data.attributes.gameModeStats.solo.roundMostKills,
            soloTpproundsplayed: enres.data.attributes.gameModeStats.solo.roundsPlayed,
            soloTppsuicides: enres.data.attributes.gameModeStats.solo.suicides,
            soloTppteamkills: enres.data.attributes.gameModeStats.solo.teamKills,
            soloTpptimesurvived: enres.data.attributes.gameModeStats.solo.timeSurvived,
            soloTpptoptens: enres.data.attributes.gameModeStats.solo.top10s,
            soloTppvehicledestroys: enres.data.attributes.gameModeStats.solo.vehicleDestroys,
            soloTppwalkdistance: enres.data.attributes.gameModeStats.solo.walkDistance,
            soloTppweaponacquired: enres.data.attributes.gameModeStats.solo.weaponsAcquired,
            soloTppweaklykills: enres.data.attributes.gameModeStats.solo.weeklyKills,
            soloTppwinpoints: enres.data.attributes.gameModeStats.solo.winPoints,
            soloTppwins: enres.data.attributes.gameModeStats.solo.wins,
            
            soloFppasists: enres.data.attributes.gameModeStats['solo-fpp'].assists,
            soloFppboosts: enres.data.attributes.gameModeStats['solo-fpp'].boosts,
            soloFppdbnos: enres.data.attributes.gameModeStats['solo-fpp'].dBNOs,
            soloFppdailykils: enres.data.attributes.gameModeStats['solo-fpp'].dailyKills,
            soloFppdamagedealts: enres.data.attributes.gameModeStats['solo-fpp'].damageDealt,
            soloFppdays: enres.data.attributes.gameModeStats['solo-fpp'].days,
            soloFppheadshotkill: enres.data.attributes.gameModeStats['solo-fpp'].headshotKills,
            soloFppheals: enres.data.attributes.gameModeStats['solo-fpp'].heals,
            soloFppkillpoint: enres.data.attributes.gameModeStats['solo-fpp'].killPoints,
            soloFppkills: enres.data.attributes.gameModeStats['solo-fpp'].kills,
            soloFpplongestkill: enres.data.attributes.gameModeStats['solo-fpp'].longestKill,
            soloFpplongesttimesurvived: enres.data.attributes.gameModeStats['solo-fpp'].longestTimeSurvived,
            soloFpplosses: enres.data.attributes.gameModeStats['solo-fpp'].losses,
            soloFppmaxkillstreak: enres.data.attributes.gameModeStats['solo-fpp'].maxKillStreaks,
            soloFppmostsurvivaltime: enres.data.attributes.gameModeStats['solo-fpp'].mostSurvivalTime,
            soloFpprevives: enres.data.attributes.gameModeStats['solo-fpp'].revives,
            soloFppridedistance: enres.data.attributes.gameModeStats['solo-fpp'].rideDistance,
            soloFpproadkills: enres.data.attributes.gameModeStats['solo-fpp'].roadKills,
            soloFpproundmostkills: enres.data.attributes.gameModeStats['solo-fpp'].roundMostKills,
            soloFpproundsplayed: enres.data.attributes.gameModeStats['solo-fpp'].roundsPlayed,
            soloFppsuicides: enres.data.attributes.gameModeStats['solo-fpp'].suicides,
            soloFppteamkills: enres.data.attributes.gameModeStats['solo-fpp'].teamKills,
            soloFpptimesurvived: enres.data.attributes.gameModeStats['solo-fpp'].timeSurvived,
            soloFpptoptens: enres.data.attributes.gameModeStats['solo-fpp'].top10s,
            soloFppvehicledestroys: enres.data.attributes.gameModeStats['solo-fpp'].vehicleDestroys,
            soloFppwalkdistance: enres.data.attributes.gameModeStats['solo-fpp'].walkDistance,
            soloFppweaponacquired: enres.data.attributes.gameModeStats['solo-fpp'].weaponsAcquired,
            soloFppweaklykills: enres.data.attributes.gameModeStats['solo-fpp'].weeklyKills,
            soloFppwinpoints: enres.data.attributes.gameModeStats['solo-fpp'].winPoints,
            soloFppwins: enres.data.attributes.gameModeStats['solo-fpp'].wins,

            duoTppasists: enres.data.attributes.gameModeStats.duo.assists,
            duoTppboosts: enres.data.attributes.gameModeStats.duo.boosts,
            duoTppdbnos: enres.data.attributes.gameModeStats.duo.dBNOs,
            duoTppdailykils: enres.data.attributes.gameModeStats.duo.dailyKills,
            duoTppdamagedealts: enres.data.attributes.gameModeStats.duo.damageDealt,
            duoTppdays: enres.data.attributes.gameModeStats.duo.days,
            duoTppheadshotkill: enres.data.attributes.gameModeStats.duo.headshotKills,
            duoTppheals: enres.data.attributes.gameModeStats.duo.heals,
            duoTppkillpoint: enres.data.attributes.gameModeStats.duo.killPoints,
            duoTppkills: enres.data.attributes.gameModeStats.duo.kills,
            duoTpplongestkill: enres.data.attributes.gameModeStats.duo.longestKill,
            duoTpplongesttimesurvived: enres.data.attributes.gameModeStats.duo.longestTimeSurvived,
            duoTpplosses: enres.data.attributes.gameModeStats.duo.losses,
            duoTppmaxkillstreak: enres.data.attributes.gameModeStats.duo.maxKillStreaks,
            duoTppmostsurvivaltime: enres.data.attributes.gameModeStats.duo.mostSurvivalTime,
            duoTpprevives: enres.data.attributes.gameModeStats.duo.revives,
            duoTppridedistance: enres.data.attributes.gameModeStats.duo.rideDistance,
            duoTpproadkills: enres.data.attributes.gameModeStats.duo.roadKills,
            duoTpproundmostkills: enres.data.attributes.gameModeStats.duo.roundMostKills,
            duoTpproundsplayed: enres.data.attributes.gameModeStats.duo.roundsPlayed,
            duoTppsuicides: enres.data.attributes.gameModeStats.duo.suicides,
            duoTppteamkills: enres.data.attributes.gameModeStats.duo.teamKills,
            duoTpptimesurvived: enres.data.attributes.gameModeStats.duo.timeSurvived,
            duoTpptoptens: enres.data.attributes.gameModeStats.duo.top10s,
            duoTppvehicledestroys: enres.data.attributes.gameModeStats.duo.vehicleDestroys,
            duoTppwalkdistance: enres.data.attributes.gameModeStats.duo.walkDistance,
            duoTppweaponacquired: enres.data.attributes.gameModeStats.duo.weaponsAcquired,
            duoTppweaklykills: enres.data.attributes.gameModeStats.duo.weeklyKills,
            duoTppwinpoints: enres.data.attributes.gameModeStats.duo.winPoints,
            duoTppwins: enres.data.attributes.gameModeStats.duo.wins,

            duoFppasists: enres.data.attributes.gameModeStats['duo-fpp'].assists,
            duoFppboosts: enres.data.attributes.gameModeStats['duo-fpp'].boosts,
            duoFppdbnos: enres.data.attributes.gameModeStats['duo-fpp'].dBNOs,
            duoFppdailykils: enres.data.attributes.gameModeStats['duo-fpp'].dailyKills,
            duoFppdamagedealts: enres.data.attributes.gameModeStats['duo-fpp'].damageDealt,
            duoFppdays: enres.data.attributes.gameModeStats['duo-fpp'].days,
            duoFppheadshotkill: enres.data.attributes.gameModeStats['duo-fpp'].headshotKills,
            duoFppheals: enres.data.attributes.gameModeStats['duo-fpp'].heals,
            duoFppkillpoint: enres.data.attributes.gameModeStats['duo-fpp'].killPoints,
            duoFppkills: enres.data.attributes.gameModeStats['duo-fpp'].kills,
            duoFpplongestkill: enres.data.attributes.gameModeStats['duo-fpp'].longestKill,
            duoFpplongesttimesurvived: enres.data.attributes.gameModeStats['duo-fpp'].longestTimeSurvived,
            duoFpplosses: enres.data.attributes.gameModeStats['duo-fpp'].losses,
            duoFppmaxkillstreak: enres.data.attributes.gameModeStats['duo-fpp'].maxKillStreaks,
            duoFppmostsurvivaltime: enres.data.attributes.gameModeStats['duo-fpp'].mostSurvivalTime,
            duoFpprevives: enres.data.attributes.gameModeStats['duo-fpp'].revives,
            duoFppridedistance: enres.data.attributes.gameModeStats['duo-fpp'].rideDistance,
            duoFpproadkills: enres.data.attributes.gameModeStats['duo-fpp'].roadKills,
            duoFpproundmostkills: enres.data.attributes.gameModeStats['duo-fpp'].roundMostKills,
            duoFpproundsplayed: enres.data.attributes.gameModeStats['duo-fpp'].roundsPlayed,
            duoFppsuicides: enres.data.attributes.gameModeStats['duo-fpp'].suicides,
            duoFppteamkills: enres.data.attributes.gameModeStats['duo-fpp'].teamKills,
            duoFpptimesurvived: enres.data.attributes.gameModeStats['duo-fpp'].timeSurvived,
            duoFpptoptens: enres.data.attributes.gameModeStats['duo-fpp'].top10s,
            duoFppvehicledestroys: enres.data.attributes.gameModeStats['duo-fpp'].vehicleDestroys,
            duoFppwalkdistance: enres.data.attributes.gameModeStats['duo-fpp'].walkDistance,
            duoFppweaponacquired: enres.data.attributes.gameModeStats['duo-fpp'].weaponsAcquired,
            duoFppweaklykills: enres.data.attributes.gameModeStats['duo-fpp'].weeklyKills,
            duoFppwinpoints: enres.data.attributes.gameModeStats['duo-fpp'].winPoints,
            duoFppwins: enres.data.attributes.gameModeStats['duo-fpp'].wins,

            squadTppasists: enres.data.attributes.gameModeStats.squad.assists,
            squadTppboosts: enres.data.attributes.gameModeStats.squad.boosts,
            squadTppdbnos: enres.data.attributes.gameModeStats.squad.dBNOs,
            squadTppdailykils: enres.data.attributes.gameModeStats.squad.dailyKills,
            squadTppdamagedealts: enres.data.attributes.gameModeStats.squad.damageDealt,
            squadTppdays: enres.data.attributes.gameModeStats.squad.days,
            squadTppheadshotkill: enres.data.attributes.gameModeStats.squad.headshotKills,
            squadTppheals: enres.data.attributes.gameModeStats.squad.heals,
            squadTppkillpoint: enres.data.attributes.gameModeStats.squad.killPoints,
            squadTppkills: enres.data.attributes.gameModeStats.squad.kills,
            squadTpplongestkill: enres.data.attributes.gameModeStats.squad.longestKill,
            squadTpplongesttimesurvived: enres.data.attributes.gameModeStats.squad.longestTimeSurvived,
            squadTpplosses: enres.data.attributes.gameModeStats.squad.losses,
            squadTppmaxkillstreak: enres.data.attributes.gameModeStats.squad.maxKillStreaks,
            squadTppmostsurvivaltime: enres.data.attributes.gameModeStats.squad.mostSurvivalTime,
            squadTpprevives: enres.data.attributes.gameModeStats.squad.revives,
            squadTppridedistance: enres.data.attributes.gameModeStats.squad.rideDistance,
            squadTpproadkills: enres.data.attributes.gameModeStats.squad.roadKills,
            squadTpproundmostkills: enres.data.attributes.gameModeStats.squad.roundMostKills,
            squadTpproundsplayed: enres.data.attributes.gameModeStats.squad.roundsPlayed,
            squadTppsuicides: enres.data.attributes.gameModeStats.squad.suicides,
            squadTppteamkills: enres.data.attributes.gameModeStats.squad.teamKills,
            squadTpptimesurvived: enres.data.attributes.gameModeStats.squad.timeSurvived,
            squadTpptoptens: enres.data.attributes.gameModeStats.squad.top10s,
            squadTppvehicledestroys: enres.data.attributes.gameModeStats.squad.vehicleDestroys,
            squadTppwalkdistance: enres.data.attributes.gameModeStats.squad.walkDistance,
            squadTppweaponacquired: enres.data.attributes.gameModeStats.squad.weaponsAcquired,
            squadTppweaklykills: enres.data.attributes.gameModeStats.squad.weeklyKills,
            squadTppwinpoints: enres.data.attributes.gameModeStats.squad.winPoints,
            squadTppwins: enres.data.attributes.gameModeStats.squad.wins,

            squadFppasists: enres.data.attributes.gameModeStats['squad-fpp'].assists,
            squadFppboosts: enres.data.attributes.gameModeStats['squad-fpp'].boosts,
            squadFppdbnos: enres.data.attributes.gameModeStats['squad-fpp'].dBNOs,
            squadFppdailykils: enres.data.attributes.gameModeStats['squad-fpp'].dailyKills,
            squadFppdamagedealts: enres.data.attributes.gameModeStats['squad-fpp'].damageDealt,
            squadFppdays: enres.data.attributes.gameModeStats['squad-fpp'].days,
            squadFppheadshotkill: enres.data.attributes.gameModeStats['squad-fpp'].headshotKills,
            squadFppheals: enres.data.attributes.gameModeStats['squad-fpp'].heals,
            squadFppkillpoint: enres.data.attributes.gameModeStats['squad-fpp'].killPoints,
            squadFppkills: enres.data.attributes.gameModeStats['squad-fpp'].kills,
            squadFpplongestkill: enres.data.attributes.gameModeStats['squad-fpp'].longestKill,
            squadFpplongesttimesurvived: enres.data.attributes.gameModeStats['squad-fpp'].longestTimeSurvived,
            squadFpplosses: enres.data.attributes.gameModeStats['squad-fpp'].losses,
            squadFppmaxkillstreak: enres.data.attributes.gameModeStats['squad-fpp'].maxKillStreaks,
            squadFppmostsurvivaltime: enres.data.attributes.gameModeStats['squad-fpp'].mostSurvivalTime,
            squadFpprevives: enres.data.attributes.gameModeStats['squad-fpp'].revives,
            squadFppridedistance: enres.data.attributes.gameModeStats['squad-fpp'].rideDistance,
            squadFpproadkills: enres.data.attributes.gameModeStats['squad-fpp'].roadKills,
            squadFpproundmostkills: enres.data.attributes.gameModeStats['squad-fpp'].roundMostKills,
            squadFpproundsplayed: enres.data.attributes.gameModeStats['squad-fpp'].roundsPlayed,
            squadFppsuicides: enres.data.attributes.gameModeStats['squad-fpp'].suicides,
            squadFppteamkills: enres.data.attributes.gameModeStats['squad-fpp'].teamKills,
            squadFpptimesurvived: enres.data.attributes.gameModeStats['squad-fpp'].timeSurvived,
            squadFpptoptens: enres.data.attributes.gameModeStats['squad-fpp'].top10s,
            squadFppvehicledestroys: enres.data.attributes.gameModeStats['squad-fpp'].vehicleDestroys,
            squadFppwalkdistance: enres.data.attributes.gameModeStats['squad-fpp'].walkDistance,
            squadFppweaponacquired: enres.data.attributes.gameModeStats['squad-fpp'].weaponsAcquired,
            squadFppweaklykills: enres.data.attributes.gameModeStats['squad-fpp'].weeklyKills,
            squadFppwinpoints: enres.data.attributes.gameModeStats['squad-fpp'].winPoints,
            squadFppwins: enres.data.attributes.gameModeStats['squad-fpp'].wins

          });
        }
      });
  });
});

http.listen(port, function(){
  console.log('listening on *:3000');
});