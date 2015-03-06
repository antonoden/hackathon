/* Initing variables and functions */

var player = new Player();
var objects = new Objects();
var soundActivated = false;

init();
function init() {
    
    setPlayerName(randomPlayerName());
    updateCanvasLoop();
};
/*****************************************************************************/

function updateCanvasLoop() {
    
    var canvas=document.getElementById("gameWindow");
    var ctx = canvas.getContext("2d");
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    new Draw(ctx, objects);
    
    updateServer(player.input);
    
    window.requestAnimationFrame(updateCanvasLoop);
}

function updateServer(input) {
    
    socket.emit("update", input);
    input.shoot = 0;
}

function randomPlayerName() {
    
    var random = Math.floor((Math.random() * 10) + 1);
    var playerName;
    switch(random) {
        
        case 1:
            playerName = "Göran Hägglund";
            break;
        case 2:
            playerName = "Noname";
            break;
        case 3:
            playerName = "Arnold";
            break;
        case 4:
            playerName = "Göran Persson";
            break;
        case 5:
            playerName = "Fredrik Reinfeldt";
            break;
        case 6:
            playerName = "Stefan Löfven";
            break;
        case 7:
            playerName = "Barack Obama";
            break;
        case 8:
            playerName = "Sadam Hussein";
            break;
        case 9:
            playerName = "Angela Merkel";
            break;
        case 10:
            playerName = "Vlademir Putin";
            break;
    }
    return playerName;
}

function setPlayerName(playerName) {
    
    socket.emit("updatePlayerName", playerName);
}
/* Key down events 
 * 
 */
window.onkeydown = function(e) {
    
    var key = e.keyCode ? e.keyCode : e.which;
    
    switch(e.keyCode) {
        
        case 38:    // upkey
            player.input.moveDirection = +1;
            break;
        case 40:    // downkey
            player.input.moveDirection = -1;
            break;
        case 37:    // leftkey
            player.input.rotDirection = -1;
            break;
        case 39:    // rightkey
            player.input.rotDirection = +1;
            break;
        case 83:    // key 'a'
            if(soundActivated === false) { soundActivated = true; }
            else { soundActivated = false; }
            break;
        case 55:    // key '7'
            socket.emit("changeWeapon", "machinegun");
            player.weapon = "machinegun";
            break;
        case 56:    // key '8'
            socket.emit("changeWeapon", "handgun");
            player.weapon = "handgun";
            break;
        case 57:    // key '9'
            socket.emit("changeWeapon", "partyhorn");
            player.weapon = "partyhorn";
            break;
        case 32:    // key 'space'
            player.input.shoot = 1;
            if(soundActivated === true) player.playSound();
            break;
    }
    return false;
};

/* Key up events
 * 
 */
window.onkeyup = function(e) {
    
    var key = e.keyCode ? e.keyCode : e.which;
    
    switch(e.keyCode) {
        
        case 38:    // key 'up'
            player.input.moveDirection = 0;
            break;
        case 40:    // key 'down'
            player.input.moveDirection = 0;
            break;
        case 37:    // key 'left'
            player.input.rotDirection = 0;
            break;
        case 39:    // key 'right'
            player.input.rotDirection = 0;
            break;
        case 32:    // key 'space'
            player.input.shoot = 0;
            break;
    }
    return false;
};