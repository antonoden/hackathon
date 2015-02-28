/* Initing variables and functions */
var canvas=document.getElementById("gameWindow");
var ctx = canvas.getContext("2d");

var jsonObj;
var playersObj;
var mapObj;

var input = {
    moveDirection: 0,
    rotDirection: 0,
    shoot: 0
};

init();
function init() {
    updateCanvas(ctx);
};

function getInfo() {
    console.log(jsonObj);
}
/*****************************************************************************/
function drawMap(ctx) {
    if(mapObj) {
        mapObj.forEach(function(obj) {
            ctx.fillStyle = obj.color;
            if(obj.type === "triangle") 
            {
                ctx.beginPath();
                ctx.moveTo(obj.x, obj.y);
                ctx.lineTo(obj.x+10, obj.y-10);
                ctx.lineTo(obj.x-10, obj.y-10);
                ctx.closePath();
                ctx.fill();
            }
            else if(obj.type === "circle") 
            {
                ctx.beginPath();
                ctx.arc(obj.x, obj.y, obj.size.radius, 0, 2*Math.PI);
                ctx.closePath();
                ctx.stroke();
                ctx.fill();
            }
            else // default type = rectangle
            {
                ctx.fillRect(obj.x, obj.y, obj.size.w, obj.size.h);
            }
            
        });
    }
}

function setPlayerName() {
    
    var playerName = prompt("Enter your name : ", "your name here");
    
    socket.emit("updatePlayerName", playerName);
}

function updateCanvas() {
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    drawPlayers(ctx);
    drawProjectiles(ctx);
    drawMap(ctx);
    
    updateServer(input);
    
    window.requestAnimationFrame(updateCanvas);
}

function updateServer(input) 
{
    socket.emit("update", input);
    input.shoot = 0;
}

function clearCanvas(ctx) 
{
    
}

function drawPlayers(ctx)
{
    if(playersObj) 
    {
        playersObj.forEach(function(playerobj){
            drawHead(ctx, playerobj);
            drawWeapon(ctx, playerobj);
            drawPlayerName(ctx, playerobj);
        });
    }
}

function drawPlayerName(ctx, playerobj) {
    ctx.font = "20px Georgia";
    ctx.fillText(
            playerobj.displayName, 
            playerobj.x-(playerobj.radius/2), 
            playerobj.y-playerobj.radius-20);
}

function drawHead(ctx, playerobj)
{
    ctx.fillStyle = playerobj.color;
    ctx.beginPath();
    ctx.arc(playerobj.x, playerobj.y, playerobj.radius, 0, 2*Math.PI);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.arc(playerobj.x, playerobj.y, playerobj.radius/4, 0, 2*Math.PI);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
}

function drawWeapon(ctx, playerobj)
{
    var pistolSize=75;
    ctx.fillStyle = playerobj.color;
    ctx.beginPath();
    ctx.moveTo(playerobj.x,playerobj.y);
    ctx.lineTo(playerobj.x + pistolSize*Math.cos(playerobj.rotation)
            ,playerobj.y + pistolSize*Math.sin(playerobj.rotation));
    ctx.lineWidth = 15;
    ctx.stroke();
}

function drawProjectiles(ctx)
{
    if(jsonObj)
    {
        jsonObj.projectiles.forEach(function(projectile)
        {
                ctx.fillStyle="#FF0000";
                ctx.beginPath();
                ctx.arc(projectile.x, projectile.y, projectile.radius, 0, 2*Math.PI);
                ctx.closePath();
                ctx.stroke();
                ctx.fill();
        });
    }
}

/* Key down events 
 * 
 */
window.onkeydown = function(e) {
    var key = e.keyCode ? e.keyCode : e.which;
    
    if(key === 38) {
        input.moveDirection = 1;
    }
    else if(key === 40) {
        input.moveDirection = -1;
    }
    
    if(key === 37) {
        input.rotDirection = -1;
    }
    else if(key === 39) {
        input.rotDirection = +1;
    }
    
    if(key === 32) {
        input.shoot = 1;
        document.getElementById('shootaudio').play();
    }
    
    return false;
};

/* Key up events
 * 
 */
window.onkeyup = function(e) {
    var key = e.keyCode ? e.keyCode : e.which;
    
    if(key === 38 || key === 40) {
        input.moveDirection = 0;
    }
    if(key === 37|| key === 39) {
        input.rotDirection = 0;
    }
    if(key === 32) {
        input.shoot = 0;
    }
    return false;
};