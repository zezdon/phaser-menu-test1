//this game will have only 1 state
var GameState = {
  //load the game assets before the game starts
  preload: function() {
    this.game.load.image('background', 'assets/images/background.png');
    this.game.load.image('arrow', 'assets/images/arrow.png');
    this.game.load.image('pic1', 'assets/images/pic1.png');
    this.game.load.image('pic2', 'assets/images/pic2.png');
    this.game.load.image('pic3', 'assets/images/pic3.png');
    this.game.load.image('pic4', 'assets/images/pic4.png');
    
  },
  //executed after everything is loaded
  create: function() {
    
    //scaling options
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    
    //have the game centered horizontally
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    
    //create a sprite for the background
    this.background = this.game.add.sprite(0, 0, 'background')
    
    //group for animals
    var animalData = [
      {key: 'pic1', text: 'pic1'},
      {key: 'pic2', text: 'pic2'},
      {key: 'pic3', text: 'pic3'},
      {key: 'pic4', text: 'pic4'}
    ];

    //create a group to store all animals
    this.animals = this.game.add.group();

    var self = this;    
    var animal;
    animalData.forEach(function(element){
      //create each animal and save it's properties
      animal = self.animals.create(-1000, self.game.world.centerY, element.key, 0);

      //I'm saving everything that's not Phaser-related in an object
      animal.customParams = {text: element.key};

      //anchor point set to the center of the sprite
      animal.anchor.setTo(0.5);

      //enable input so we can touch it
      animal.inputEnabled = true;
      animal.input.pixelPerfectClick = true;
      animal.events.onInputDown.add(self.animateAnimal, self);
    });

    //place first animal in the middle
    this.currentAnimal = this.animals.next();
    this.currentAnimal.position.set(this.game.world.centerX, this.game.world.centerY);

    //left arrow
    this.leftArrow = this.game.add.sprite(60, this.game.world.centerY, 'arrow');
    this.leftArrow.anchor.setTo(0.5);
    this.leftArrow.scale.x = -1;
    this.leftArrow.customParams = {direction: -1};

    //left arrow user input
    this.leftArrow.inputEnabled = true;
    this.leftArrow.input.pixelPerfectClick = true;
    this.leftArrow.events.onInputDown.add(this.switchAnimal, this);

    //right arrow
    this.rightArrow = this.game.add.sprite(580, this.game.world.centerY, 'arrow');
    this.rightArrow.anchor.setTo(0.5);
    this.rightArrow.customParams = {direction: 1};

    //right arrow user input
    this.rightArrow.inputEnabled = true;
    this.rightArrow.input.pixelPerfectClick = true;
    this.rightArrow.events.onInputDown.add(this.switchAnimal, this);    

  },
  //this is executed multiple times per second
  update: function() {
  },
  //play animal animation
  animateAnimal: function(sprite, event) {
    console.log('animate..');
  },
  //switch animal
  switchAnimal: function(sprite, event) {

    //if an animation is taking place don't do anything
    if(this.isMoving) {
      return false;
    }

    this.isMoving = true;

    var newAnimal, endX;
    //according to the arrow they pressed, which animal comes in
    if(sprite.customParams.direction > 0) {
      newAnimal = this.animals.next();
      newAnimal.x = -newAnimal.width/2;
      endX = 640 + this.currentAnimal.width/2;
    }
    else {
      newAnimal = this.animals.previous();
      newAnimal.x = 640 + newAnimal.width/2;
      endX = -this.currentAnimal.width/2;
    }

    //tween animations, moving on x
    var newAnimalMovement = game.add.tween(newAnimal);
    newAnimalMovement.to({ x: this.game.world.centerX }, 1000);
    newAnimalMovement.onComplete.add(function(){
      this.isMoving = false;
    }, this);
    newAnimalMovement.start();

    var currentAnimalMovement = game.add.tween(this.currentAnimal);
    currentAnimalMovement.to({ x: endX }, 1000);
    currentAnimalMovement.start();

    this.currentAnimal = newAnimal;
  
  }
};

//initiate the Phaser framework
var game = new Phaser.Game(640, 360, Phaser.AUTO);

game.state.add('GameState', GameState);
game.state.start('GameState');