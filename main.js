window.onload = function() {

	game = new Phaser.Game(800, 200, Phaser.AUTO, '', {create: create});

	function create () {
		setupLevels();
		game.state.start('1');
	}

	/**
	 * Sets up all levels for later consumption.
	 * It is later possible to switch between the levels by
	 * calling game.state.start(n); where n is the number of
	 * the level.
	 */
	function setupLevels(){
		game.state.add('1', new Level1());
		game.state.add('2', new Level2());
	}
};
