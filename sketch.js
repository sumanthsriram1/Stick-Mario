var hero, bg ,heroImage ,ground ,platform
var gameState = "start"
var button, coinGroup, bricksGroup, coin
var score = 0
var deathSound
function preload()
{
	bgImage = loadImage("images/sunnyforest.jpg");
	heroImage = loadImage("images/stickman.png")
	heroJumpingImage = loadImage("images/stickmanjumping-removebg-preview.png")
	heroRunningImage = loadImage("images/stickmanrunning-removebg-preview.png")
	brickImage = loadImage("images/brownbrickwall.jpg")
	redBrickImage = loadImage("images/redbrickwall.jpg")
	colorBrickImage = loadImage("images/multicolorbrickwall.jpg")
	heroRunningLeftImage = loadImage("images/leftrunningstickman-removebg-preview.png")
	finishLineImage = loadImage("images/finishline-removebg-preview.png")
	coinImage = loadImage("images/goldCoin.png")
	deathSound = loadSound("364929__jofae__game-die.mp3") 
}

function setup() {
	createCanvas(800, 600);
	
	bg = createSprite(0,300,1000,600)
	bg.addImage("forest",bgImage);
	bg.velocityX = -4;
	bg.scale = 5;

	bricksGroup = new Group();
	
	hero = createSprite(50,520,20,20);
	hero.addImage("hero",heroImage);
	hero.addImage("heroJumping",heroJumpingImage);
	hero.addImage("heroRunning",heroRunningImage);
	hero.addImage("heroRunningLeft",heroRunningLeftImage);
	// hero.scale = 0.35;
	hero.debug = true;
	hero.setCollider("rectangle", 0, 0 , 260, 460);
	
	ground = createSprite(20,590,300,20);
	ground.visible = false;

	coinGroup = new Group();
	flagGroup = new Group();

	tutorialTitle = new Tutorial(400,300);
	
}


function draw() {
  background(bgImage);
  imageMode(CENTER);
  drawSprites();

  fill ("red");
  stroke("white");
  strokeWeight(4);
  textSize(20);
  text("Score: " + score,700,30)
  
 //--------------------------------------START STATE--------------------------------------------------
 if(gameState === "start"){
  tutorialTitle.display();
 }
 //--------------------------------------PLAY STATE--------------------------------------------------
 else if(gameState === "play"){
	hero.scale = 0.35;
	hero.collide(ground);
	hero.setCollider("rectangle", 0, 0 , 260, 460);
	//INFINITE BACKGROUND 
	if(bg.x<200){
	  bg.x = bg.width/2
	}

	// PLAYER CONTROLS 
	if(keyDown('space')){
		hero.velocityY = -10
		hero.changeImage("heroJumping")
	}
	else{
		hero.velocityY = hero.velocityY + 1
		hero.changeImage("hero")
	}
	if(keyDown(RIGHT_ARROW)){
		hero.velocityX = 10
		hero.changeImage("heroRunning")
		hero.setCollider("rectangle", 0, 0 , 260, 460);
		hero.scale = 0.35;
	}
	else if(keyDown(LEFT_ARROW)){
		hero.velocityX = -10
		hero.changeImage("heroRunningLeft")
		hero.scale = 2;
		hero.setCollider("rectangle", -40, 0, 50,100)
	}
	else{
		hero.velocityX = 0
		hero.changeImage(heroImage)
	}
	
	spawnPlatform();
	hero.collide(bricksGroup);
	camera.position.x = hero.x;
	
	//END CONDITION
	if(hero.position.y>600 || hero.position.y<0 || hero.position.x<0){
		gameState = "end";
		deathSound.play();
	}
    //SCORE
	if(hero.isTouching(coinGroup)){
		score += 5
		coinGroup[0].destroy()
	}
	//WIN CONDITION
	
	var flag = bg.width *2;
	var flagImage = createSprite(flag, 200);
	flagImage.addImage(finishLineImage)
	flagImage.scale = 0.7;
	flagImage.setCollider("rectangle", -100,0, 200,200)
	flagImage.debug = true;
	

	
	if(hero.collide(flagGroup)){
		gameState = "win";
	}
	flagPlatform = createSprite(flagImage.position.x-110,flagImage.position.y+175)
	flagPlatform.addImage(brickImage)
	flagPlatform.scale = 0.5
	
	flagPlatform2 = createSprite(flagPlatform.position.x+100,flagImage.position.y+175)
	flagPlatform2.addImage(brickImage)
	flagPlatform2.scale = 0.5

	flagPlatform3 = createSprite(flagPlatform2.position.x+110,flagImage.position.y+175)
	flagPlatform3.addImage(brickImage)
	flagPlatform3.scale = 0.5
	hero.collide(flagPlatform)
	hero.collide(flagPlatform2)
	hero.collide(flagPlatform3)

	flagGroup.add(flagImage)
	flagGroup.add(flagPlatform)
	flagGroup.add(flagPlatform2)
	flagGroup.add(flagPlatform3)
 }
 //--------------------------------------END STATE--------------------------------------------------
 else if (gameState == "end"){
	imageMode(CENTER)
	image(bgImage, 400, 300, 800,600)
	bg.destroy()
	swal ({
		title:"GAME OVER",
		imageUrl:"https://i.pinimg.com/originals/f9/59/5c/f9595cfe41f1b81ef95376ddbbd2c35e.gif",
		imageSize: "200x200",
		text:"You Died. Would you like to play again?", 
		confirmButtonText:"PLAY"
		
	},
	function (isConfirm){
      if(isConfirm){
		window.location.reload()
	  }
	}
	)
	coinGroup.destroyEach()
	flagGroup.destroyEach()
	bricksGroup.destroyEach()
	
 }
  
 //--------------------------------------WIN STATE--------------------------------------------------
 else if(gameState === "win"){
	
	bg.destroy();
	hero.destroy();
	coinGroup.destroyEach()
	bricksGroup.destroyEach()
	flagGroup.destroyEach();
	
	swal({
		title:"YOU WON",
		imageURL:"https://media.tenor.com/wGwD1kHjS4sAAAAM/you-win-8bit.gif",
		imageSize: "300x300" ,
		text: `You won and ended with   ${score}   points. ${"\n"}Would you like to play again?`,
		confirmButtonText:"PLAY"
	},
	function (isConfirm){
		if(isConfirm){
		  window.location.reload()
		}
	  })
 }
 
 
}

function spawnPlatform(){
	if(frameCount % 60 === 0){
		var platform = createSprite(800,random(300,600),random(100,200),random(20,40))
		platform.velocityX = -5
		//hero.collide(platform)
		coin = createSprite(platform.position.x,platform.position.y-90,90,20)
		coin.velocityX = -5
		coin.debug = true
		coin.addImage(coinImage)
		coin.scale = 0.09;
		coinGroup.add(coin)
		// platform.debug = true;
		var randomImages = Math.round(random(1,3))

		switch(randomImages){
         case 1:platform.addImage(brickImage);
		 platform.scale = 0.5
		 break
		 case 2:
			platform.addImage(redBrickImage)
			platform.scale = 0.45 
			break
		 case 3:platform.addImage(colorBrickImage)
			platform.scale = 0.55
		 	break
		}
		bricksGroup.add(platform);
	}
}

