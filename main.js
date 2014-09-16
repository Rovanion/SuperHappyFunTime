window.onload = function() {

	game = new Phaser.Game(800, 300, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render});

	level = null;
	character = null;

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

		// Reset the game when r is pressed
		if(game.input.keyboard.isDown(Phaser.Keyboard.R)){
			character.sprite.reset(character.INITIAL_POSITION_X, character.INITIAL_POSITION_Y, 1);
		}
	}

	function render() {
		character.render();
	}
};
