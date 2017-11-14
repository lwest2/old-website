BasicGame.Game = function (game) {

	//	When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;		//	a reference to the currently running game
    this.add;		//	used to add sprites, text, groups, etc
    this.camera;	//	a reference to the game camera
    this.cache;		//	the game cache
    this.input;		//	the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
    this.load;		//	for preloading assets
    this.math;		//	lots of useful common math operations
    this.sound;		//	the sound manager - add a sound, play one, set-up markers, etc
    this.stage;		//	the game stage
    this.time;		//	the clock
    this.tweens;    //  the tween manager
    this.state;	    //	the state manager
    this.world;		//	the game world
    this.particles;	//	the particle manager
    this.physics;	//	the physics manager
    this.rnd;		//	the repeatable random number generator
    this.map;   // the map attribute
    this.layer;   // local layer
    this.player;  // player
    this.enemy;   // enemy AI
    this.tween;   // enemy path
    this.RandomDataGenerator; // random numbers
    var timer; // timer variable
    this.coin1Bool = true; // coin boolean
    this.coin2Bool = true; // coin boolean
    this.coin3Bool = true; // coin boolean
    this.music; // music
    var checkpoint; // checkpoint variable
};


BasicGame.Game.prototype = {


	create: function () {
    console.log("Creating game state!");
    this.stage.backgroundColor = '#282828'; //stage background set
    this.physics.startSystem(Phaser.Physics.ARCADE);
    map = this.add.tilemap('level'); //populate map attribute with the tilemap with the key 'level'

    map.addTilesetImage('terrain', 'level_tiles'); //assign the 'level_tiles' tileset to the tilemap data
    layer = map.createLayer('terrain'); //populate the local layer with combined level data
    layer.resizeWorld(); //resize gameworld to fit level data
    map.setCollision([1,2,3,4,5,6,10,11,12,16,17,18,19,20,21], true); // collision instances

    //logo creation
    logo = this.game.add.sprite(0,-250, 'logo');
    this.game.input.onDown.add(removeLogo, this); // remove logo on press
    this.game.paused = true; // game is paused

    function removeLogo() {
      this.game.input.onDown.remove(removeLogo, this); // call until logo is removed
      logo.kill(); // kill logo
      this.game.paused = false; // game is unpaused
}


    //music
    // if there is no music or there is no music playing
    if (!this.music || !this.music.isPlaying) {
      this.music = this.game.add.audio('music');  // add music
      this.music.onDecoded.add(startMusic, this); // start music
    }

    function startMusic() {
      // fade in music over 4 seconds
      this.music.fadeIn(4000);
    }
    // create player sprite
    this.player = this.add.sprite(450,130,'player');
    //  Enable Arcade Physics
    this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
    //  rotation
    this.player.body.allowRotation = false;
    // anchor point
    this.player.anchor.setTo(0.5, 0.5);
    // acceleration
    this.player.body.acceleration.x= 2;
    // max velocity
    this.player.body.maxVelocity.x = 325;
    this.player.body.maxVelocity.y = 325;

    // create enemy method

    this.time.events.repeat(Phaser.Timer.SECOND * 6, 9999999, createEnemy, this);

    function createEnemy() {
      var bombTimer = Math.floor(Math.random() * 4) + 1;
      if (lapped >= 1)
      {
      // random selection between where to place the bomb
      var randomPicker = Math.floor(Math.random() * 4) + 1;
      // create enemy depending on random number
      if (randomPicker == 1)
      {
      this.enemy = this.add.sprite(this.game.rnd.between(40,920), this.game.rnd.between(40,185),  'enemy');
      // creation of timer
      this.game.time.events.add(Phaser.Timer.SECOND * bombTimer, explosion, this);
      }
      else if (randomPicker == 2)
      {
      this.enemy = this.add.sprite(this.game.rnd.between(40,920), this.game.rnd.between(455,595),  'enemy');
      // creation of timer
      this.game.time.events.add(Phaser.Timer.SECOND * bombTimer, explosion, this);
      }
      else if (randomPicker == 3)
      {
      this.enemy = this.add.sprite(this.game.rnd.between(40,185), this.game.rnd.between(197,435),  'enemy');
      // creation of timer
      this.game.time.events.add(Phaser.Timer.SECOND * bombTimer, explosion, this);
      }
      else if (randomPicker == 4)
      {
      this.enemy = this.add.sprite(this.game.rnd.between(774,920), this.game.rnd.between(195,435),  'enemy');
      // creation of timer
      this.game.time.events.add(Phaser.Timer.SECOND * bombTimer, explosion, this);
      }
      }
      // random selection between where to place the bomb for movingEnemy
      if (lapped >= 2)
      {
      var randomPickerMoving = Math.floor(Math.random() * 4) + 1;
      bombTimer = Math.floor(Math.random() * 4) + 1;
      this.max = 150;
      this.min = -150;
      this.velocityX = Math.random()*(this.max - this.min+1) - this.min;


      // create enemy depending on random number
      if (randomPickerMoving == 1)
      {
      this.movingEnemy = this.add.sprite(this.game.rnd.between(50,915), this.game.rnd.between(45,175),  'movingEnemy');
      // random movement
      this.game.physics.enable(this.movingEnemy, Phaser.Physics.ARCADE);
      this.movingEnemy.body.immovable = true;
      this.movingEnemy.body.bounce.setTo(1, 1);
      this.movingEnemy.body.velocity.x = this.velocityY;
      this.movingEnemy.body.velocity.y = this.velocityX;
      // creation of timer
      this.game.time.events.add(Phaser.Timer.SECOND * bombTimer, explosionMoving, this);
      }
      else if (randomPickerMoving == 2)
      {
      this.movingEnemy = this.add.sprite(this.game.rnd.between(50,915), this.game.rnd.between(460,580),  'movingEnemy');
      // random movement
      this.game.physics.enable(this.movingEnemy, Phaser.Physics.ARCADE);
      this.movingEnemy.body.immovable = true;
      this.movingEnemy.body.bounce.setTo(1, 1);
      this.movingEnemy.body.velocity.x = this.velocityY;
      this.movingEnemy.body.velocity.y = this.velocityX;
      // creation of timer
      this.game.time.events.add(Phaser.Timer.SECOND * bombTimer, explosionMoving, this);
      }
      else if (randomPickerMoving == 3)
      {
      this.movingEnemy = this.add.sprite(this.game.rnd.between(50,175), this.game.rnd.between(210,420),  'movingEnemy');
      // random movement
      this.game.physics.enable(this.movingEnemy, Phaser.Physics.ARCADE);
      this.movingEnemy.body.immovable = true;
      this.movingEnemy.body.bounce.setTo(1, 1);
      this.movingEnemy.body.velocity.x = this.velocityY;
      this.movingEnemy.body.velocity.y = this.velocityX;
      // creation of timer
      this.game.time.events.add(Phaser.Timer.SECOND * bombTimer, explosionMoving, this);
      }
      else if (randomPickerMoving == 4)
      {
      this.movingEnemy = this.add.sprite(this.game.rnd.between(800,915), this.game.rnd.between(210,420),  'movingEnemy');
      // random movement
      this.game.physics.enable(this.movingEnemy, Phaser.Physics.ARCADE);
      this.movingEnemy.body.immovable = true;
      this.movingEnemy.body.bounce.setTo(1, 1);
      this.movingEnemy.body.velocity.x = this.velocityY;
      this.movingEnemy.body.velocity.y = this.velocityX;
      // creation of timer
      this.game.time.events.add(Phaser.Timer.SECOND * bombTimer, explosionMoving, this);
    }
    }
  }
    // explosion method
    function explosion() {
      // kills enemy sprite and replaces it with explosion sprite
      this.explosion = this.add.sprite(this.enemy.x - 32, this.enemy.y - 32, 'explosion');
      this.game.physics.enable(this.explosion, Phaser.Physics.ARCADE);
      this.game.time.events.add(Phaser.Timer.SECOND * 1, killEnemy, this);
    }
    // killEnemy method
    function killEnemy() {
      // kills enemy/explosion
      this.explosion.kill();
      this.enemy.kill();
    }

    // explosionMoving method
    function explosionMoving() {
      this.movingEnemy.kill();
      this.movingExplosion = this.add.sprite(this.movingEnemy.x - 32, this.movingEnemy.y - 32, 'movingExplosion');
      this.game.physics.enable(this.movingExplosion, Phaser.Physics.ARCADE);
      this.game.time.events.add(Phaser.Timer.SECOND * 1, killMovingEnemy, this);
    }

    // killMovingEnemy method
    function killMovingEnemy() {
      this.movingEnemy.kill();
      this.movingExplosion.kill();
    }

    // timer
    timer = this.game.time.create(false);
    timer.loop(50000, gameOver, this)
    timer.start();

    function gameOver() {
      // destroy everything
    timer.destroy();
    this.player.kill();
    this.enemy.kill();
    this.coin.kill();
    this.coin1.kill();
    this.coin2.kill();
    this.time.events.destroy();
    }


      // create coins
      this.coin = this.add.sprite(this.game.rnd.between(40,920), this.game.rnd.between(455,585), 'coin');
      this.coin1 = this.add.sprite(this.game.rnd.between(40,180), this.game.rnd.between(200,430), 'coin1');
      this.coin2 = this.add.sprite(this.game.rnd.between(790,920), this.game.rnd.between(200,430), 'coin2');
      this.game.physics.enable(this.coin, Phaser.Physics.ARCADE);
      this.game.physics.enable(this.coin1, Phaser.Physics.ARCADE);
      this.game.physics.enable(this.coin2, Phaser.Physics.ARCADE);
      this.coinBool = true;
      this.coin1Bool = true;
      this.coin2Bool = true;

          map.setTileIndexCallback([8], lap, this); // if over tile 8

    function lap(spriteTriggered) {
      // if tile 8 triggered by player
      if(spriteTriggered === this.player)
      {
        // if there are no coins
        if (this.coin1Bool == false && this.coin2Bool == false && this.coinBool == false)
        {
          // if checkpoint is equal to 3
          if (checkpoint == 3)
          {
            // add coins
          this.coin = this.add.sprite(this.game.rnd.between(40,920), this.game.rnd.between(455,585), 'coin');
          this.coin1 = this.add.sprite(this.game.rnd.between(40,180), this.game.rnd.between(200,430), 'coin1');
          this.coin2 = this.add.sprite(this.game.rnd.between(790,920), this.game.rnd.between(200,430), 'coin2');
          this.game.physics.enable(this.coin, Phaser.Physics.ARCADE);
          this.game.physics.enable(this.coin1, Phaser.Physics.ARCADE);
          this.game.physics.enable(this.coin2, Phaser.Physics.ARCADE);
          this.coinBool = true;
          this.coin1Bool = true;
          this.coin2Bool = true;
          // add 1 lap
          lapped += 1;
          // change text
          text.setText('Lap: ' + lapped);
        }
        }
      }
    }
        var text; // variable for text
        var lapped = 1; // variable for laps
        text = this.game.add.text(this.game.world.centerX - 35, this.game.world.centerY - 50, 'Lap: ' + lapped,  {
          font: "20px Arial",
          fill: "#ffffff",
          align: "center"
        });

        this.game.add.text(this.game.world.centerX - 220, this.game.world.centerY + 20, 'R - Restart, P - Pause/Resume, M - Mute/Unmute',  {
          font: "20px Arial",
          fill: "#ffffff",
          align: "center"
        });
        // direction arrows text
        arrow = this.game.add.text(this.game.world.centerX -45, this.game.world.centerY - 90, '>>>>>');

        // checkpoints tiles
        map.setTileIndexCallback([14,15], checkpoint1, this);
        map.setTileIndexCallback([22,24], checkpoint2, this);
        map.setTileIndexCallback([13], checkpoint3, this);

        // if sprite triggered is player
        function checkpoint1(spriteTriggered)
        {
          if (spriteTriggered === this.player)
          {
            console.log('checkpoint1');
            // change checkpoint variable
            checkpoint = 1;
          }
        }

        function checkpoint2(spriteTriggered)
        {
          if(spriteTriggered === this.player)
          {
            console.log('checkpoint2');
            checkpoint = 2;
          }
        }

        function checkpoint3(spriteTriggered)
        {
          if (spriteTriggered === this.player)
          {
            console.log('checkpoint3');
            checkpoint = 3;
          }
        }
  },








	update: function () {

   this.physics.arcade.collide(this.player, layer); // makes player collide with tiles
   this.physics.arcade.overlap(this.player, this.explosion, deathHandler, null, this); // makes player collide with bomb
   this.physics.arcade.collide(this.movingEnemy, layer);  // moving enemy collides with tiles
   this.physics.arcade.overlap(this.player, this.movingExplosion, deathHandlerMoving, null, this);  // player collides with explosion
   this.physics.arcade.collide(this.player, this.coin, coinHandler, null, this);  // player collides with coins
   this.physics.arcade.collide(this.player, this.coin1, coin1Handler, null, this);  // player collides with coins
   this.physics.arcade.collide(this.player, this.coin2, coin2Handler, null, this);  // player collide with coins
   this.physics.arcade.collide(this.player, this.movingEnemy, deathHandler1Moving, null, this); // player collides with enemy

   // coin handler
   function coin1Handler() {
      this.coin1.kill();  // kills coin
      this.coin1Bool = false; // set boolean to false
   }

   function coin2Handler() {
      this.coin2.kill();
      this.coin2Bool = false;
   }

   function coinHandler() {
      this.coin.kill();
      this.coinBool = false;
   }

// kill events
   function deathHandler() {
        this.player.kill();
        this.explosion.kill();
        this.enemy.kill();
        timer.destroy();
        this.coin.kill();
        this.coin1.kill();
        this.coin2.kill();
        this.music.destroy();
   }

   function deathHandlerMoving() {
        this.movingEnemy.kill();
        this.player.kill();
        this.movingExplosion.kill();
        timer.destroy();
        this.coin.kill();
        this.coin1.kill();
        this.coin2.kill();
        this.music.destroy();
   }

   function deathHandler1Moving() {
        this.movingEnemy.kill();
        this.player.kill();
        timer.destroy();
        this.coin.kill();
        this.coin1.kill();
        this.coin2.kill();
        this.music.destroy();
        this.enemy.kill();
   }


   this.player.body.bounce.set(1); // bounce for player
   // rotation of sprite and movement
   this.player.rotation = this.game.physics.arcade.moveToPointer(this.player, 1, this.game.input.activePointer, 500);
   // restart key is R
   var restart = this.game.input.keyboard.addKey(Phaser.Keyboard.R);

   restart.onDown.add(restartToggle, this);

   function restartToggle() {
     // restart
     this.game.state.restart();
     // add coins
     if (this.coin1Bool == false && this.coin2Bool == false && this.coinBool == false)
     {
     this.coin = this.add.sprite(this.game.rnd.between(40,920), this.game.rnd.between(455,585), 'coin');
     this.coin1 = this.add.sprite(this.game.rnd.between(40,180), this.game.rnd.between(200,430), 'coin1');
     this.coin2 = this.add.sprite(this.game.rnd.between(790,920), this.game.rnd.between(200,430), 'coin2');
     this.game.physics.enable(this.coin, Phaser.Physics.ARCADE);
     this.game.physics.enable(this.coin1, Phaser.Physics.ARCADE);
     this.game.physics.enable(this.coin2, Phaser.Physics.ARCADE);
     this.coinStart = true;
     this.coinBool = true;
     this.coin1Bool = true;
     this.coin2Bool = true;
   }
   }

   // pause
   var stop = this.game.input.keyboard.addKey(Phaser.Keyboard.P);

   stop.onDown.add(stopToggle, this);

   function stopToggle() {
     // toggle paused
     if( this.game.paused == false)
     {
         this.game.paused = true;
     }
     else
     {
         this.game.paused = false;
     }
   }

   // mute music
   var mute = this.game.input.keyboard.addKey(Phaser.Keyboard.M);

   mute.onDown.add(muteToggle, this);

   function muteToggle() {
     // toggle music
     if(this.music.mute == false)
     {
       this.music.mute = true;
     }
     else {
       this.music.mute = false;
     }
   }
},


  render: function () {
    // render time
    this.game.debug.text('Time until end: ' + timer.duration.toFixed(0)/1000, 380, 320);
  },

	quitGame: function (pointer) {

		//	Here you should destroy anything you no longer need.
		//	Stop music, delete sprites, purge caches, free resources, all that good stuff.

		//	Then let's go back to the main menu.
		this.state.start('MainMenu');

	}

};
