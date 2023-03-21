  //Our game is made of frames.For each frame, spawn clouds are called. 
  //Since spawn clouds is been called from the draw function,we are getting 
  //sequence of clouds all joined together.Every time spawn cloud iscalled ,a new cloud is created.
  // We want a cloud to be generated after every frame count.
  //colliderRadius can be circle or a rectangle.
  //It has 4 arguements.
  //1.The 1st arguement of the colliderRadius is a type(circle or rectangle) 
  //2.x-offset(it tells how far we want the centre of the collider on the x axis from the centre of the trex anmation)
  //3.y-offset(it tells how far we want the centre of the collider on the y axis from the centre of the trex anmation)
  //4.to set the radius of the trex(sprite)
var trex ,trex_running,ground,cloud,obsImg1,obsImg2,obsImg3,obsImg4,obsImg5,obsImg6,obstacle;
var score=0,PLAY=1,END=0,gameState=PLAY,obstacleGroup,cloudGroup,trex_collided,gameOverImg;
var gameOver,restartImg,restart,jumpSound,dieSound,checkpointSound;
function preload(){
  trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided=loadAnimation("trex_collided.png");

  groundImage=loadImage("ground2.png");
  cloudImage=loadImage("cloud.png");

  obsImg1=loadImage("obstacle1.png");
  obsImg2=loadImage("obstacle2.png");
  obsImg3=loadImage("obstacle3.png");
  obsImg4=loadImage("obstacle4.png");
  obsImg5=loadImage("obstacle5.png");
  obsImg6=loadImage("obstacle6.png");
 
  gameOverImg=loadImage("gameOver.png");
  restartImg=loadImage("restart.png");

  jumpSound=loadSound("jump.mp3");
  dieSound=loadSound("die.mp3");
  dieSound=loadSound("die.mp3");
  checkpointSound=loadSound("checkpoint.mp3");
}

function setup(){
  createCanvas(600,200);

  trex = createSprite(50,132,50,50);
  trex.addAnimation("running",trex_running);  //"running" is the label for the trex animation
  trex.addAnimation("collided",trex_collided);
  trex.scale=0.5;

  ground=createSprite(300,180,600,20);//create a trex sprite
  ground.addImage(groundImage);
  

  invisibleGround=createSprite(300,190,600,20);
  invisibleGround.visible=false;

  obstacleGroup=new Group();
  cloudGroup=new Group();

  trex.setCollider("circle",0,0,40);
  trex.debug=false;

  gameOver=createSprite(300,80,50,50);
  gameOver.addImage(gameOverImg);
  gameOver.visible=false;
  gameOver.scale=0.8;

  restart=createSprite(300,100);
  restart.addImage(restartImg);
  restart.scale=0.4;
  restart.visible=false;

  console.log("hello "+"world");
}

function draw(){
  background("white");


 
  if(gameState==PLAY)
  {
    ground.velocityX=-3;
    trex.changeAnimation("running",trex_running);
    text("SCORE: "+score,500,20);
    score=score+Math.round(frameCount/60);
    if(score>0 && score%100==0){
      checkpointSound.play();
    }
    if(keyDown("space") && trex.y>=100)                       
   {
    trex.velocityY=-10;
    jumpSound.play();
   }

   trex.velocityY=trex.velocityY+0.8;

   if(ground.x<0)
    {
    ground.x=ground.width/2;
    }

    trex.collide(invisibleGround);

    spawnClouds(); 
    spawnObstacles();
    if(obstacleGroup.isTouching(trex))
    {
      gameState=END;
      dieSound.play();
    }
    
  }

  if(gameState==END)
  {
    ground.velocityX=0;
    obstacleGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    trex.changeAnimation("collided",trex_collided);
    trex.velocityY=0;
    obstacleGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);
    gameOver.visible=true;
    restart.visible=true;
  }

  if(mousePressedOver(restart))
  {
     reset();
     
  }

  drawSprites();
}//end of draw

function spawnClouds()
{
  if(frameCount%60==0)  //% is known as modulus operator
  {
  cloud=createSprite(550,50,50,50);  //cloud.velocityX=-3
  cloud.addImage(cloudImage);
  cloud.y=Math.round(random(10,60));
  cloud.velocityX=-3;
  cloud.scale=0.9;
  cloud.depth=trex.depth;
  trex.depth=trex.depth+1;
  console.log(trex.depth);
  console.log(cloud.depth);
  cloud.lifetime=250;

  cloudGroup.add(cloud);
  
}
  
 
}

function spawnObstacles()
{
  if(frameCount%60==0)
  {
  obstacle=createSprite(600,165,20,40);
   var rand=Math.round(random(1,6))
  switch(rand) 
  {
    case 1:obstacle.addImage(obsImg1);
          break;
    case 2:obstacle.addImage(obsImg2);
          break;
    case 3:obstacle.addImage(obsImg3);
          break;
    case 4:obstacle.addImage(obsImg4);
          break;
    case 5:obstacle.addImage(obsImg5);
          break;
    case 6:obstacle.addImage(obsImg6);
          break;
    default:break;
  }
  
  obstacle.velocityX=-3;
  obstacle.scale=0.5;
  obstacle.lifetime=300;
  obstacleGroup.add(obstacle);
  }
 

}

function reset(){
  gameState=PLAY;
  gameOver.visible=false;
  restart.visible=false;
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
  score=0;

}



