window.onload = function() {

	game = new Phaser.Game(800, 300, Phaser.AUTO, '', { preload: preload, create: create, update: update});

	var level = null;
	var character = null;

	function preload () {
		level = new Level(game);
		level.preload();
		character = new bobby();
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
