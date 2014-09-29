window.onload = function() {

	game = new Phaser.Game(800, 600, Phaser.AUTO, '', {create: create});

	function create () {
		setupLevels();
		game.state.start('2');
	}

	/**
	 * Sets up all levels for later consumption.
	 * It is later possible to switch between the levels by
	 * calling game.state.start(n); where n is the number of
	 * the level.
	 */
	function setupLevels(){
		game.state.add('1', new Playground());
		game.state.add('2', new Falling());
	}
};
