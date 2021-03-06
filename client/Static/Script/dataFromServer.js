/* This file is meant to handle the communication from server 
 * 
 */
if(!cookieExist("serverIP")) {
    
    document.cookie = "serverIP="+prompt("Please enter server IP")+";";
}
if(!cookieExist("serverPort")) {
    
    document.cookie = "serverPort="+prompt("Please enter server port")+";";
}

var socket = io("http://"+readCookie("serverIP")+":"+readCookie("serverPort"));
  
socket.on("updateMap", function(data){
    
    objects.mapObjects = data.obstacles;
});
 
socket.on("gameState", function(data){
    
    objects.jsonObject = data;
    objects.playerObjects = data.players;
});
  
function changeServerPort() {
    
    document.cookie = "serverPort="+prompt("Please enter server port")+";";
}
function changeServerIP() {
    
    document.cookie = "serverIP="+prompt("Please enter server IP")+";";
}
function readCookie(name) {
    
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            
            c = c.substring(1,c.length);
        }
        if (c.indexOf(nameEQ) === 0) {
            
            return c.substring(nameEQ.length,c.length);
        }
    }
    return "";
}

function cookieExist(name) {
    
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            
            c = c.substring(1,c.length);
        }
        if (c.indexOf(nameEQ) === 0) {
            
            return true;
        }
    }
    return false;
}