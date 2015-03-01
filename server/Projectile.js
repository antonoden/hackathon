var SolidBody = require("C:/Users/Anton/Documents/workspace/hackathon/server/SolidBody.js");

var Projectile = function(radius,speed,x,y,rotation,damage)
{
  this.radius=radius;
  this.speed=speed;
  this.x=x;
  this.y=y;
  this.rotation=rotation;
  this.damage = damage;
};

Projectile.prototype = Object.create(SolidBody.prototype);


Projectile.prototype.update = function()
{
  this.x+=this.speed*Math.cos(this.rotation);
  this.y+=this.speed*Math.sin(this.rotation);
  
};

module.exports=Projectile;
