/* Initing variables and functions */
var weaponsound;

uAction = new UserActions();
objects = new Objects();

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
    
    updateServer(uAction.input);
    
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

function setWeaponSound(sound) {
    
    if(sound === "Party Horn") {
        
        weaponsound = document.getElementById("audio_Party_Horn");
    }
    else if(sound === "50 Cal Machine") {
        
        weaponsound = document.getElementById("audio_50_Cal_Machine_Gun");
    }
    else if(sound === "Bullet Whizzing") {
        
        weaponsound = document.getElementById("audio_Bullet_Whizzing");
    } 
    else {
        
        weaponsound = undefined;
    }
}
/* Key down events 
 * 
 */
window.onkeydown = function(e) {
    
    var key = e.keyCode ? e.keyCode : e.which;
    
    switch(e.keyCode) {
        
        case 38:    // upkey
            uAction.input.moveDirection = +1;
            break;
        case 40:    // downkey
            uAction.input.moveDirection = -1;
            break;
        case 37:    // leftkey
            uAction.input.rotDirection = -1;
            break;
        case 39:    // rightkey
            uAction.input.rotDirection = +1;
            break;
        case 83:    // key 'a'
            setWeaponSound("");
            break;
        case 55:    // key '7'
            setWeaponSound("50 Cal Machine");
            break;
        case 56:    // key '8'
            setWeaponSound("Bullet Whizzing");
            break;
        case 57:    // key '9'
            setWeaponSound("Party Horn");
            break;
        case 32:    // key 'space'
            uAction.input.shoot = 1;
            if(weaponsound) weaponsound.play();
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
            uAction.input.moveDirection = 0;
            break;
        case 40:    // key 'down'
            uAction.input.moveDirection = 0;
            break;
        case 37:    // key 'left'
            uAction.input.rotDirection = 0;
            break;
        case 39:    // key 'right'
            uAction.input.rotDirection = 0;
            break;
        case 32:    // key 'space'
            uAction.input.shoot = 0;
            break;
    }
    return false;
};