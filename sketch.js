var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud,cloudimage,CloudsGroup;
var obstacle,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6,ObstaclesGroup;
var count=0;
var PLAY=1;
var END=0;
var gameState=PLAY;
var gameover,restart;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  cloudimage=loadImage("cloud.png");
  obstacle1=loadImage("obstacle1.png");
  obstacle2=loadImage("obstacle2.png");
  obstacle3=loadImage("obstacle3.png");
  obstacle4=loadImage("obstacle4.png");
    obstacle5=loadImage("obstacle5.png");
    obstacle6=loadImage("obstacle6.png");
  groundImage = loadImage("ground2.png");
    gameover1 = loadImage("gameOver.png");
  restart1 = loadImage("restart.png");
  
}

function setup() {
  createCanvas(600, 200);
  
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  CloudsGroup=new Group();
  ObstaclesGroup=new Group();
  
   restart=createSprite(300,100,50,40);
  gameover=createSprite(300,140,30,20);
  
  gameover.visible=false;
  restart.visible=false;
  
  restart.addImage("gamerestart",restart1);
  restart.scale=0.5;
  gameover.addImage("gamefinish",gameover1);
  gameover.scale=0.5;
}

function draw() {
  background(220);
  
  
  if(gameState===PLAY){
  count=count+Math.round((getFrameRate()/20));
    if(keyDown("space")&&(trex.y>=161)) {
    trex.velocityY = -12;
  }
    ground.velocityX=-3;
    trex.velocityY = trex.velocityY + 0.8; 
    if (ground.x < 0){
    ground.x = ground.width/2;
  }
    spawnObstacles();
  spawnClouds();  
  
    if(ObstaclesGroup.isTouching(trex)){
     
      gameState=END;
   
    }   
    
    
 
      
  }
  else if(gameState===END){
  count=0;        
  trex.velocityY=0;
     trex.changeAnimation("trexstop",trex_collided);
   ground.velocityX=0;
    
  ObstaclesGroup.setVelocityXEach(0);  
   ObstaclesGroup.setLifetimeEach(-1);   
  CloudsGroup.setVelocityXEach(0);  
   CloudsGroup.setLifetimeEach(-1);   
  
       gameover.visible=true;
      restart.visible=true;
    
    if(mousePressedOver(restart)){
      reset();
      
  }
  
  
    //console.log(trex.y);
  
 

 
 
 
  }
     textSize(20);
  text("score:"+count,500,100); 
   trex.collide(invisibleGround);
   drawSprites();
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -6;
    ObstaclesGroup.add(obstacle);
  
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
   
    
    switch(rand){
    
      case 1: obstacle.addImage("obstacle" ,obstacle1); 
    break;
    case 2: obstacle.addImage("obstacle1" ,obstacle2); 
    break;
    case 3: obstacle.addImage("obstacle2" ,obstacle3); 
    break;
    case 4: obstacle.addImage("obstacle3" ,obstacle4);
   break;
   case 5: obstacle.addImage("obstacle4" ,obstacle5);
    break;
    case 6: obstacle.addImage("obstacle5" ,obstacle6);
    break;       
    default: break;    
    }
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
  }
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
   cloud.y = Math.round(random(80,120));
    cloud.addImage("cloud",cloudimage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    CloudsGroup.add(cloud);
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
  }
  
}


function reset() {
  
  CloudsGroup.destroyEach();
  ObstaclesGroup.destroyEach();
  trex.changeAnimation("trexrun",trex_running);
  count=0;
 gameState=PLAY; 
   
  gameover.visible=false;
  restart.visible=false; 
  
}