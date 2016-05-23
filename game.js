// Create the canvas
var canvas = document.createElement("canvas"),
ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);
// Background image
var bgReady = false, bgImage = new Image();
bgImage.onload = function(){
	bgReady = true;
};
bgImage.src = "images/background.png";
// Hero image
var heroReady = false,heroImage = new Image();
heroImage.onload = function(){
	heroReady = true;
};
heroImage.src = "images/hero.png";
// Monster image
var monsterReady = false, heroImage = new Image();
heroImage.onloand = function(){
	monsterReady = true;
};
monsterImage.src = "images/monster.png";
// Game Objects
var hero = {speed:256},monster = {},monstersCaught = 0,
	keysDown = {};// handle keyboard controls	
addEventListener("keydown",function(){
	keysDown[e.keyCode] = true;
},false);
addEventListener("keyup",function(){
	delete keysDown[e.keyCode];
},false);
// Reset the game when the player catches a monster
var reset = function(){
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;
	// Throw the monster somewhere on the screen randomly
	monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64));
};
// Update game ogjects
var update = function(modifier){
	if(38 in keysDown){ // Player holding up
		hero.y -= hero.speed * modifier;
	}
	if(40 in keysDown){
		
	}
};

