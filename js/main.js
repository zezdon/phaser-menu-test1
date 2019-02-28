//this game will have only 1 state
var GameState = {
  //load the game assets before the game starts
  preload: function() {
    this.load.image('background', 'assets/images/background.png');
    this.load.image('pic1', 'assets/images/pic1.png');
    this.load.image('pic2', 'assets/images/pic2.png');
    this.load.image('pic3', 'assets/images/pic3.png');
    this.load.image('pic4', 'assets/images/pic4.png');
    
  },
  //executed after everything is loaded
  create: function() {
    
    //create a sprite for the background
    this.background = this.game.add.sprite(0, 0, 'background');
    
    //center of the world
    this.pic1 = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'pic1');
    
    //place a sprite by it's center, not the top-left corner
    this.pic1.anchor.setTo(0.5, 0.5); // or just this.chicken.anchor.setTo(0.5)

  },
  //this is executed multiple times per second
  update: function() {
  },
  

};

//initiate the Phaser framework
var game = new Phaser.Game(640, 360, Phaser.AUTO);

game.state.add('GameState', GameState);
game.state.start('GameState');