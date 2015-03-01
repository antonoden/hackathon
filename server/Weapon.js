var Projectile = require("C:/Users/Anton/Documents/workspace/hackathon/server/Projectile.js");
var Weapon = function(name,cooldown,player)
{
  this.name = name;
  this.cooldown = cooldown;
  this.setWeaponSize();
  
  Object.defineProperty(this,'player',
                       {
                         value:player,
                         writable:true,
                         configurable:true,
                         enumerable:false
                       });
};

Weapon.prototype.setWeaponSize = function()
{
    if(this.name == "handgun") {
        this.length = 100;
    }
    else {
        this.length = 55;
    }
};

Weapon.prototype.shoot = function()
{
  var radius=10;
  return new Projectile(
    radius,
    15,this.player.x+((this.player.radius+radius+5)*Math.cos(this.player.rotation))+2,
    this.player.y+((this.player.radius+radius+5)*Math.sin(this.player.rotation))+2,
    this.player.rotation,
    1);
};


module.exports = Weapon;
