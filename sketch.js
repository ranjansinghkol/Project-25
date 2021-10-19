const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var canvas;
var player, playerBase, playerArcher, arrow;
var baseimage;
var arrows = [];

function preload() {
  backgroundImg = loadImage("assets/background.png");
  baseimage = loadImage("assets/base.png");
  playerimage = loadImage("assets/player.png");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  engine = Engine.create();
  world = engine.world;

  angleMode(DEGREES);

  var player_options = {
    isStatic: true
  }

  //create player base body
  playerBase = Bodies.rectangle(200, 380, 100, 150, player_options);
  World.add(world, playerBase);

  //create player body
  player = Bodies.rectangle(230, playerBase.position.y - 160, 50, 180, player_options);
  World.add(world, player);

  playerArcher = new PlayerArcher(300, 275, 100, 75, -90);
}

function draw() {
  background(backgroundImg);

  //show the player image using image() function
  image(playerimage, player.position.x, player.position.y, 50, 180);

  //show the playerbase image using image() function
  image(baseimage, playerBase.position.x, playerBase.position.y, 100, 150);

  playerArcher.display();

  Engine.update(engine);

  // Title
  push();
  fill("#FFFF");
  textAlign("center");
  textSize(40);
  text("EPIC ARCHERY", width / 2, 100);
  pop();

  push();
  fill(255);
  textSize(20);
  text("Press Right Arrow to shoot.", 10, 20);
  pop();

  for (var i = 0; i < arrows.length; i++) {
    showArrows(arrows[i]);
  }
}

function keyPressed() {
  if (keyCode == RIGHT_ARROW) {
    arrow = new Arrow(330, 277, 75, 25, playerArcher.angle);
    arrow.trajectory = [];
    Matter.Body.setAngle(arrow.body, playerArcher.angle);
    arrows.push(arrow);
  }
}

function showArrows(arrow) {
  if (arrow) {
    arrow.display();
  }
}

function keyReleased() {
  if (keyCode == RIGHT_ARROW) {
    arrow.shoot(playerArcher.body.angle);
  }
}