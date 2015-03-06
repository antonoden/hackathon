var Draw = function(ctx, objects) {
    if(objects.playerObjects) {
        
        this.players(ctx, objects.playerObjects);
    }
    if(objects.mapObjects) {
        
        this.map(ctx, objects.mapObjects);
    }
    if(objects.jsonObject) {
        this.projectiles(ctx, objects.jsonObject);
    }
};

Draw.prototype.map = function(ctx, mapObjects) {
    
        mapObjects.forEach(function(obj) {
            
            ctx.fillStyle = obj.color;
            if(obj.type === "triangle") {
                
                ctx.beginPath();
                ctx.moveTo(obj.x, obj.y);
                ctx.lineTo(obj.x+10, obj.y-10);
                ctx.lineTo(obj.x-10, obj.y-10);
                ctx.closePath();
                ctx.fill();
            }
            else if(obj.type === "circle") {
                
                ctx.beginPath();
                ctx.arc(obj.x, obj.y, obj.size.radius, 0, 2*Math.PI);
                ctx.closePath();
                ctx.lineWidth = 0;
                ctx.stroke();
                ctx.fill();
            }
            else { // default type = rectangle
                
                ctx.fillRect(obj.x, obj.y, obj.size.w, obj.size.h);
            }
        });
};

Draw.prototype.players = function(ctx, playerObjects) {
    
    playerObjects.forEach(function(playerobj){

        drawHead(ctx, playerobj);
        drawWeapon(ctx, playerobj);
        drawStats(ctx, playerobj);
        if(playerobj.life <= 0) {

            drawKilledLines(ctx, playerobj);
        } 
    });
    
    function drawHead(ctx, playerobj) {
        
        ctx.fillStyle = playerobj.color;
        ctx.beginPath();
        ctx.arc(playerobj.x, playerobj.y, playerobj.radius, 0, 2*Math.PI);
        ctx.closePath();
        ctx.lineWidth = 10;
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
    
    function drawStats(ctx, playerobj) {
        
        ctx.font = "20px Georgia";
        ctx.fillText(
            playerobj.displayName + ": " + playerobj.life, 
            playerobj.x-(playerobj.radius/2), 
            playerobj.y-playerobj.radius-20);
    }
    
    function drawKilledLines(ctx, playerobj) {
        
        ctx.fillStyle = "#000000";
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(
                playerobj.x-playerobj.radius-10,
                playerobj.y+playerobj.radius+10);
        ctx.lineTo(
                playerobj.x + playerobj.radius+10,
                playerobj.y - playerobj.radius-10);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(
                playerobj.x-playerobj.radius-10,
                playerobj.y-playerobj.radius-10);
        ctx.lineTo(
                playerobj.x + playerobj.radius+10,
                playerobj.y + playerobj.radius+10);
        ctx.stroke();
    }
    
    function drawWeapon(ctx, playerobj) {
        
        ctx.fillStyle = "#000000";
        ctx.beginPath();
        ctx.moveTo(playerobj.x,playerobj.y);
        ctx.lineTo(playerobj.x + playerobj.weapon.length*Math.cos(playerobj.rotation)
                ,playerobj.y + playerobj.weapon.length*Math.sin(playerobj.rotation));
        ctx.lineWidth = 10;
        ctx.stroke();
    }
};

Draw.prototype.projectiles = function(ctx, jsonObject) {
    
    jsonObject.projectiles.forEach(function(projectile) {

        ctx.fillStyle="#FF0000";
        ctx.beginPath();
        ctx.arc(projectile.x, projectile.y, projectile.radius, 0, 2*Math.PI);
        ctx.closePath();
        ctx.lineWidth = 15;
        ctx.stroke();
        ctx.fill();
    });
};