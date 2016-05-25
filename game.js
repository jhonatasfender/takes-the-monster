// Create the canvas
var w = window, d = document, e = d.documentElement, g = d.getElementsByTagName('body')[0],
        canvas = d.createElement("canvas"), ctx = canvas.getContext("2d");
/*canvas.width = w.innerWidth || e.clientWidth || g.clientWidth;
 canvas.height = w.innerHeight || e.clientHeight || g.clientHeight;*/
canvas.width = 512;
canvas.height = 480;
d.body.appendChild(canvas);
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
    hero.x = monster.x == undefined ? canvas.width / 2 : monster.x;
    hero.y = monster.y == undefined ? canvas.height / 2 : monster.y;
    // Throw the monster somewhere on the screen randomly
    monster.x = 32 + (Math.random() * (canvas.width - 64));
    monster.y = 32 + (Math.random() * (canvas.height - 64));
},
        // Update game ogjects
        update = function (modifier) {
            if (38 in keysDown && hero.y > 5) // Player holding up
                hero.y -= hero.speed * modifier;
            if (40 in keysDown && hero.y < canvas.height - 32)  // Player holding down
                hero.y += hero.speed * modifier;
            if (37 in keysDown && hero.x > 5) // Player holding left
                hero.x -= hero.speed * modifier;
            if (39 in keysDown && hero.x < canvas.width - 32) // Player holding right
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
            if (heroReady)
                ctx.drawImage(heroImage, hero.x, hero.y);
            if (monsterReady)
                ctx.drawImage(monsterImage, monster.x, monster.y);
            ctx.fillStyle = "rgb(250,250,250)";
            ctx.font = "24px Helvetica";
            ctx.textAling = "left";
            ctx.textBaseline = "top";
            ctx.fillText("Goblins caught: " + monstersCaught, 32, 32);
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























