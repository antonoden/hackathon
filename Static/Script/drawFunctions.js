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
                ctx.lineWidth = 0;
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


function drawPlayers(ctx)
{
    if(playersObj) 
    {
        playersObj.forEach(function(playerobj){
            drawHead(ctx, playerobj);
            drawWeapon(ctx, playerobj);
            drawStats(ctx, playerobj);
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
    ctx.lineWidth = 10;
    ctx.stroke();
    ctx.fill();
}


function drawWeapon(ctx, playerobj)
{
    pistolSize = 75;
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.moveTo(playerobj.x,playerobj.y);
    ctx.lineTo(playerobj.x + pistolSize*Math.cos(playerobj.rotation)
            ,playerobj.y + pistolSize*Math.sin(playerobj.rotation));
    ctx.lineWidth = 10;
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
            ctx.lineWidth = 15;
            ctx.stroke();
            ctx.fill();
        });
    }
}

function drawStats(ctx, playerobj)
{
    ctx.font = "20px Georgia";
    ctx.fillText(
        playerobj.displayName + ": " + playerobj.life, 
        playerobj.x-(playerobj.radius/2), 
        playerobj.y-playerobj.radius-20);
        
}