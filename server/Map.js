var Map = function()
{  
  this.obstacles = new Array(); 
  var size = {w:200,h:50}; 
  var sizeBorderV = {w:2, h:860};
  var sizeBorderH = {w:1560, h:2};

  this.obstacles.push(new HillBox(20,20,2,sizeBorderV,0));
  this.obstacles.push(new HillBox(20,880,3,sizeBorderH,0));
  this.obstacles.push(new HillBox(20,20,4,sizeBorderH,0));
  this.obstacles.push(new HillBox(1580,20,5,sizeBorderV,0));
  this.obstacles.push(new HillBox(200,200,1,size,40));
  this.collideX=new Array();
  this.collideY=new Array();
  }
//	var borders2 = new HillBox(1,1599,2,sizeBorderR,0)
//	var borders3 = new HillBox(1,1,2,sizeBorderU,0)
//	var borders4 = new HillBox(899,1,2,sizeBorderD,0)


var HillBox = function(x,y,id,size,danger){
  this.x=x;
  this.y=y;
  this.size=size;
  this.id=id;
  this.YouShallNotPass!=danger;
  this.color ="#"+ Math.floor((Math.random() * 0xFFFFFF * (id+1)) % 0xFFFFFF).toString(16);
  
 };
 
module.exports=Map;
