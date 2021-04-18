var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood ,feed;
var foodObj,lastfeed;

//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
   feed=createButton("Feed dog");
   feed.position(600,95)
   feed.mousePressed(feedDog);
  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  feedTime=database.ref("Feedtime");
  feedTime.on("value",function(data){
    lastfeed=data.val();
  })
 
  //write code to display text lastFed time here
  fill("pink")
   if(lastfeed>12){

     text("last feed : "+lastfeed%12+"pm",300,30)
   }
   else if (lastfeed===0){
     text("last feed : 12am",300,30)
   }
   else{
     text("last feed : "+lastfeed+"am",300,30)
   }
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
  foodS--;
  database.ref('/').update({
    Food:foodS,Feedtime:hour()
  })
  //write code here to update food stock and last fed time


}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
