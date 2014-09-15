window.onload = function() {

	var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update});

	var level = null;
	var character = null;

	function preload () {
		level = new Level(game);
		level.preload();
		character = new Main_character(game);
		character.preload();
	}

	function create () {
		game.physics.startSystem(Phaser.Physics.ARCADE);

		level.create();
		character.create();	
	}

	function update() {
		game.physics.arcade.collide(character.sprite, level.platforms);

		character.update();
	}
};
