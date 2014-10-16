window.onload = function() {

	game = new Phaser.Game(800, 600, Phaser.AUTO, '', {create: create});

	finishedLevelTime = 0;
	currentLevel = null;
	nextLevel = null;

	function create () {
		cursors = game.input.keyboard.createCursorKeys();
		setupLevels();
		game.state.start('title');
	}

	/**
	 * Sets up all levels for later consumption.
	 * It is later possible to switch between the levels by
	 * calling game.state.start(n); where n is the number of
	 * the level.
	 */
	function setupLevels(){
		game.state.add('1', new Level1());
		game.state.add('startMenu', new StartMenu());
		game.state.add('title', new TitleScreen());
		game.state.add('betweenLevels', new BetweenLevels());
	}
};
