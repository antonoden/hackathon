var SolidBody = function()
{

};


SolidBody.prototype.intersects = function(object)
{
  if(object.radius)
  {
    if(this.distance(object)<(object.radius+this.radius))
    {
      return true;
    }
    return false;
  }
  else
  {
    for(var x = object.x;x<(object.x+object.size.w);x++)
    {
      if(this.distanceToCoord(x,object.y)<this.radius)
      {
        return true;
      }
    }

    for(var x = object.x;x<(object.x+object.size.w);x++)
    {
      if(this.distanceToCoord(x,object.y+object.size.h)<this.radius)
      {
        return true;
      }
    }
    for(var y = object.y;y<(object.y+object.size.h);y++)
    {
      if(this.distanceToCoord(object.x,y)<this.radius)
      {
        return true;
      }
    }
    for(var y = object.y;y<(object.y+object.size.h);y++)
    {
      if(this.distanceToCoord(object.x+object.size.w,y)<this.radius)
      {
        return true;
      }
    }
    return false;
  }
};

SolidBody.prototype.distance = function(player)
{
  return Math.sqrt(Math.pow(player.x-this.x,2)+Math.pow(player.y-this.y,2));
};

SolidBody.prototype.distanceToCoord = function(x,y)
{
  return Math.sqrt(Math.pow(x-this.x,2)+Math.pow(y-this.y,2));
};
module.exports = SolidBody;
