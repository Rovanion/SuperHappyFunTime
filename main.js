window.onload = function() {

	game = new Phaser.Game(800, 300, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render});

	level = null;
	bobby = null;

	function preload () {
		level = new Level();
		level.preload();
		bobby = new	Character();
		bobby.preload();
	}

	function create () {
		game.physics.startSystem(Phaser.Physics.P2JS);

		level.create();
		bobby.create();
	}

	function update() {
		game.physics.arcade.collide(bobby.sprite, level.platforms);
		bobby.update();

		// Reset the game when r is pressed
		if(game.input.keyboard.isDown(Phaser.Keyboard.R)){
			bobby.sprite.reset(bobby.INITIAL_POSITION_X, bobby.INITIAL_POSITION_Y, 1);
		}
	}

	function render() {
		bobby.render();
	}
};
