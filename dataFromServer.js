/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
  var socket = io("http://91.123.198.103:8080");
  
 
  socket.on("gameState", function(data){
  playersObj = data.players;
 // var 
  });
  
 /* socket.emit('ballRequest', 'Please I want to play, senpai');
  
  
   socket.on("EnFinBoll", function(object){
       console.log(object);
   });


   
     socket.on('chat message', function(msg){
    console.log('message: ' + msg);
   
  });*/
  

