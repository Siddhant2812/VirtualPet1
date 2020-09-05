var dog,dogImg, happyDog, database, foodS, foodStock;


function preload(){
  dogImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);

  database = firebase.database();

  dog = createSprite(400,400,20,20);
  dog.addImage(dogImg);
  dog.scale = 0.2;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() { 
  background(46,139,87); 

  if(keyWentDown("D")){
    dog.addImage(happyDog);
    writeStock(foodS);
  }

  if(keyWentUp("D")){
    dog.addImage(dogImg);
  }

  if(keyDown("R")&&foodS<=0){
    foodS = 20;
  }

  ///console.log(foodS);

  //keyPressed();
  drawSprites();
  textSize(20);
  fill(255,255,255)

  if(foodS!==undefined){
  text("Food:"+foodS,100,400);
  }
}

function readStock(data) {
	foodS = data.val();
}

function writeStock(x){

  if(x<=0){
    x = 0;
  }
  else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}
