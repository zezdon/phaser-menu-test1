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
    
    this.animals = this.game.add.group();

    var self = this;

    animalData.forEach(function(element){
      self.animals.create(200, self.game.world.centerY, element.key);
    });

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
    console.log('move animal');
  }
  

};

//initiate the Phaser framework
var game = new Phaser.Game(640, 360, Phaser.AUTO);

game.state.add('GameState', GameState);
game.state.start('GameState');