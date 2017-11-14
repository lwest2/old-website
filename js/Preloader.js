var game = new Phaser.Game(960, 640, Phaser.AUTO, 'game_div');

//  Add & start the boot state.
game.state.add('Boot', BasicGame.Boot);
game.state.start('Boot');

BasicGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

BasicGame.Preloader.prototype = {

	preload: function () {

		//	These are the assets we loaded in Boot.js
		//	A nice sparkly background and a loading progress bar

		this.background = this.add.tileSprite(0, 0, 960, 640, 'preloaderBackground');
		this.preloadBar = this.add.sprite(300, 400, 'preloaderBar');

  		this.backgroundColor = 0xffffff;

		//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.

		this.load.setPreloadSprite(this.preloadBar);

		//	Here we load the rest of the assets our game needs.
		//	You can find all of these assets in the Phaser Examples repository

	    // e.g. this.load.image('image-name', 'assets/sprites/sprite.png');
	  this.load.tilemap('level', 'assets/level.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.image('level_tiles', 'assets/level_bank.png');
		this.load.spritesheet('player', 'assets/player.png', 32, 32);
		this.load.spritesheet('enemy', 'assets/enemy.png', 32, 32);
		this.load.spritesheet('explosion', 'assets/explosion.png', 96, 96);
		this.load.spritesheet('movingEnemy', 'assets/movingEnemy.png', 32, 32);
		this.load.spritesheet('movingExplosion', 'assets/movingExplosion.png', 96, 96);
		this.load.spritesheet('coin', 'assets/coin.png', 32, 32);
		this.load.spritesheet('coin1', 'assets/coin3.png', 32, 32);
		this.load.spritesheet('coin2', 'assets/coin2.png', 32, 32);
		this.load.audio('music', 'assets/Music.mp3');
		this.load.image('logo', 'assets/logo.png');

	},

	create: function () {

        console.log("Creating preload state!");

		this.state.start('MainMenu');
		this.state.start('Game');
	}

};
