
var canvas=document.getElementById("gameWindow");
var ctx = canvas.getContext("2d");

	

var input = {
    moveDirection: 0,
    rotDirection: 0
};

var playersObj;
updateCanvas();

function updateCanvas() {
    if(playersObj) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    playersObj.forEach(function(playerobj){
            //ctx.rotate((playerobj.rotation+2)*Math.PI/180);
            
            ctx.fillStyle = playerobj.color;
            ctx.beginPath();
            ctx.arc(playerobj.x, playerobj.y, playerobj.radius, 0, 2*Math.PI);
            ctx.closePath();
            ctx.stroke();
            ctx.fill();
//            ctx.fillRect(
//                    playerobj.x-(playerobj.size/2), 
//                    playerobj.y-(playerobj.size/2),
//                    playerobj.size,
//                    playerobj.size);
            var pistolSize=75;
            ctx.beginPath();
            ctx.moveTo(playerobj.x,playerobj.y);
            ctx.lineTo(playerobj.x + pistolSize*Math.cos(playerobj.rotation)
                    ,playerobj.y + pistolSize*Math.sin(playerobj.rotation));
            ctx.stroke();
            
            
    });
    
    }
    socket.emit("update", input);
    
    window.requestAnimationFrame(updateCanvas);
}

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
    return false;
};

window.onkeyup = function(e) {
    var key = e.keyCode ? e.keyCode : e.which;
    
    if(key === 38 || key === 40) {
        input.moveDirection = 0;
    }
    if(key === 37|| key === 39) {
        input.rotDirection = 0;
    }
    return false;
};