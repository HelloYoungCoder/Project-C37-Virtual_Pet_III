// Project 37: Virtual Pet - III

//Create variables here
var database;
var dog, happyDog, foodS, foodStock;
var dogImg, happyDogImg;
var bedRoomImg, gardenImg, livingRoomImg, washRoomImg;

//To create buttons
var feedPet, addFood;

//To access food class
var foodObj;

//Feeding status
var fedTime, lastFed, currentTime;

//Game states
var gameState, readState;

//Load images for dog
function preload()
{
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/happyDogImg.png");
  bedRoomImg = loadImage("images/bedRoomImg.png");
  gardenImg = loadImage("images/gardenImg.png");
  livingRoomImg = loadImage("images/livingRoomImg.png");
  washRoomImg = loadImage("images/washRoomImg.png");
}

function setup() {
  createCanvas(700, 500);
  
  //Configure database
  database = firebase.database();

  //Create dog sprite
  dog = createSprite(350, 300);
  dog.addImage(dogImg);
  dog.scale = 0.25;

  //Ref: a specific location in your Database & used it for reading or writing data to that Database location.
  foodStock = database.ref("food");
  foodStock.on("value", readStock);

  //DOM
  var title = createElement('h2');
  title.html("VIRTUAL PET - III");
  title.position(280, 70);

  feedFood = createButton("Click Here to Feed");
  feedFood.position(70, 150);
  feedFood.mousePressed(feedDog);
  feedFood.mouseReleased(changeImg);

  addFood = createButton("Click Here to Add Food");
  addFood.position(430, 150);
  addFood.mousePressed(addFoods);

  //To access food class
  foodObj = new Food();

  //To access the feed time
  fedTime = database.ref('feed_time');
  fedTime.on("value", function(data){
    lastFed = data.val();
  });

  //To read game state
  readState = database.ref('gameState');
  readState.on("value", function(data){
    gameState = data.val();
  });

}


function draw() {  

  background(106, 118, 138);

  drawSprites();

  textSize(15);
  fill("cream");
  textFont("Trebuchet MS");
  
  //To change the environment based on the current time
  currentTime = hour();
  console.log(currentTime);

  if (currentTime === (lastFed + 1)) {
    update("Play");
    foodObj.play();
  } else if (currentTime === (lastFed + 2)) {
    update("Sleepy");
    foodObj.sleepy();
  } else if (currentTime > (lastFed + 2) && currentTime <= (lastFed + 4)) {
    update("Bath");
    foodObj.bath();
  } else {
    update("Hungry");
    foodObj.display();
  }

  //Display elements based on the states
  if (gameState !== "Hungry") {
    feedFood.hide();
    addFood.hide();
    dog.remove();
  } else {
    feedFood.show();
    addFood.show();
    dog.addImage(dogImg);
  }
  
}

//To read the food stock
function readStock(data) {
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

//To add food in stock
function addFoods() {
  foodS++;
  database.ref('/').update({
    'food': foodS
  })
}

//To update food stock & last fed time
function feedDog() {
  dog.addImage(happyDogImg);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    'food': foodObj.getFoodStock(),
    'feed_time': hour(),
    'gameState': "Hungry"
  });
}

//To change the dog image
function changeImg() {
  dog.addImage(dogImg);
}

//To update game state
function update(state) {
  database.ref('/').update({
    'gameState': state
  })
}
