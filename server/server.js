var server = require("http").createServer(router);
var io = require("C:/Windows/System32/node_modules/socket.io/").listen(server,{log:false});
var Player=require("C:/Users/Anton/Documents/workspace/hackathon/server/Player.js");
var Map = require("C:/Users/Anton/Documents/workspace/hackathon/server/Map.js");
var Projectile = require("C:/Users/Anton/Documents/workspace/hackathon/server/Projectile.js");


function router (request, response)
{
    console.info('Connection');

    if (error) {
      response.writeHead(404);
      response.write("opps this doesn't exist - 404");
      response.end();
    }
    else {
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write("slasdopgko", "utf8");
      response.end();
    }
}
server.listen(1337);
var sockets= new Array();
var players=new Array();
var gameState={};
var maps = new Array();
var projectiles=new Array();
var map = new Map();

gameState.players=players;
gameState.projectiles=projectiles;
setInterval(function()
            {
               for(var i = 0;i<projectiles.length;i++)
              {
                if(outOfBounds(projectiles[i]))
                {
                  projectiles.splice(i,1);
                }else
                {
                  projectiles[i].update();
                }
              }
              handleCollision();
              io.sockets.emit("gameState",gameState);
             

            },1000/60);
io.sockets.on('connection', function(socket)
{

  socket.emit("updateMap", map);
  var id=players.length?players.length:0;
  var player = new Player(id,0,0);
  while(true)
  {
    player.x=Math.random()*(1500-player.radius);
    player.y=Math.random()*(800-player.radius);
    var intersect=false;
    map.obstacles.concat(players).forEach(
      function(object)
      {
        if(player.intersects(object))intersect=true;
      });
    if(!intersect)break;
  }
  
  players.push(player);
  socket.player=player;
  socket.emit("gameState",gameState);
  socket.on("disconnect",function(data)
            {
              for(var i = 0; i< players.length;i++)
                {
                  if(player===players[i])
                    {
                      players.splice(i,1);
                      break;
                    }
                }
            });
			


  socket.on("update",function(updateData)
            {
              handlePlayerInput(player,updateData);      
            });


  socket.on("updatePlayerName",function(name)
            {
              player.displayName=name;
            });

});


function handlePlayerInput(player,updateData)
{
  movement(player,updateData.moveDirection);
  rotation(player,updateData.rotDirection);
  shoot(player,updateData.shoot);
}

function shoot(player,shoot)
{
  if(shoot===1)
  {
    var projectile=player.shoot();
    if(projectile)
      projectiles.push(projectile);
  }
}


function rotation(player,direction)
{
  player.rotation+=direction*player.rotationSpeed;
}

function movement(player,direction)
{
  player.direction=direction;
}


function handleCollision()
{
  var objects=players.concat(map.obstacles);
  players.forEach(
    function(player)
    {
      var oldX=player.x;
      var oldY=player.y;
      if(!player.dead)
      {
        player.x+=player.direction*player.moveSpeed*Math.cos(player.rotation);
        player.y+=player.direction*player.moveSpeed*Math.sin(player.rotation);
      }
      objects.forEach(
        function(object)
        {
          if(object!==player&&player.intersects(object))
          {
            player.x=oldX;
            player.y=oldY;
          }
        });
    });
  projectiles.forEach(
    function(projectile)
    {
      objects.forEach(
      function(object)
      {
        if(projectile.intersects(object))
        {
          if(object.life!=="undefined")
            {
              if(object.life-projectile.damage<=0)
              {
                object.life=0;
                object.dead=true;
                object.color="#FFFFFF";
              }
              else
              {
                object.life-=projectile.damage;
              }
              
            }
          projectiles.splice(projectiles.indexOf(projectile),1);
        }
      });
    });
}

function outOfBounds(object)
{
  if(object.x>1600 || object.y>900 || object.x<0 || object.y<0)
    return true;
  return false;
}
