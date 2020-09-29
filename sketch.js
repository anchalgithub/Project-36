//Create variables here
var dog, happyDog;
var foodS, foodStock, database;
var feedPet, addFood;
var fedTime, lastFed;
var foodObj;
var changingGameState;
var readingGameState;
var bedroomImage, gardenImage, washroomImage;





function preload(){
//load images here
dog = loadImage("images/dogImg.png");
dog2 = loadImage("images/dogImg1.png");

bedroom = loadImage("images/Bed Room.png");
garden = loadImage("images/Garden.png");
washroom = loadImage("images/Wash Room.png");

  
}

function setup() {

database=firebase.database();

createCanvas(1000,400);

dog = createSprite(250,300,150,150);
dog.addImage(dog);
dog.scale=0.15

foodObj = new Food ();

foodStock=database.ref('Food');
foodStock.on("value", readStock);


feed = createButton("Feed the Dog")
button1.position (700,95);
feed.mousePressed(feedDog);

addFood = createButton("Add food for the dog")
button2.position(800,95);
addFood.mousePressed(addFoods);

readState=database.ref('gameState');
readState.on("value", function(data){
gameState=data.val();
});

fedTime =database.ref('FeedTime');
fedTime.on("value", function(data){
lastFed=data.val();
});


  
}


function draw() {  

  //resting method  and showing different game states in draw function.
  currentTime=hour ();
  if(currentTime==(lastFed+1)) {
  update("Playing");
  foodObj.garden();
  
  }else if(currentTime==(lastFed+2)){
  update("Sleeping");
  foodObj.bedroom();
  
  }else if (currentTime>(lastFed+2)&& currentTime<=(lastFed+4)) {
  update("Bathing");
  foodObj.washroom();
  
  }else{
  update("Hungry")
  foodObj,display();
  }


//name of the pet
text("Take Care of Marnie.", 190,200);
textSize(15);

text("Food Left :" +foodS,170,200);
textsize(13);


//hiding the food button
if(gameState!="Hungry"){
feed.hide();
addFood.hide();
dog.remove();
}else{
feed.show();
addFood.show();
dog.addImage(dog2);
}


  drawSprites();
 
}

function readStock(data){
foodS=data.val();
foodObj.updateFoodStock(foodS);
  }

//updating the foodStock according to the hour.
function feedDog(){
dog.addImage(dog1);

foodObj.updateFoodStock(foodObj.getFoodStock()-1);
database.ref('/').update({
Food:foodObj.getFoodStock(),
FeedTime:hour(),
gameState : "Hungry"

})
}

//updating the foods.
function addFoods(){
foodS++;
database.ref('/'),update({
Food:foodS
})
}

//updating function to add gamestates in database.
function update(state){
database.ref('/').update({
gameState:state
});
}

