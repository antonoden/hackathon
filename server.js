var server = require('http').createServer(router);
//var url = require('url');
var fs = require('fs');
var io = require('socket.io').listen(server, { log: false });

function router (request, response){
    console.info('Connection');
    //var path = url.parse(request.url).pathname;
	fs.readFile(__dirname + "/index.html", function(error, data){
		if (error){
			response.writeHead(404);
			response.write("opps this doesn't exist - 404");
			response.end();
		}
		else{
			response.writeHead(200, {"Content-Type": "text/html"});
			response.write(data, "utf8");
			response.end();
		}
	});
}

server.listen(80);

//realtime functions

function rightEdge(object){
	return object.x+object.width;
}

function leftEdge(object){
	return object.x;
}

function topEdge(object){
	return object.y;
}

function bottomEdge(object){
	return object.y+object.height;
}

var players = 		[null,null];

var padding = 		10;
var canvas = {
	width: 	800,
	height: 720
}

function object (x,y,height,width) {
	return {
		height : height,
		width : width,
		x : x,
		y : y
	};
}

var wallSettings = {
	width: 20,
	height: canvas.height-padding*2
}
var leftWall = object(
	padding, 
	padding,
	wallSettings.height,
	wallSettings.width
);
var rightWall = object(
	canvas.width-padding-wallSettings.width,
	padding,
	wallSettings.height,
	wallSettings.width
);

var paddleSettings = {
	width: 	80,
	height: 20,
	speed: 	600,//pixels per second
	startX: null
}
paddleSettings.startX = canvas.width/2-paddleSettings.width/2;
var paddle1 = object(
	paddleSettings.startX,
	padding,
	paddleSettings.height,
	paddleSettings.width
);
var paddle2 = object(
	paddleSettings.startX,
	canvas.height-padding-paddleSettings.height,
	paddleSettings.height,
	paddleSettings.width
);
paddle1.speed = paddleSettings.speed;
paddle2.speed = paddleSettings.speed;

var ballSettings = {
	width: 	40,
	height: 50,
	speed: 	400//pixels per second
}
var ball = object(
	null,
	null,
	ballSettings.width,
	ballSettings.height
);

function resetBall() {
	ball.x = (canvas.width/2 - ballSettings.width/2);
	ball.y = (canvas.height/2 - ballSettings.height/2);
	ball.Xspeed = Math.random()>0.5?ballSettings.speed:-ballSettings.speed;
	ball.Yspeed = Math.random()>0.5?ballSettings.speed:-ballSettings.speed;
}

resetBall();

function updateInfo () {
	if(players[0] == null){
		paddle1.width = canvas.width-padding*2-wallSettings.width*2;
		paddle1.x = padding+wallSettings.width;
	} else {
		paddle1.width = paddleSettings.width;
		paddle1.x = paddleSettings.startX;
	}
	if(players[1] == null){
		paddle2.width = canvas.width-padding*2-wallSettings.width*2;
		paddle2.x = padding+wallSettings.width;
	} else {
		paddle2.width = paddleSettings.width;
		paddle2.x = paddleSettings.startX;
	}
	io.sockets.emit('updateInfo',{players:players});
}

var then, now;
function updateGameState () {
	if(players[0] == null && players[1] == null){
		return;
	}
	now = Date.now();
	var modifier = 	(now - then)/1000;
	
	ball.x += modifier * ball.Xspeed;
	ball.y += modifier * ball.Yspeed;

	if(leftEdge(ball)<rightEdge(leftWall)){
		ball.Xspeed = Math.abs(ball.Xspeed);
	} else if(rightEdge(ball)>leftEdge(rightWall)){
		ball.Xspeed = -Math.abs(ball.Xspeed);
	}

	if(topEdge(ball)>canvas.height || bottomEdge(ball)<0){
		resetBall();
	}

	if(bottomEdge(ball)>topEdge(paddle2)){
		if((rightEdge(paddle2)>rightEdge(ball) && leftEdge(paddle2)<rightEdge(ball)) || (rightEdge(paddle2)>leftEdge(ball) && leftEdge(paddle2)<leftEdge(ball))){
			ball.Yspeed = -Math.abs(ball.Yspeed);
		}
	}

	if(topEdge(ball)<bottomEdge(paddle1)){
		if((rightEdge(paddle1)>rightEdge(ball) && leftEdge(paddle1)<rightEdge(ball)) || (rightEdge(paddle1)>leftEdge(ball) && leftEdge(paddle1)<leftEdge(ball))){
			ball.Yspeed = Math.abs(ball.Yspeed);
		}
	}


	var objects = [
		ball,		//0
		paddle1,	//1
		paddle2,	//2
		leftWall,	//3
		rightWall	//4
	];
	io.sockets.emit('updateClient',objects);

	then = now;
}

setInterval(function () {updateInfo()}, 1000);
then = Date.now();
setInterval(function () {updateGameState()}, 1000/60);
/*setInterval(function () {
	ball.x += ball.Xspeed;
	ball.y += ball.Yspeed;
	if(ball.x<25+35){
		ball.Xspeed = Math.abs(ball.Xspeed);
	} else if(ball.x>800-110){
		ball.Xspeed = -Math.abs(ball.Xspeed);
	}

	if(ball.y>800){
		ball.Yspeed = Math.random()>0.5?9:-9;
		ball.Xspeed = Math.random()>0.5?9:-9;
		ball.x = (800/2)-50;
		ball.y = (800/2)-50;
	} else if(ball.y<-100){
		ball.Yspeed = Math.random()>0.5?9:-9;
		ball.Xspeed = Math.random()>0.5?9:-9;
		ball.x = (800/2)-50;
		ball.y = (800/2)-50;
	}

	if(ball.x<paddles.p1.x+100 && ball.x>paddles.p1.x && ball.y<paddles.p1.y+30){
		ball.Yspeed = Math.abs(ball.Yspeed);
	}

	if(ball.x<paddles.p2.x+100 && ball.x>paddles.p2.x && (ball.y+10)>paddles.p2.y){
		ball.Yspeed = -Math.abs(ball.Yspeed);
	}

	io.sockets.emit('updateClient',{paddles:paddles,ball:ball});
}, 33);*/

io.sockets.on('connection', function(socket){
	var playerId = socket.id;
	socket.emit('setId',playerId);
	if(!players[0]){
		players[0] = playerId;
	} else if(!players[1]){
		players[1] = playerId;
	}
	updateInfo();

	socket.on('disconnect', function(data){
		if(players[0]==playerId){
			players[0] = null;
		} else if(players[1]==playerId){
			players[1] = null;
		}
	});

	socket.on('updateServer', function(paddle){
		if(paddle != null){
			if(playerId == players[0]){
				paddle1.x = paddle.x;
			} else if(playerId == players[1]){
				paddle2 = paddle;
			}
		}
	});
});