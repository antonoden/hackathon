/* This file is meant to handle the communication from server 
 * 
 */

var socket = io("http://91.123.198.103:8080");
  
 socket.on("updateMap", function(data){
    mapObj = data.map;
    paintMap();
 });
 
  socket.on("gameState", function(data){
    jsonObj = data;
    
    playersObj = data.players;
  });
  

