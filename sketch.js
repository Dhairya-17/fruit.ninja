//Game States
var PLAY=1;
var END=0;
var gameState=1;

var knife;
var knifeImage ;

var fruit1,fruit2,fruit3,fruit4,fruitsGroup;
var monster,monsterAnimation,monstersGroup;

var swooshsound;

var gameover,gameoverImg,gameoversound;

var position;
 

function preload(){
  
  knifeImage = loadImage("knife.png");
  
  fruit1 = loadImage("fruit1.png")
  fruit2 = loadImage("fruit2.png")
  fruit3 = loadImage("fruit3.png")
  fruit4 = loadImage("fruit4.png")
  
  monsterAnimation=loadAnimation("alien1.png","alien2.png")
  
  swooshsound=loadSound("knifeSwoosh.mp3")
  
  gameoverImg=loadImage("gameover.png")
  
  gameoversound=loadSound("gameover.mp3")
}



function setup() {
  createCanvas(400,400);
  
  //creating sword
   knife=createSprite(40,200,20,20);
   knife.addImage(knifeImage);
   knife.scale=0.7
  
  
  //set collider for sword
  knife.setCollider("rectangle",0,0,40,40);

  score=0;
  //create fruit and monster Group variable here
 fruitsGroup = createGroup();
  monstersGroup = createGroup();
 fruitsGroup.debug=true;

}

function draw() {
  background("lightblue");
  console.log(fruitsGroup.x)
  if(gameState===PLAY){
    
    //calling fruit and monster function
    Spawnmonster();
   spawnfruits();
    // Move knife with mouse
    knife.y=World.mouseY;
    knife.x=World.mouseX;
  
    // Increase score if knife touching fruit
   if(knife.isTouching(fruitsGroup)){
score=score+2;
     fruits.destroy();
     swooshsound.play();
   }
    // Go to end state if knife touching enemy
      if(knife.isTouching(monstersGroup)){
 gameState=END;
        gameoversound.play();
        
      }
    
  }
  else if(gameState===END){
  
    knife.addImage(gameoverImg)
   knife.scale=1.5
    knife.x=200;
    knife.y=200;
    
    
   // fruitsGroup.destroyEach();
    monstersGroup.destroyEach();
    /*fruitsGroup.setVelocityXEach(0);
    monstersGroup.setVelocityXEach(0);
    
    fruitsGroup.setLifetimeEach(-1);
    monstersGroup.setLifetimeEach(-1);  */
    
    
  }
  
   
  drawSprites();
  
  //Display score
  textSize(25);
  text("Score : "+ score,200,20);
}
 function spawnfruits(){
   
 if (frameCount % 60 === 0){
     fruits = createSprite(600,165,10,40);
  
   
  
   
    //generate random obstacles
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: fruits.addImage(fruit1);
              break;
      case 2:fruits.addImage(fruit2);
              break;
      case 3: fruits.addImage(fruit3);
              break;
      case 4: fruits.addImage(fruit4);
              break;
      
      default: break;
    }
   fruits.scale=0.2;
   fruits.y=Math.round(random(50,340));
   fruits.velocityX = -(4 + score/100);
   fruits.setLifetime=100;
    position = Math.round(random(1,2));
  
   if(position===1){
     fruits.x=400;
     //fruits.velocityX=7;
   }
   if(position===2){
     fruits.x=0;
     fruits.velocityX=5+score/100;
   }
  fruitsGroup.add(fruits);
    
 }
 
 }

function Spawnmonster(){
 if (frameCount % 250 === 0){
  monster=createSprite(40,200,20,20);
  monster.addAnimation("alien",monsterAnimation);
  monster.y=Math.round(random(50,340));
   monster.velocityX = -(4 + score/100)
   
    var position = Math.round(random(1,2));
  
   if(position===1){
     monster.x=400;
     //fruits.velocityX=7;
   }
   if(position===2){
     monster.x=0;
     monster.velocityX=5+score/100;
   }
   
   monstersGroup.add(monster);
   monster.setLifetime=100;
}
}