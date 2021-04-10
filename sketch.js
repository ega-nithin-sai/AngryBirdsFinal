const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint=Matter.Constraint;

var engine, world;
var box1, pig1;
var backgroundImg;

var platform;

var attachedPig;
var chain1;

var gameState = "onSling";

var time;

var score = 0;

function preload() {
    backgroundImg = loadImage("sprites/bg.png");
    nightBackgroundImg = loadImage("sprites/bg2.jpeg");
}

function setup(){
    createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;

    
    ground = new Ground(600,400,1200,20);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    bird = new Bird(100,100);
    bird2 = new Bird(50,100);

    platform = new Ground(130,325,260,150);

    chain1 = new Slingshot(bird.body,{x:160,y:80});

    //string
    var str="hello";
    console.log(str);

    //number
    var num=67;
    console.log(num);

    //null
    var n=null;
    console.log(n);

    //boolean
    var bool=true;
    console.log(bool);

    //undefined
    var un;
    console.log(un);

    //array
    var arr1=["angry",3,"birds",false,89];
    console.log(arr1);

    arr1[2] = "pig";

    console.log(arr1);

    var arr = [[3,true,"78gh",5],["sdf",454,false]];
    console.log(arr);

    arr.push("Hi");
    console.log(arr);

    arr.pop();
    console.log(arr);

    //json
    var j={name:"Nithin",class:10,age:15};
    console.log(j);
    console.log(j.name);

    getBackgroundImg();
}

function draw(){
    if(time >= 6 && time < 19){
        background(backgroundImg);
    }
    else{
        background(nightBackgroundImg);
    }
    Engine.update(engine);

    
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
    bird2.display();

    platform.display();

    chain1.display();

    pig1.score();
    pig3.score();

    push();
    textSize(20);
    strokeWeight(5);
    stroke("gold");
    fill("black");
    text("Score: " + score,50,50);
    pop();

    if(score === 1000){
        gameState = "gameOver";
        
        background("blue");

        push();
        textAlign(CENTER);
        textSize(30);
        strokeWeight(5);
        stroke("gold");
        fill("black");
        text("GAME OVER \n Congratulation You Win",600,200);
        pop();
    }
}

function mouseDragged(){
    // !== IS USED TO WRITE NOT EQUAL TO
    if(gameState === "onSling"){
        Body.setPosition(chain1.slingshot.bodyA,{x:mouseX,y:mouseY});
    }
}

function mouseReleased(){
    chain1.fly();
    gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32){
        chain1.attach(bird2.body);
        gameState = "onSling";
        bird.trajectory = [];
    }
}

async function getBackgroundImg(){
    var data = await fetch("https://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var collectedData = await data.json();
    console.log(collectedData);
    time = collectedData.datetime.slice(11,13);
    console.log(time);

    // this function should be calledd in preload not setup/draw
    //if(time >= 6 && time <= 19){
        // bg = "sprites/bg.png";
    // }
    // else{
        // bg = "sprites/bg2.jpeg";
    // }
    // backgroundImg = loadImage(bg);
}