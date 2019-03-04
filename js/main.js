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

    this.load.audio('chickenSound', ['assets/audio/chicken.ogg', 'assets/audio/chicken.mp3']);
    this.load.audio('horseSound', ['assets/audio/horse.ogg', 'assets/audio/horse.mp3']);
    this.load.audio('pigSound', ['assets/audio/pig.ogg', 'assets/audio/pig.mp3']);
    this.load.audio('sheepSound', ['assets/audio/sheep.ogg', 'assets/audio/sheep.mp3']);
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
    
    //group for pictures
    var pictureData = [
      {key: 'pic1', text: 'Film Roll', audio: 'chickenSound'},
      {key: 'pic2', text: 'Meter', audio: 'horseSound'},
      {key: 'pic3', text: 'Frame', audio: 'pigSound'},
      {key: 'pic4', text: 'Screw-nut', audio: 'sheepSound'}
    ];

    //create a group to store all pictures
    this.pictures = this.game.add.group();

    var self = this;    
    var picObj;
    pictureData.forEach(function(element){
      //create each picObj and save it's properties
      picObj = self.pictures.create(-1000, self.game.world.centerY, element.key, 0);

      //I'm saving everything that's not Phaser-related in an object
      picObj.customParams = {text: element.text, sound: self.game.add.audio(element.audio)};

      //anchor point set to the center of the sprite
      picObj.anchor.setTo(0.5);

      //create picObj animation
      picObj.animations.add('animate', [0, 1, 2, 1, 0, 1], 3, false);

      //enable input so we can touch it
      picObj.inputEnabled = true;
      picObj.input.pixelPerfectClick = true;
      picObj.events.onInputDown.add(self.animatePicture, self);
    });

    //place first picObj in the middle
    this.currentPicture = this.pictures.next();
    this.currentPicture.position.set(this.game.world.centerX, this.game.world.centerY);

    //show picObj text
    this.showText(this.currentPicture);

    //left arrow
    this.leftArrow = this.game.add.sprite(60, this.game.world.centerY, 'arrow');
    this.leftArrow.anchor.setTo(0.5);
    this.leftArrow.scale.x = -1;
    this.leftArrow.customParams = {direction: -1};

    //left arrow user input
    this.leftArrow.inputEnabled = true;
    this.leftArrow.input.pixelPerfectClick = true;
    this.leftArrow.events.onInputDown.add(this.switchPicture, this);

    //right arrow
    this.rightArrow = this.game.add.sprite(580, this.game.world.centerY, 'arrow');
    this.rightArrow.anchor.setTo(0.5);
    this.rightArrow.customParams = {direction: 1};

    //right arrow user input
    this.rightArrow.inputEnabled = true;
    this.rightArrow.input.pixelPerfectClick = true;
    this.rightArrow.events.onInputDown.add(this.switchPicture, this);    

  },
  //this is executed multiple times per second
  update: function() {
    //this.pictures.addAll('angle', 2);
  },
  //play picObj animation and sound
  animatePicture: function(sprite, event) {
    sprite.play('animate');
    sprite.customParams.sound.play();
  },
  //switch picObj
  switchPicture: function(sprite, event) {

    //if an animation is taking place don't do anything
    if(this.isMoving) {
      return false;
    }

    this.isMoving = true;

    //hide text
    this.pictureText.visible = false;

    var newPicture, endX;
    //according to the arrow they pressed, which picObj comes in
    if(sprite.customParams.direction > 0) {
      newPicture = this.pictures.next();
      newPicture.x = -newPicture.width/2;
      endX = 640 + this.currentPicture.width/2;
    }
    else {
      newPicture = this.pictures.previous();
      newPicture.x = 640 + newPicture.width/2;
      endX = -this.currentPicture.width/2;
    }

    //tween animations, moving on x
    var newPictureMovement = this.game.add.tween(newPicture);
    newPictureMovement.to({ x: this.game.world.centerX }, 1000);
    newPictureMovement.onComplete.add(function()
      {
        this.isMoving = false;
        this.showText(newPicture);
      }, this);
    newPictureMovement.start();

    var currentPictureMovement = this.game.add.tween(this.currentPicture);
    currentPictureMovement.to({ x: endX }, 1000);
    currentPictureMovement.start();

    this.currentPicture = newPicture;
  },
  showText: function(picObj) {
    if(!this.pictureText) {
      var style = {
        font: 'bold 30pt Arial',
        fill: '#D0171B',
        align: 'center'
      }
      this.pictureText = this.game.add.text(this.game.width/2, this.game.height * 0.85, '', style);
      this.pictureText.anchor.setTo(0.5);
    }

    this.pictureText.setText(picObj.customParams.text);
    this.pictureText.visible = true;
  }

};

//initiate the Phaser framework
var game = new Phaser.Game(640, 360, Phaser.AUTO);

game.state.add('GameState', GameState);
game.state.start('GameState');