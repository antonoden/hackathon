
var canvas=document.getElementById("gameWindow");
var ctx = canvas.getContext("2d");

function updateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var temp = 0;
    playersObj.forEach(function(playerobj){
            temp = temp + 1;
            ctx.fillStyle = playerobj.color;
            ctx.fillRect(playerobj.x, playerobj.y, 50, 50);
    });
    window.requestAnimationFrame(updateCanvas);
}	

var jsonObj = {
	"players":[
		{
			"id":55,
			"color":"#8E0000",
			"x":0,
			"y":0
		},
		{
			"id":2,
			"color":"#8A00B8",
			"x":10,
			"y":10
		},
		{
			"id":104,
			"color":"#0029A3",
			"x":30,
			"y":10
		},
		{
			"id":44,
			"color":"#00B200",
			"x":50,
			"y":10
		}
	]
};

var playersObj = jsonObj.players;
