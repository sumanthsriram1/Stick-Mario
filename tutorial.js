class Tutorial{
    constructor(x,y){
        
        this.tutorialButton = createButton("INFO")
        this.tutorialButton.position(x,y)
        this.tutorialButton.class("customButton")
        this.goal = createElement('h2')
        this.instruction = createElement('h2');
        this.title = createElement("h1");
        this.title.html("STICK MARIO")
        this.title.position(330, 30);
        this.title.class("gameTitle");
        this.playButton = createButton("PLAY")
        this.playButton.position(x,y-80)
        this.playButton.class("customButton")
    } 

    display(){
        imageMode(CENTER)
        image(bgImage, 400, 300, 800,600)
        this.tutorialButton.mousePressed(()=>{
            this.tutorialButton.hide()
            var goal = "The goal of the game is to get the stick man to the finish line across the obstacles and collect as many coins as you can."
            this.goal.position(200, 140);
            this.goal.html(goal);
            this.goal.class("leadersText")
            var instruction = "Press SPACE to jump, and use the right and left arrow keys to move across the obstacles. Good Luck!";
            this.instruction.position(200,260)
            this.instruction.html(instruction)
            this.instruction.class("leadersText")
            
        })

        this.playButton.mousePressed(()=>{
            this.tutorialButton.hide()
            this.playButton.hide()
            gameState = "play";
            this.goal.hide() 
            this.instruction.hide()
        })
        
      
    }
}