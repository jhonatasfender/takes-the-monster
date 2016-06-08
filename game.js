/*
 * 
 * http://www.mathpuzzle.com/Solution.htm
 * 
 */
// Create the canvas
var w = window, d = document, e = d.documentElement, g = d.getElementsByTagName('body')[0],
        canvas = d.createElement("canvas"), ctx = canvas.getContext("2d");
/*canvas.width = w.innerWidth || e.clientWidth || g.clientWidth;
 canvas.height = w.innerHeight || e.clientHeight || g.clientHeight;*/
canvas.width = 512;
canvas.height = 480;
d.body.appendChild(canvas);
// brick
var bkReady = false, bkImage = new Image(), mapWall = new Array(), sizeWall = {'width': 32, 'height': 32}, mapMonster = new Array();
wall = function () {
    if (false) {
        for (var i = 0; i < canvas.width; i = i + sizeWall.width) {
            for (var j = 0; j < canvas.height; j = j + sizeWall.height) {
                if (i <= Math.random() * canvas.width && i >= Math.random() * canvas.height) {
                    mapWall[mapWall.length] = {'width': i, 'height': j};
                } else {
                    mapMonster[mapMonster.length] = {x: i, y: j};
                }
            }
        }
    } else {
        mapWall[0] = {width: 300, height: 200};
        mapWall[1] = {width: 300, height: 300};
        mapMonster[0] = {x: 200, y: 200};
    }
};
bkImage.onload = function () {
    bkReady = true;
};
bkImage.src = "images/brick.png";
wall();
// Background image
var bgReady = false, bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};
bgImage.src = "images/background.png";
// Hero image
var heroReady = false, heroImage = new Image();
heroImage.onload = function () {
    heroReady = true;
};
heroImage.src = "images/hero.png";
// Monster image
var monsterReady = false, monsterImage = new Image();
monsterImage.onload = function () {
    monsterReady = true;
};
monsterImage.src = "images/monster.png";
// Game Objects
var hero = {speed: 256}, monster = {}, monstersCaught = 0, keysDown = {};// handle keyboard controls	
addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
}, false);
addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
}, false);
// Reset the game when the player catches a monster
var reset = function () {
    var a = mapMonster[Math.floor(Math.random() * mapMonster.length)],
            b = mapMonster.length - 1 == 0 ? mapMonster[mapMonster.length - 1] : mapMonster[parseInt(mapMonster.length / 2) - 1];
    hero.x = monster.x == undefined ? b.x : monster.x;
    hero.y = monster.y == undefined ? b.y : monster.y;
    // Throw the monster somewhere on the screen randomly
    monster.x = a.w;
    monster.y = a.h;
},
        // Update game ogjects
        update = function (modifier) {
            var b = new Object();
            if (38 in keysDown || 40 in keysDown || 37 in keysDown || 39 in keysDown) {
                for (var i = 0; i < mapWall.length; i++) {
                    if (38 in keysDown && hero.y > 5) { // Player holding up
                    }
                    if (40 in keysDown && hero.y < canvas.height - 32) {  // Player holding down
                    }
                    if (37 in keysDown && hero.x > 5) { // Player holding left
                        b.left = true;
                    }
                    if (39 in keysDown && hero.x < canvas.width - 32 &&
                            !(hero.x <= mapWall[i].width || hero.x >= mapWall[i].width + 32) &&
                            !(hero.x >= mapWall[i].width - 32 && hero.x <= mapWall[i].width &&
                                    hero.y <= mapWall[i].height + 32 && hero.y >= mapWall[i].height - 32)) { // Player holding right
                        b.right = true;
                    }
                }
            }
            if (38 in keysDown && hero.y > 5) // Player holding up
                hero.y -= hero.speed * modifier;
            if (40 in keysDown && hero.y < canvas.height - 32)  // Player holding down
                hero.y += hero.speed * modifier;
            if (37 in keysDown && hero.x > 5) // Player holding left
                hero.x -= hero.speed * modifier;
            if (39 in keysDown && hero.x < canvas.width - 32 && b.right) // Player holding right
                hero.x += hero.speed * modifier;
            if (hero.x <= (monster.x + 32) && monster.x <= (hero.x + 32) && hero.y <= (monster.y + 32) && monster.y <= (hero.y + 32)) {
                ++monstersCaught;
                reset();
            }
        },
        // Draw wverything
        render = function () {
            if (bgReady)
                ctx.drawImage(bgImage, 0, 0);
            for (var i = 0; i < mapWall.length; i++) {
                if (mapWall[i] != undefined) {
                    ctx.drawImage(bkImage, mapWall[i].width, mapWall[i].height, sizeWall.width, sizeWall.height);
                }
            }
            if (heroReady) {
                ctx.drawImage(heroImage, hero.x, hero.y);
                //see the dimensions of the hero
                if (true) {
                    ctx.fillStyle = "white";
                    ctx.font = "10px Helvetica";
                    ctx.fillText("x: " + hero.x, hero.x, hero.y - 32);
                    ctx.fillText("y: " + hero.y, hero.x, hero.y + 42);
                }
            }
            if (monsterReady)
                ctx.drawImage(monsterImage, monster.x, monster.y);
            if (true) {
                for (var x = 0; x < canvas.width; x = x + sizeWall.width) {
                    for (var y = 0; y < canvas.height; y = y + sizeWall.height) {
                        for (var i = 0; i < mapWall.length; i++) {
                            if (x <= mapWall[i].width && x >= mapWall[i].width &&
                                    y <= mapWall[i].height && y >= mapWall[i].height) {
                                /*ctx.fillStyle = "black";
                                 ctx.fillRect(x, y, 32, 32);*/
                                ctx.fillStyle = "white";
                                ctx.font = "10px Helvetica";
                                ctx.fillText("x: " + x, x, y + 10);
                                ctx.fillText(" y: " + y, x, y + 20);
                            }
                        }
                    }
                }
            }
            ctx.fillStyle = "rgb(250,250,250)";
            ctx.font = "20px Helvetica";
            ctx.textAling = "left";
            ctx.textBaseline = "top";
            ctx.fillText("number of monsters captured: " + monstersCaught, 32, 32);
        },
        // The main game loop
        main = function () {
            var now = Date.now(), delta = now - then;
            update(delta / 1000);
            render();
            then = now;
            // Request to do this again ASAP
            requestAnimationFrame(main);
        },
        // Cross-browser support for requestAnimationFrame
        then = Date.now();
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimation || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
reset();
main();
