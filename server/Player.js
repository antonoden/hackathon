var SolidBody = require("C:/Users/Anton/Documents/workspace/hackathon/server/SolidBody.js");
var Weapon = require("C:/Users/Anton/Documents/workspace/hackathon/server/Weapon.js");

var Player = function(id,x,y)
{
  this.life=1;
  this.x=x;
  this.y=y;
  this.rotation=0;
  this.direction=0;
  this.id=id;
  this.color ="#"+ Math.floor((Math.random() * 0xFFFFFF * (id+1)) % 0xFFFFFF).toString(16);
  this.displayName; 
  this.moveSpeed = 4;
  this.rotationSpeed=2*Math.PI/90;
  this.radius=50;
  this.weapon = new Weapon("handgun",this);
  this.cooldown=false;
  this.dead=false;
};
Player.prototype=Object.create(SolidBody.prototype);

Player.prototype.shoot = function()
{
  if(!this.cooldown&&!this.dead)
    {
      setTimeout(
        function(player)
        {
          player.cooldown=false;
        },this.weapon.cooldown,this);
      this.cooldown=true;
      return this.weapon.shoot();
    }
  return false;
};

Player.prototype.newWeapon = function(weaponName) {
    this.weapon = new Weapon(weaponName, this);
};

module.exports=Player;
