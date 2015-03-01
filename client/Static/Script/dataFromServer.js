/* This file is meant to handle the communication from server 
 * 
 */

var socket = io("http://192.168.0.12:8080");
  
 socket.on("updateMap", function(data){
    mapObj = data.obstacles;
 });
 
  socket.on("gameState", function(data){
    jsonObj = data;
    playersObj = data.players;
  });
  

