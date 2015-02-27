
var canvas=document.getElementById("gameWindow");
var ctx = canvas.getContext("2d");


var playersObj;

function updateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var temp = 0;
    playersObj.forEach(function(playerobj){
            temp = temp + 1;
            ctx.fillStyle = playerobj.color;
            ctx.fillRect(
                    playerobj.x-(playerobj.size/2), 
                    playerobj.y-(playerobj.size/2),
                    playerobj.size,
                    playerobj.size);
            
            ctx.fillRect(
                    playerobj.x-(playerobj.size/2), 
                    playerobj.y-(playerobj.size/2),
                    playerobj.size,
                    playerobj.size);
    });
    window.requestAnimationFrame(updateCanvas);
}	
