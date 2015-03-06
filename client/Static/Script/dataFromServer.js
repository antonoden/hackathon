/* This file is meant to handle the communication from server 
 * 
 */

var socket = io("http://192.168.0.10:1337");
  
 socket.on("updateMap", function(data){
    objects.mapObjects = data.obstacles;
 });
 
  socket.on("gameState", function(data){
    objects.jsonObject = data;
    objects.playerObjects = data.players;
  });
  

